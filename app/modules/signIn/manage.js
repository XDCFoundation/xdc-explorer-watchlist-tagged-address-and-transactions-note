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
  signIn = async (requestData) => {

    if (!requestData)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let userDetail = await UserSchema.find({ email: requestData.email });
      console.log("user details",userDetail)
      if (userDetail && userDetail.length) {
        throw Utils.error(
          {},
          apiFailureMessage.USER_ALREADY_EXISTS,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
      const [error, getRes] = await Utils.parseResponse(
        new AuthManager().signIn(requestData)
      );
      if (error)
        throw Utils.error(
          {},
          error.message || apiFailureMessage.USER_CREATE_AUTH0,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );

      // let userModel = new UserSchema(getRes);
     
      // userModel.addedOn = new Date().getTime();
      // userModel.modifiedOn = new Date().getTime();
      //   return await userModel.save();
    } catch (error) {
      console.log(error)
      throw error;
    }
  };
  
  async deleteUser(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    return await UserSchema.save(
      {
        email: request.email,
        _id: request.id,
      },
      {
        $set: {
          isActive: 0,
          isDeleted: 1,
        },
      }
    );
  }

  
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
