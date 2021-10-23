import Utils from '../../utils'
import { apiSuccessMessage, apiFailureMessage, httpConstants } from '../../common/constants'
import Manager from './manage'

export default class Index {
 
  async addTagAddress(request, response) {
    if (!request || !request.body.userId || !request.body.address )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().addTagAddress(request.body)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        addUserResponse,
        apiSuccessMessage.ADDRESS_TAG_ADD,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }

  async getTagAddress(request, response) {
    if (!request || !request.params || !request.params.userId )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      console.log(request.params.userId)

      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().getTagAddress(request.params)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        
        response,
        addUserResponse,
        apiSuccessMessage.GET_ADDRESS_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }

  async editTagAddress(request, response) {
    if (!request.body.userId )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      console.log(request.body.userId)

      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().editTagAddress(request.body)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        
        response,
        addUserResponse,
        apiSuccessMessage.GET_ADDRESS_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }
  
}
