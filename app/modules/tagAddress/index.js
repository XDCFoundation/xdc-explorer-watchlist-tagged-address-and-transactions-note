import Utils from "../../utils";
import {
  apiSuccessMessage,
  apiFailureMessage,
  httpConstants,
} from "../../common/constants";
import Manager from "./manage";

export default class Index {
  async addTagAddress(request, response) {
    if (!request || !request.body.userId || !request.body.address)
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
        apiSuccessMessage.INFO_UPDATED,
        httpConstants.RESPONSE_STATUS.SUCCESS,
        httpConstants.RESPONSE_CODES.OK
      );
    } catch (error) {
      Utils.handleError(error, request, response);
    }
  }

    async getUserAddressTagUsingHash(request, response) {
      try {
        if (!request || !request.body.userId || !request.body.address)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
      
            const [error, addUserResponse] = await Utils.parseResponse(
                new Manager().getUserAddressTagUsingHash(request.body)
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
           throw Utils.handleError(error, request, response);
        }
    }

  async getTagAddress(request, response) {
    if (!request || !request.params || !request.params.userId)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      console.log(request.params.userId);

      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().getTagAddress(request.params)
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

  async editTagAddress(request, response) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
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

  async getContentTagAddress(request, response) {
    if (!request || !request.body)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().getContentTagAddress(request.body)
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
  
  async deleteTagAddress(request, response) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      const [error, addUserResponse] = await Utils.parseResponse(
        new Manager().deleteTagAddress(request.body)
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
