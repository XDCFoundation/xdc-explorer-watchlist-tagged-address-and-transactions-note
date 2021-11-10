import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
} from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/UserTransaction";

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
  addTransactionLabel = async (requestData) => {
    if (
      !requestData ||
      !requestData.userId ||
      !requestData.trxLable ||
      !requestData.transactionHash
    )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let transactionHash = await UserTransactionSchema.findOne({
        transactionHash: requestData.transactionHash,
        userId: requestData.userId,
      });

      if (transactionHash) {
        throw Utils.error(
          {},
          apiFailureMessage.ALREADY_TRANSACTION_HASH_EXIST,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      }
      let lableTrx = new UserTransactionSchema(requestData);
      return await lableTrx.save();
    } catch (error) {
      throw error;
    }
  };


  getTransactionPrivateNoteUsingHash = async ({reqObj}) => {
    try {
      return await UserTransactionSchema.find({
        userId: reqObj.userId,
        transactionHash: reqObj.transactionHash,
        isTaggedAddress: true,
        isActive: true,
        isDeleted: false
      });
    } catch (error) {
      throw error;
    }
  };


  async getContentTxnLabel(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      let contentRequest = parseGetcontentRequest(request);

      const txnLabelContent = await UserTransactionSchema.getFilteredData(
        contentRequest.request,
        contentRequest.selectionKeys,
        contentRequest.skip,
        contentRequest.limit,
        contentRequest.sortingKey
      );

      const listForLength = await UserTransactionSchema.findUserTransaction();

      let totalCount = listForLength ? listForLength.length : 0;

      let response = { txnLabelContent, totalCount };
      return response;
    } catch (err) {
      throw err;
    }
  }
}
