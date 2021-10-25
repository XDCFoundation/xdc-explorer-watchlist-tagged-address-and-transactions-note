

import UserAddressSchema from "../../models/userAddressModel";
import {
    apiFailureMessage,
} from '../../common/constants';


export default class BlManager {
  addWatch = async (requestData) => {
    try {
      let userDetail = await UserAddressSchema.findOne({ UserId: requestData.UserId });
      if (!userDetail) {
        throw apiFailureMessage.USER_NOT_EXISTS
      }
      let addressDetail = await UserAddressSchema.findOne({ UserId: requestData.UserId });({
        address: requestData.address,
       
        
      });
      if (addressDetail && addressDetail.length) {
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      }
      let addressObj = new UserAddressSchema(requestData);
      return await addressObj.save();

    } catch (err) {
      throw err;
    }
  };

  editWatchList = async ({UserId, address, description, balance, notification}) => {
    try {
      let userDetail = await UserAddressSchema.findOne({ UserId });
      if (!userDetail) {
        throw apiFailureMessage.USER_NOT_EXISTS
      }
      return await UserAddressSchema.updateOne({UserId, address, description, balance, notification})

    } catch (err) {
      throw err;
    }
  };

  async getAddressByUserId(requestData) {
    if (!requestData)
        throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);

    return await UserAddressSchema.find({ isActive: true, isDeleted: false, UserId: requestData.UserId })

  }
}


