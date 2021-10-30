import Utils from "../../utils";
import { apiSuccessMessage, httpConstants } from "../../common/constants";
import BLManager from "./manger";

export default class Index {
  async addTransactionLabel(request, response) {
    // lhtWebLog('Inside testRoute', request.body, 'testRoute', 0, '')
    console.log("string");
    const [error, getMetersRes] = await Utils.parseResponse(
      new BLManager().addTransactionLabel(request.body)
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
  }

  async getContentTxnLabel(request, response) {
    if (!request || !request.params)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new BLManager().getContentTxnLabel(request.params)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        addUserResponse,
        apiSuccessMessage.FETCH_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }
}
