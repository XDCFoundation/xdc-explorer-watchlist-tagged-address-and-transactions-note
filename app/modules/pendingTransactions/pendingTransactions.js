
import Config from "../../../config";
import { amqpConstants, genericConstants, httpConstants } from "../../common/constants";
import UserAddressModel from "../../models/UserWhitelistAddress";
import Utils from "../../utils";
import RabbitMqController from "../queue/index";


let newTransactions, userAddresses;
export default class BlockManager {
    async syncTransactions() {
        try {
            userAddresses = await UserAddressModel.getFilteredData(
                {
                    "notification.isEnabled": true,
                    "notification.type": { $in: ["INOUT", "IN", "OUT"] }
                });
          
            Utils.lhtLog("syncTransactions", "getNewBlockHeaders listener", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)

        } catch (err) {
            Utils.lhtLog("syncTransactions", `catch block error: ${err}`, err, "kajalB", httpConstants.LOG_LEVEL_TYPE.ERROR)
            throw err;
        }
    }

    async listenAddresses() {
        try {
            newTransactions = web3.eth.subscribe("newBlockHeaders", (error, result) => {
                Utils.lhtLog("listenAddresses", "getNewBlockHeaders listener startes", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)
                if (!result) {
                    Utils.lhtLog("listenAddresses", "getNewBlockHeaders listener no result", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)
                    return false;
                }
            });
            newTransactions.on("data", (blockHeader) => {
                Utils.lhtLog("listenAddresses", "getNewBlockHeaders onData", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)

                web3.eth.getBlock(blockHeader.hash, true, async (error, blockData) => {
                    Utils.lhtLog("listenAddresses", "getNewBlockHeaders getBlock", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)
                    if (!blockData)
                        return;
                    if (blockData && blockData.transactions && blockData.transactions.length > 0) {
                        blockData.transactions.map((transaction) => {

                            web3.eth.getTransactionReceipt(transaction.hash, true, async (error, transactionReceipt) => {

                                Utils.lhtLog("listenAddresses", "getNewBlockHeaders getTransactionReceipt", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)
                                if (!transactionReceipt || transactionReceipt.status === false)
                                    return;
                                let userAddress = userAddresses && userAddresses.find((userAddress) => {
                                    if (userAddress.address.toLowerCase() === transactionReceipt.from.toLowerCase() || userAddress.address.toLowerCase() === transactionReceipt.to.toLowerCase()) return userAddress
                                })

                                if (userAddress) {
                                    Utils.lhtLog("listenAddresses", "getNewBlockHeaders useraddress matched", {userAddress, transaction}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)
                                    if (userAddress.notification.type === "INOUT" && (userAddress.address.toLowerCase() === transactionReceipt.from.toLowerCase() || userAddress.address.toLowerCase() === transactionReceipt.to.toLowerCase())) {
                                        let transactionType = "";
                                        if (userAddress.address.toLowerCase() === transactionReceipt.from.toLowerCase()) transactionType = genericConstants.TRANSACTION_TYPES.SENT
                                        else
                                            transactionType = genericConstants.TRANSACTION_TYPES.RECEIVED
                                        await sendDataToQueue("INOUT", transactionReceipt, userAddress, transactionType, blockData, transaction.value);
                                    }
                                    else if (userAddress.notification.type === "IN" && userAddress.address.toLowerCase() === transactionReceipt.to.toLowerCase()) {
                                        await sendDataToQueue("IN", transactionReceipt, userAddress, genericConstants.TRANSACTION_TYPES.RECEIVED, blockData, transaction.value);

                                    }
                                    else if (userAddress.notification.type === "OUT" && userAddress.address.toLowerCase() === transactionReceipt.from.toLowerCase()) {
                                        await sendDataToQueue("OUT", transactionReceipt, userAddress, genericConstants.TRANSACTION_TYPES.SENT, blockData, transaction.value);
                                    }
                                }
                            })
                        })

                    }
                })


            });

        } catch (error) {
            Utils.lhtLog("listenAddresses", `catch block error: ${error}`, error, "kajalB", httpConstants.LOG_LEVEL_TYPE.ERROR)
            throw error;

        }
    }
}

const getNotificatonResponse = (type, transaction, userAddress, transactionType, blockData,transactionValue) => {
    Utils.lhtLog("getNotificatonResponse", "getNotificatonResponse", {}, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)

    return {
        "title": "Watchlist Address",
        "description": `${transactionValue} xdc  ${transactionType} ${userAddress.description}`,
        "postedTo": userAddress.userId,
        "postedBy": 'Xinfin Explorer',
        "timestamp": blockData.timestamp,
        "userID": userAddress.userId,
        "addedOn": Date.now(),
        "type": genericConstants.NOTIFICATION_TYPE.PUSH,
        "getDeviceQueryObj": { user: userAddress.userId },
        "payload":  { user: userAddress.userId , timestamp: blockData.timestamp,},
        "isSendPush": true

    }
}


const getMailNotificationResponse = (type, transaction, userAddress, transactionType, blockData, transactionValue) => {
    return {
        "title": "Watchlist Address",
        "description": `${transactionValue} xdc ${transactionType} ${userAddress.description}`,
        "timestamp": blockData.timestamp,
        "userId": userAddress.userId,
        "postedBy": Config.POSTED_BY,
        "postedTo": Config.POSTED_TO,
        "type": genericConstants.NOTIFICATION_TYPE.EMAIL,
        "sentFromEmail": Config.POSTED_BY,
        "sentFromName": Config.SENT_BY,
        "addedOn": Date.now(),
    }
}
const sendDataToQueue = async (type, transaction, userAddress, transactionType, blockData, transactionValue) => {

    let notificationRes = getNotificatonResponse(type, transaction, userAddress, transactionType, blockData, transactionValue)
    console.log("notificationRes",notificationRes);
    let mailNotificationRes = getMailNotificationResponse(type, transaction, userAddress, transactionType, blockData, transactionValue)
    let rabbitMqController = new RabbitMqController();
    Utils.lhtLog("sendDataToQueue", "sendDataToQueue", notificationRes, "kajal", httpConstants.LOG_LEVEL_TYPE.INFO)
    await rabbitMqController.insertInQueue(Config.NOTIFICATION_EXCHANGE, Config.NOTIFICATION_QUEUE, "", "", "", "", "", amqpConstants.exchangeType.FANOUT, amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE, JSON.stringify(notificationRes));
    // await rabbitMqController.insertInQueue(Config.NOTIFICATION_EXCHANGE, Config.NOTIFICATION_QUEUE, "", "", "", "", "", amqpConstants.exchangeType.FANOUT, amqpConstants.queueType.PUBLISHER_SUBSCRIBER_QUEUE, JSON.stringify(mailNotificationRes));

}

