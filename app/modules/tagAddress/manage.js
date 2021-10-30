import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import Utils from "../../utils";
import TagAddressSchema from "../../models/tagAddress";

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

export default class Manger {
  addTagAddress = async (request) => {
    if (!request || !request.userId || !request.address || !request.tagName)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let TagDetails = await TagAddressSchema.findOneData({
        address: request.address,
      });
      if (TagDetails) {
        throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
      } else {
        let addressObj = new TagAddressSchema(request);
        return await addressObj.saveData();
      }
    } catch (error) {
      throw error;
    }
  };

  getTagAddress = async ({ userId }) => {
    if (!userId)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      return await TagAddressSchema.find({ userId });
    } catch (error) {
      throw error;
    }
  };

  editTagAddress = async (request) => {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let updateObj = await TagAddressSchema.findOneData({ _id: request._id });
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
      return TagAddressSchema.findOneAndUpdateData(
        { _id: request._id },
        updateObj
      );
    } catch (error) {
      throw error;
    }
  };

  async getContentTagAddress(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let contentRequest = parseGetcontentRequest(request);

      const watchlistContent = await TagAddressSchema.getFilteredData(
        contentRequest.request,
        contentRequest.selectionKeys,
        contentRequest.skip,
        contentRequest.limit,
        contentRequest.sortingKey
      );

      const listForLength = await TagAddressSchema.findData();
      let totalCount = listForLength ? listForLength.length : 0;
      let response = { watchlistContent, totalCount };
      return response;
    } catch (err) {
      throw err;
    }
  }
}
