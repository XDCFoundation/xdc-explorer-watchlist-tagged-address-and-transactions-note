import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import Utils from "../../utils";
import UserAddressSchema from "../../models/userAddressModel";

export default class Manger {
 
  notifyUser = async ({UserId}) => {
    try{
    if (!UserId)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
      return UserAddressSchema.findOne({ UserId })
  }
    catch (error) {
      throw error;
    }
  }
}