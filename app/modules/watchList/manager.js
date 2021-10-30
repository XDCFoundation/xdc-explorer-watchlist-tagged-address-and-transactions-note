import Utils from "../../utils/index";
import UserAddressSchema from "../../models/userAddressModel";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";

const parseGetcontentRequest = (requestObj) => {
  if (!requestObj) return {};
  let skip = 0;
  if (requestObj.skip || requestObj.skip === 0) {
    skip = requestObj.skip;
    delete requestObj.skip;
  }
  let limit = 0;
  if (requestObj.limit) {
    limit = requestObj.limit;
    delete requestObj.limit;
  }
  let sortingKey = "";
  if (requestObj.sortingKey) {
    sortingKey = requestObj.sortingKey;
    delete requestObj.sortingKey;
  }
  let selectionKeys = "";
  if (requestObj.selectionKeys) {
    selectionKeys = requestObj.selectionKeys;
    delete requestObj.selectionKeys;
  }
  let searchQuery = [];
  if (
    requestObj.searchKeys &&
    requestObj.searchValue &&
    Array.isArray(requestObj.searchKeys) &&
    requestObj.searchKeys.length
  ) {
    requestObj.searchKeys.map((searchKey) => {
      let searchRegex = { $regex: requestObj.searchValue, $options: "i" };
      searchQuery.push({ [searchKey]: searchRegex });
    });
    requestObj["$or"] = searchQuery;
  }
  if (requestObj.searchKeys) delete requestObj.searchKeys;
  if (requestObj.searchValue) delete requestObj.searchValue;
  return {
    requestData: requestObj,
    skip: skip,
    limit: limit,
    sortingKey: sortingKey,
    selectionKeys: selectionKeys,
  };
};

export default class BlManager {
  addWatchlist = async (request) => {
    if (!request || !request.userId || !request.address || !request.description)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let addressDetail = await UserAddressSchema.findOne({
        address: request.address,
      });
      if (addressDetail) {
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      }
      let addressObj = new UserAddressSchema(request);
      return await addressObj.saveData();
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
      let userDetail = await UserAddressSchema.getUserAddress({
        _id: request._id,
      });
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

  async getContentWatchlist(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let contentRequest = parseGetcontentRequest(request);

      const watchlistContent = await UserAddressSchema.getFilteredData(
        contentRequest.request,
        contentRequest.selectionKeys,
        contentRequest.skip,
        contentRequest.limit,
        contentRequest.sortingKey
      );
      const listForLength = await UserAddressSchema.findData();
      let totalCount = listForLength ? listForLength.length : 0;
      let response = { watchlistContent, totalCount };
      return response;
    } catch (err) {
      throw err;
    }
  }
}
