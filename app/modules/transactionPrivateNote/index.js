import Utils from "../../utils";
import { apiSuccessMessage, httpConstants } from "../../common/constants";
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
        apiSuccessMessage.USER_GET_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      return Utils.handleError(error, request, response);
    }
  }
}
