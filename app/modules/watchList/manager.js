import Utils from "../../utils";
import WatchlistAddressSchema from "../../models/UserWatchlistAddress";
import {apiFailureMessage, httpConstants} from "../../common/constants";
import { request } from "express";

const parseGetcontentRequest = (requestObj) => {
    if (!requestObj) return {};
    let skip = 0;
    if (requestObj.skip || requestObj.skip === 0) {
        skip = requestObj.skip;
        delete requestObj.skip;
    }
    let limit = 0;
    if (requestObj.limit) {
        limit = requestObj.limit;
        delete requestObj.limit;
    }
    let sortingKey = "";
    if (requestObj.sortingKey) {
        sortingKey = requestObj.sortingKey;
        delete requestObj.sortingKey;
    }
    let selectionKeys = "";
    if (requestObj.selectionKeys) {
        selectionKeys = requestObj.selectionKeys;
        delete requestObj.selectionKeys;
    }
    let searchQuery = [];
    if (
        requestObj.searchKeys &&
        requestObj.searchValue &&
        Array.isArray(requestObj.searchKeys) &&
        requestObj.searchKeys.length
    ) {
        requestObj.searchKeys.map((searchKey) => {
            let searchRegex = {$regex: requestObj.searchValue, $options: "i"};
            searchQuery.push({[searchKey]: searchRegex});
        });
        requestObj["$or"] = searchQuery;
    }
    if (requestObj.searchKeys) delete requestObj.searchKeys;
    if (requestObj.searchValue) delete requestObj.searchValue;
    return {
        requestData: requestObj,
        skip: skip,
        limit: limit,
        sortingKey: sortingKey,
        selectionKeys: selectionKeys,
    };
};

export default class BlManager {
    addWatchlist = async (request) => {
        if (!request || !request.userId || !request.address || !request.description)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            let addressDetail = await WatchlistAddressSchema.find({
                userId: request.userId
            });
            let addressLength = addressDetail.length;
            for(var i=0; i<addressLength; i++){
                if (addressDetail[i].address === request.address) {
                    throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
                }
            }
            let addressObj = this.parseWatchlistData(request);
            return await addressObj.saveData();
        } catch (err) {
            throw err;
        }
    };

    parseWatchlistData(requestObj) {
        let addressObj = new WatchlistAddressSchema(requestObj);
        addressObj.address = requestObj.address;
        addressObj.userId = requestObj.userId;
        addressObj.description = requestObj.description;
        addressObj.addedOn = Date.now();
        addressObj.tagName = ""
        addressObj.balance = 0;
        addressObj.notification.type = requestObj.type;
        addressObj.notification.isEnabled = requestObj.isEnabled;
        addressObj.isTaggedAddress = false;
        addressObj.isWatchlistAddress = true;
        addressObj.isDeleted = false;
        addressObj.isActive = true;
        addressObj.createdOn = Date.now();
        addressObj.modifiedOn = Date.now();
        return addressObj;

    }

    editWatchList = async (request) => {
        if (!request || !request._id)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            let userDetail = await WatchlistAddressSchema.getUserAddress({
                _id: request._id,
            });
            userDetail = {
                modifiedOn: new Date().getTime(),
            };
            if (!userDetail) {
                throw Utils.error(
                    {},
                    apiFailureMessage.ID_NOT_EXIST,
                    httpConstants.RESPONSE_CODES.FORBIDDEN
                );
            }
            if (request.address) {
                userDetail["address"] = request.address;
            }

            if (request.description) {
                userDetail["description"] = request.description;
            }
            const editWatchlistData = await WatchlistAddressSchema.findAndUpdateData(
                {_id: request._id},
                userDetail
            );
            return editWatchlistData;
        } catch (err) {
            throw err;
        }
    };

    async getAddressByUserId(requestData) {
        if (!requestData)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );

        return await WatchlistAddressSchema.find({
            isActive: true,
            isDeleted: false,
            userId: requestData.userId,
            isWatchlistAddress: true
        });
    }

    async getListOfWatchList(request) {
        if (!request)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
        } catch (err) {
            throw err;
        }
    }

    async getContentWatchlist(request) {
        if (!request)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            request["isDeleted"]=false
            let contentRequest = parseGetcontentRequest(request);

            const watchlistContent = await WatchlistAddressSchema.getFilteredData(
                contentRequest.requestData,
                contentRequest.selectionKeys,
                contentRequest.skip,
                contentRequest.limit,
                contentRequest.sortingKey
            );
            let totalCount = watchlistContent ? watchlistContent.length : 0;
            let response = {watchlistContent, totalCount};
            return response;
        } catch (err) {
            throw err;
        }
    }

    async deleteWatchList(request){
        if (!request)
        throw Utils.error(
            {},
            apiFailureMessage.INVALID_PARAMS,
            httpConstants.RESPONSE_CODES.FORBIDDEN
        );
    try {
        let userDetail = await WatchlistAddressSchema.getUserAddress({
            _id: request._id,
            isWatchlistAddress:true
        });
        if (!userDetail) {
            throw Utils.error(
                {},
                apiFailureMessage.ID_NOT_EXISTS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        }
        const response = await WatchlistAddressSchema.findAndUpdateData(
           {_id:request._id}, {$set: {isDeleted:true , modifiedOn : new Date().getTime()}}
        );
       
        return response;
    } catch (err) {
        throw err;
    }
    }
}
