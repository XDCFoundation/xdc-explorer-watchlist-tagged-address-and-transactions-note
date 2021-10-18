import { apiFailureMessage, httpConstants} from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/userTransaction"
export default class Manger {
    addTransactionLabel = async (requestData) => {
        console.log(requestData)
        if (!requestData || !requestData.userId || !requestData.trxLable || !requestData.transactionHash)

        throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);
      try { 
        let transactionHash = await UserTransactionSchema.findOne({ transactionHash: requestData.transactionHash ,userId: requestData.userId });
        // console.log("Tnx Hash",transactionHash)
        
        if (transactionHash ) {
          throw Utils.error({}, apiFailureMessage.ALREADY_TRANSACTION_HASH_EXIST, httpConstants.RESPONSE_CODES.FORBIDDEN);
        }
          let lableTrx = new UserTransactionSchema(requestData);
          return await lableTrx.save();
      }catch (error) {
        throw error
      }
    }
}
