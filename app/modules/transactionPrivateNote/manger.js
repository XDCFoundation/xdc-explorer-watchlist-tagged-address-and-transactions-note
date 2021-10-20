import { apiFailureMessage, apiSuccessMessage,httpConstants } from "../../common/constants";
import UserTransactionSchema from "../../models/userTransaction";
import Utils from "../../utils";

export default class Manger {
  fetchtransactionPrivateNote = async (requestData) => {
    // API business logic
    
    if (!requestData ) throw apiFailureMessage.INVALID_PARAMS;
    console.log(requestData);

    try {
      let userId = await UserTransactionSchema.findOne({
        userId: requestData.userId,
      });
      console.log("userId: ", userId);
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
}
