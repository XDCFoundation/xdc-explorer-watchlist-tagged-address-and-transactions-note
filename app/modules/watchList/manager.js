

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
      let addressDetail = await UserAddressSchema.find({ address: requestData.address});

      if (addressDetail && addressDetail.length) {
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      }
      let addressObj = new UserAddressSchema(requestData);
      return await addressObj.save();

    } catch (err) {
      throw err;
    }
  };
  async getAddressByUserId(requestData) {
    if (!requestData)
        throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);

    return await UserAddressSchema.findData({ isActive: true, isDeleted: false, UserId: requestData.UserId })

}
}


