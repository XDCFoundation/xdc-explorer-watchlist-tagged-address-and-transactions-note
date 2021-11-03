import { apiFailureMessage, httpConstants } from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/UserTransaction";
import TagAddressSchema from "../../models/UserWhitelistAddress";
import UserAddressSchema from "../../models/UserWhitelistAddress";
import Utility from "../../utils";
export default class Manger {
  search = async (requestData) => {
    console.log(requestData);
    if (!requestData || !requestData.userId)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );

    try {
      const searchTable = requestData.search;
      delete requestData.search;

      if (search == 0) {
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

      if (search == 1) {
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

      if (search == 2) {
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
