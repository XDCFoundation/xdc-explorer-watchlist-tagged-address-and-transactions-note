import {
    apiFailureMessage,
    apiSuccessMessage,
    httpConstants,
} from "../../common/constants";
import Utils from "../../utils";
import TagAddressSchema from "../../models/UserTagAddress";

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

export default class Manger {
    addTagAddress = async (request) => {
        if (!request || !request.userId || !request.address || !request.tagName)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            let TagDetails = await TagAddressSchema.findOneData({
                address: request.address,
            });
            if (TagDetails) {
                throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
            } else {
                let addressObj = this.parseTagAddressData(request);
                return await addressObj.saveData();
            }
        } catch (error) {
            throw error;
        }
    };

    getUserAddressTagUsingHash = async (reqObj) => {
        try {
            return await TagAddressSchema.find({
                userId:reqObj.userId,
                address:reqObj.address,
                isTaggedAddress: true,
                isActive: true,
                isDeleted: false
            });
        } catch (error) {
            throw error;
        }
    };


    parseTagAddressData(requestObj) {
        let tagAddressObj = new TagAddressSchema(requestObj);
        tagAddressObj.address = requestObj.address;
        tagAddressObj.userId = requestObj.userId;
        tagAddressObj.description = "";
        tagAddressObj.addedOn = Date.now();
        tagAddressObj.tagName = requestObj.tagName;
        tagAddressObj.balance = 0;
        tagAddressObj.notification = {
            type: "NO",
            isEnabled: false
        };
        tagAddressObj.isTaggedAddress = true;
        tagAddressObj.isWatchlistAddress = false;
        tagAddressObj.isDeleted = false;
        tagAddressObj.isActive = true;
        tagAddressObj.createdOn = Date.now();
        tagAddressObj.modifiedOn = Date.now();
        return tagAddressObj;

    }

    getTagAddress = async ({userId}) => {
        if (!userId)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            return await TagAddressSchema.find({
                userId, isTaggedAddress: true, isActive: true,
                isDeleted: false
            });
        } catch (error) {
            throw error;
        }
    };

    editTagAddress = async (request) => {
        if (!request)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            let updateObj = await TagAddressSchema.findOneData({_id: request._id});
            updateObj = {
                modifiedOn: new Date().getTime(),
            };
            if (!updateObj) {
                throw Utils.error(
                    {},
                    apiFailureMessage.ID_NOT_EXIST,
                    httpConstants.RESPONSE_CODES.FORBIDDEN
                );
            }
            if (request.address) {
                updateObj["address"] = request.address;
            }
            if (request.tagName) {
                updateObj["tagName"] = request.tagName;
            }
            return TagAddressSchema.findOneAndUpdateData(
                {_id: request._id},
                updateObj
            );
        } catch (error) {
            throw error;
        }
    };

    async getContentTagAddress(request) {
        if (!request)
            throw Utils.error(
                {},
                apiFailureMessage.INVALID_PARAMS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        try {
            request["isDeleted"] = false;
            let contentRequest = parseGetcontentRequest(request);

            const tagAddressContent = await TagAddressSchema.getFilteredData(
                contentRequest.requestData,
                contentRequest.selectionKeys,
                contentRequest.skip,
                contentRequest.limit,
                contentRequest.sortingKey
            );

            let totalCount = tagAddressContent ? tagAddressContent.length : 0;
            return {tagAddressContent, totalCount};
        } catch (err) {
            throw err;
        }
    }

    async deleteTagAddress(request){
        if (!request)
        throw Utils.error(
            {},
            apiFailureMessage.INVALID_PARAMS,
            httpConstants.RESPONSE_CODES.FORBIDDEN
        );
    try {
        let tagAddress = await TagAddressSchema.findOneData({
            _id: request._id,
            isTaggedAddress:true
        });
        if (!tagAddress) {
            throw Utils.error(
                {},
                apiFailureMessage.ID_NOT_EXISTS,
                httpConstants.RESPONSE_CODES.FORBIDDEN
            );
        }
        const response = await TagAddressSchema.findAndUpdateData(
           {_id:request._id}, {$set: {isDeleted:true , modifiedOn : new Date().getTime()}}
        );
       
        return response;
    } catch (err) {
        throw err;
    }
    }
}
