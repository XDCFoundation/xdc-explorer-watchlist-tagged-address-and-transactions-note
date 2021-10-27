import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import Utils from "../../utils";
import TagAddressSchema from "../../models/tagAddress";

export default class Manger {
 
  addTagAddress = async (request) => {
    try{
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    let addressObj = new TagAddressSchema(request)
        return await addressObj.save();
  }
    catch (error) {
      console.log(error)
      throw error;
    }
  }

  getTagAddress = async ({ userId }) => {
    if (!userId)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try{
      return await TagAddressSchema.find({userId})
    } catch (error) {
    throw error;
  }
  }

  editTagAddress = async (request) => {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try{
      let updateObj = await TagAddressSchema.findOne({ _id: request._id });

      updateObj = {
        modifiedOn: new Date().getTime(),
      };
      if (!updateObj) {
        throw Utils.error(
          {},
          apiFailureMessage.ID_NOT_EXIST,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );      
      }
      if (request.address) {
        updateObj["address"] = request.address;
      }

      if (request.tagName) {
        updateObj["tagName"] = request.tagName;
      }
      // console.log("update", updateObj);

      return TagAddressSchema.findOneAndUpdateData(
        { _id: request._id },
        updateObj
      );
    
    } catch (error) {
    throw error;
  }
  }

}
