import Utils from "../../utils";
import {apiFailureMessage, apiSuccessMessage, httpConstants} from "../../common/constants";
import BLManager from "./manger";

export default class Index {
  async transactionPrivateNote(request, response) {
    try {
      if (!request || !request.params || !request.params.userId)
        throw Utils.error(
          {},
          apiFailureMessage.INVALID_PARAMS,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      const [error, addUserResponse] = await Utils.parseResponse(
        new BLManager().fetchtransactionPrivateNote(request.params)
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
      return Utils.handleError(error, request, response);
    }
  }

  async editTransactionPrivateNote(request, response) {
    try {
      if (!request)
        throw Utils.error(
          {},
          apiFailureMessage.INVALID_PARAMS,
          httpConstants.RESPONSE_CODES.FORBIDDEN
        );
      const [error, addUserResponse] = await Utils.parseResponse(
        new BLManager().updateTransactionPrivateNote(request.body)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        addUserResponse,
        apiSuccessMessage.INFO_UPDATED,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      return Utils.handleError(error, request, response);
    }
  }
  async deleteTransactionPrivateNote(request, response) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new BLManager().deleteTransactionPrivateNote(request.body)
      );
      if (error || !addUserResponse) {
        return Utils.handleError(error || apiFailureMessage.CANNOT_DELETE_DATA, request, response);
      }
      return Utils.response(
        response,
        addUserResponse,
        apiSuccessMessage.DATA_DELETED_SUCCESSFULLY,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }
}
