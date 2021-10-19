import Utils from '../../utils'
import { apiSuccessMessage, httpConstants } from '../../common/constants'
import Manager from './manage'

export default class Index {
  async signIn(request, response) {
    if (!request || !request.body)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().signIn(request.body)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      let userData = addUserResponse;
      
      // if (request.body.roleName === Auth0RoleNameConstants.PATIENT)
        userData = await new SurveyManager().createPatientSurvey(
          JSON.parse(JSON.stringify(addUserResponse))
        );
          console.log(addUserResponse)
      // let data = JSON.parse(JSON.stringify(userData));
      // if (
      //   request.body.roleName === Auth0RoleNameConstants.PATIENT ||
      //   request.body.roleName === Auth0RoleNameConstants.SUB_SURGEON ||
      //   request.body.roleName === Auth0RoleNameConstants.SUB_ANAESTHESIOLOGIST
      // )
      //   eventEmitter.raiseEvent(genericConstants.EVENTS.EMIT_EVENT, {
      //     type: genericConstants.EVENTS.ACCOUNT_SETUP,
      //     data: {
      //       ...data,
      //       invitedBy: (request.body && request.body.invitedBy) || {},
      //     },
      //   });
      Utils.response(
        response,
        userData,
        apiSuccessMessage.USER_ADD_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }

  async deleteUser(request, response) {
    if (!request || !request.body.email )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().deleteUser(request.body)
      );
      if (error) {
        return Utils.handleError(error, request, response);
      }
      return Utils.response(
        response,
        addUserResponse,
        apiSuccessMessage.DELETE_USER_SUCCESS,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }

  async addTagAddress(request, response) {
    if (!request || !request.body.address || !request.body.tagName )
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
    if (!request )
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().getTagAddress(request.body)
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
