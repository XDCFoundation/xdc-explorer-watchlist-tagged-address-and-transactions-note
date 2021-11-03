import Utils from "../../utils";
import { apiSuccessMessage,apiFailureMessage, httpConstants } from "../../common/constants";
import BLManager from "./searchManager";

export default class Index {
  async searchData(request, response) {
    if (!request || !request.body)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      
    //   lhtWebLog("Inside SearchRoute ", request.body, "searchRoute", 0, "");

      const [error, getResponse] = await Utils.parseResponse(
        new BLManager().search(request.body)
      );
      if (!getResponse) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        getResponse,
        apiSuccessMessage.FETCH_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      throw error;
    }
  }
}
