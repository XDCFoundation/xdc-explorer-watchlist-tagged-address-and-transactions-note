import Utils from "../../utils";
import { apiSuccessMessage,apiFailureMessage, httpConstants } from "../../common/constants";
import BLManager from "./searchManager";

export default class Index {
  async searchData(request, response) {
    if (!request )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      
    //   lhtWebLog("Inside SearchRoute ", request.body, "searchRoute", 0, "");

      const [error, getMetersRes] = await Utils.parseResponse(
        new BLManager().search(request.body)
      );
      if (!getMetersRes) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        getMetersRes,
        apiSuccessMessage.FETCH_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      throw error;
    }
  }
}
