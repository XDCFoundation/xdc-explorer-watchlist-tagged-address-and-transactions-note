import { apiFailureMessage, httpConstants} from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/userTransaction"
import TagAddressSchema from "../../models/tagAddress";
import UserAddressSchema from "../../models/userAddressModel";
export default class Manger {
    search = async (requestData) => {
        console.log(requestData)
        if (!requestData || !requestData.userId )

            throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);
        try {

            if(requestData.search==1){
                delete requestData.search

                let contentRequest = parseGetcontentRequest(requestData)

                const contentList = await UserAddressSchema.getFilteredData(contentRequest.requestData, contentRequest.selectionKeys, contentRequest.skip, contentRequest.limit, contentRequest.sortingKey);
                // console.log("request 1",contentRequest)
                return contentList;
            }

            if(requestData.search==2)
            {
                delete requestData.search

                let contentRequest = parseGetcontentRequest(requestData)
                const contentList = await UserTransactionSchema.getFilteredData(contentRequest.requestData, contentRequest.selectionKeys, contentRequest.skip, contentRequest.limit, contentRequest.sortingKey);
                // console.log("request 2",contentRequest)
                return contentList;
            }

            if (requestData.search==3){
                delete requestData.search
                let contentRequest = parseGetcontentRequest(requestData)

                const contentList = await TagAddressSchema.getFilteredData(contentRequest.requestData, contentRequest.selectionKeys, contentRequest.skip, contentRequest.limit, contentRequest.sortingKey);
                // console.log("request 3",contentRequest)
                return contentList;

            }


        }catch (error) {
            throw error
        }
    }
}

const parseGetcontentRequest = (requestObj) => {
    if (!requestObj) return {};
    let skip = 0;
    if (requestObj.skip || requestObj.skip === 0) {
        skip = requestObj.skip;
        delete requestObj.skip
    }
    let limit = 0;
    if (requestObj.limit) {
        limit = requestObj.limit;
        delete requestObj.limit
    }
    let sortingKey = '';
    if (requestObj.sortingKey) {
        sortingKey = requestObj.sortingKey;
        delete requestObj.sortingKey;
    }
    let selectionKeys = '';
    if (requestObj.selectionKeys) {
        selectionKeys = requestObj.selectionKeys;
        delete requestObj.selectionKeys
    }
    let searchQuery = [];
    if (requestObj.searchKeys && requestObj.searchValue && Array.isArray(requestObj.searchKeys) && requestObj.searchKeys.length) {
        requestObj.searchKeys.map((searchKey) => {
            let searchRegex = { "$regex": requestObj.searchValue, "$options": "i" };
            searchQuery.push({ [searchKey]: searchRegex });
        });
        requestObj["$or"] = searchQuery;
    }
    if (requestObj.searchKeys)
        delete requestObj.searchKeys;
    if (requestObj.searchValue)
        delete requestObj.searchValue;
    return {
        requestData: requestObj,
        skip: skip,
        limit: limit,
        sortingKey: sortingKey,
        selectionKeys: selectionKeys
    };
}