
 import Utils from '../../utils/index'
 import BlManager from './manager';
 import {
    apiFailureMessage,
    apiSuccessMessage,
    httpConstants
} from '../../common/constants';
 
 export default class AddWatchList {
    async addWatchList(request, response) {
        if (!request || !request.body)
            throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);
        try {
            const [error, addUserResponse] = await Utils.parseResponse(new BlManager().addAddress(request.body));
            if (error) {
                return Utils.handleError(error, request, response);
            }
            
            Utils.response(response, addUserResponse, apiSuccessMessage.USER_ADD_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
        } catch (error) {
            Utils.handleError(error, request, response);
        }
    }
    async getAddressByUserId(request, response) {
        if (!request || !request.body || !request.body.UserId)
            throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);
        try {
            const [error, addUserResponse] = await Utils.parseResponse(new BlManager().getAddressByUserId(request.body));
            if (error) {
                return Utils.handleError(error, request, response);
            }
            return Utils.response(response, addUserResponse, apiSuccessMessage.USER_GET_SUCCESS, httpConstants.RESPONSE_STATUS.SUCCESS, httpConstants.RESPONSE_CODES.OK)
        } catch (error) {
            Utils.handleError(error, request, response);
        }
    }
 }
 
 
 
 