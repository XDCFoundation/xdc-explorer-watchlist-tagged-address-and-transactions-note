import Utils from '../../utils';
import BLManager from './manager';
import { apiSuccessMessage, apiFailureMessage, httpConstants } from '../../common/constants';

export default class Notification {

  async notifyUser(request, response) {
    if ( !request.body.UserId )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new BLManager().notifyUser(request.body)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        addUserResponse,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }
}
