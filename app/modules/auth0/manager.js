import Utils from "../../utils";
import {apiFailureMessage, AuthConfigConstant, httpConstants} from "../../common/constants";
import HttpService from "../../service/http-service";
import Config from "../../../config/env/development";


export default class Manager {

    signIn = async (requestData) => {
        if (!requestData || !requestData.email || !requestData.password )
            throw Utils.error([], apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);

        const headers = {"content-type": "application/json"};
        let requestObj = {
            "client_id": Config.AUTH0_MGMT_API_CLIENT_ID,
            "connection": Config.AUTH0_CONNECTION,
            "email": requestData.email,
            "password": requestData.password,
        }
        let signupResponse = await HttpService.executeHTTPRequest(httpConstants.METHOD_TYPE.POST, Config.AUTH0_MGMG_BASEURL, `dbconnections/signup`, requestObj, headers);
        console.log("signupResponse===", signupResponse);

        if (signupResponse && signupResponse.error || signupResponse.statusCode)
            throw Utils.error({}, signupResponse.error || apiFailureMessage.USER_CREATE_AUTH0, httpConstants.RESPONSE_CODES.FORBIDDEN);

        requestData['userId'] = `auth0|${signupResponse._id}`
        this.addAuthRole(requestData)
        return requestData;
    };

  
    changePassword = async (requestData) => {

        if (!requestData || !requestData.password)
            throw Utils.error([], apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);

        let accessToken = await this.getAccessToken();
        const headers = {
            "Authorization": `Bearer ${accessToken}`,
            "content-type": "application/json"
        };
        console.log("pass", headers);

        let requestObj = {
            "connection": Config.AUTH0_CONNECTION,
            "password": requestData.password,
        }


        let resetPassResponse = await HttpService.executeHTTPRequest(httpConstants.METHOD_TYPE.PATCH, Config.AUTH0_MGMG_BASEURL, `api/v2/users/${requestData.userId}`, requestObj, headers);
        console.log("resetPassResponse===", resetPassResponse);

        if (resetPassResponse && resetPassResponse.error || resetPassResponse.statusCode)
            throw Utils.error({}, resetPassResponse.error || apiFailureMessage.RESET_PASSWORD_AUTH0, httpConstants.RESPONSE_CODES.FORBIDDEN);

        return resetPassResponse;
    };

    getAccessToken = async () => {
        const token_body = {
            grant_type: "client_credentials",
            client_id: Config.AUTH0_MGMT_API_CLIENT_ID,
            client_secret: Config.AUTH0_MGMT_API_SECRET,
            audience: Config.AUTH0_MGMG_BASEURL + "api/v2/"
        };
        const headers = {"content-type": "application/json"};
        let accessTokenResponse = await HttpService.executeHTTPRequest(httpConstants.METHOD_TYPE.POST, Config.AUTH0_MGMG_BASEURL, 'oauth/token', token_body, headers);
        // console.log("accessTokenResponse=getAccessToken==",accessTokenResponse)
        if (accessTokenResponse && (accessTokenResponse.error || accessTokenResponse.error_description))
            throw Utils.error({}, accessTokenResponse.error_description || apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN);

        return accessTokenResponse.access_token

    }


}

