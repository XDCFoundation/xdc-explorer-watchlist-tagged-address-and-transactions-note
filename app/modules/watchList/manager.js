import Utils from "../../utils/index";
import UserAddressSchema from "../../models/userAddressModel";
import { apiFailureMessage, httpConstants } from "../../common/constants";

export default class BlManager {
  addWatchlist = async (request) => {
    if (!request || !request.userId || !request.address || !request.description)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let addressDetail = request.address;
      if (addressDetail) {
      addressDetail = await UserAddressSchema.findOne({
        address: request.address,
      });
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      } else {
      let addressObj = new UserAddressSchema(request);
      return await addressObj.save();
      }
    } catch (err) {
      throw err;
    }
  };

  editWatchList = async (request) => {
    if (!request || !request._id)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let userDetail = await UserAddressSchema.findOne({ _id: request._id });
      userDetail = {
        modifiedOn: new Date().getTime(),
      };
      if (!userDetail) {
        throw Utils.error(
          {},
          apiFailureMessage.ID_NOT_EXIST,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
      if (request.address) {
        userDetail["address"] = request.address;
      }

      if (request.description) {
        userDetail["description"] = request.description;
      }
      return await UserAddressSchema.findAndUpdateData(
        { _id: request._id },
        userDetail
      );
    } catch (err) {
      throw err;
    }
  };

  async getAddressByUserId(requestData) {
    if (!requestData)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    return await UserAddressSchema.find({
      isActive: true,
      isDeleted: false,
      userId: requestData.userId,
    });
  }

  async getListOfWatchList(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
    } catch (err) {
      throw err;
    }
  }
}
