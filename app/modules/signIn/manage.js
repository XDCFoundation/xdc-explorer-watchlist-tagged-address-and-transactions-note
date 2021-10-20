import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import UserSchema from "../../models/userAddress";
import Utils from "../../utils";
import AuthManager from "../auth0/manager"
import UserTransactionSchema from "../../models/userTransaction";

export default class Manger {
 
  addTagAddress = async (request) => {

    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
      try{
        if (request === true){
          UserTransactionSchema.save(findObj)
        }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  async getTagAddress(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try{
    return UserTransactionSchema.findById()
  } catch (error) {
    console.log(error)
    throw error;
  }
  }
}
