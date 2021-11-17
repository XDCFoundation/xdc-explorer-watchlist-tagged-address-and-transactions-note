import { apiFailureMessage, httpConstants,SearchData } from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/UserTransaction";
import TagAddressSchema from "../../models/UserWhitelistAddress";
import UserAddressSchema from "../../models/UserWhitelistAddress";
import Utility from "../../utils";
export default class Manger {
  search = async (requestData) => {
    if (!requestData || !requestData.userId)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    try {
      const searchTable = requestData.search;
      delete requestData.search;
      requestData["isDeleted"] = false;
      if (searchTable === SearchData.WATCHLIST) {
        let contentRequest = Utility.parseGetContentRequest(requestData);
        const contentList = await UserAddressSchema.getFilteredData(
          contentRequest.requestData,
          contentRequest.selectionKeys,
          contentRequest.skip,
          contentRequest.limit,
          contentRequest.sortingKey
        );

        return contentList;
      }

      if (searchTable === SearchData.TRANSACTION_NOTE) {
        let contentRequest = Utility.parseGetContentRequest(requestData);
        const contentList = await UserTransactionSchema.getFilteredData(
          contentRequest.requestData,
          contentRequest.selectionKeys,
          contentRequest.skip,
          contentRequest.limit,
          contentRequest.sortingKey
        );

        return contentList;
      }

      if (searchTable === SearchData.TAG_ADDRESS) {
        let contentRequest = Utility.parseGetContentRequest(requestData);
        const contentList = await TagAddressSchema.getFilteredData(
          contentRequest.requestData,
          contentRequest.selectionKeys,
          contentRequest.skip,
          contentRequest.limit,
          contentRequest.sortingKey
        );

        return contentList;
      }
    } catch (error) {
      throw error;
    }
  };
}
