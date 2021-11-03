import {
  apiFailureMessage,
  httpConstants,
} from "../../common/constants";
import UserTransactionSchema from "../../models/UserTransaction";
import Utils from "../../utils";

export default class Manger {
  fetchtransactionPrivateNote = async (requestData) => {
    // API business logic

    if (!requestData) throw apiFailureMessage.INVALID_PARAMS;
    // console.log(requestData);

    try {
      let userId = await UserTransactionSchema.findOne({
        userId: requestData.userId,
      });
      // console.log("userId: ", userId);
      if (!userId) {
        throw Utils.error(
          {},
          apiFailureMessage.USER_NOT_EXIST,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }

      return await UserTransactionSchema.find(requestData);
    } catch (error) {
      throw error;
    }
  };

  //-------------------------------------------------------------------------------------------------------------------

  updateTransactionPrivateNote = async (requestData) => {
    // API business logic

    if (!requestData) throw apiFailureMessage.INVALID_PARAMS;
    // console.log("req", requestData);

    try {
      let updateObj = await UserTransactionSchema.findOne({
        _id: requestData._id,
      });

      updateObj = {
        modifiedOn: new Date().getTime(),
      };

      // console.log("_Id: ", updateObj);
      if (!updateObj) {
        throw Utils.error(
          {},
          apiFailureMessage.USER_NOT_EXIST,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }

      if (requestData.transactionHash) {
        updateObj["transactionHash"] = requestData.transactionHash;
      }

      if (requestData.trxLable) {
        updateObj["trxLable"] = requestData.trxLable;
      }
      // console.log("update", updateObj);

      return UserTransactionSchema.findAndUpdateData(
        { _id: requestData._id },
        updateObj
      );
    } catch (error) {
      throw error;
    }
  };
}
