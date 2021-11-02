import { apiFailureMessage, httpConstants} from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/userTransaction"
import TagAddressSchema from "../../models/tagAddress";
import UserAddressSchema from "../../models/userAddressModel";
import Utility from "../../utils";
export default class Manger {
    
    search = async (requestData) => {
        console.log(requestData)
        if (!requestData || !requestData.userId )

            throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);

        try {

            if(requestData.search==1)
            {
                delete requestData.search

                let contentRequest = Utility.parseGetContentRequest(requestData)
                const contentList = await UserAddressSchema.getFilteredData(contentRequest.requestData, contentRequest.selectionKeys, contentRequest.skip, contentRequest.limit, contentRequest.sortingKey);
                // console.log("request 1",contentRequest)
                return contentList;
            }

            if(requestData.search==2)
            {
                delete requestData.search

                let contentRequest = Utility.parseGetContentRequest(requestData)
                const contentList = await UserTransactionSchema.getFilteredData(contentRequest.requestData, contentRequest.selectionKeys, contentRequest.skip, contentRequest.limit, contentRequest.sortingKey);
                // console.log("request 2",contentRequest)
                return contentList;
            }

            if (requestData.search==3)
            {
                delete requestData.search
                let contentRequest = Utility.parseGetContentRequest(requestData)
                const contentList = await TagAddressSchema.getFilteredData(contentRequest.requestData, contentRequest.selectionKeys, contentRequest.skip, contentRequest.limit, contentRequest.sortingKey);
                // console.log("request 3",contentRequest)
                return contentList;

            }

        }catch (error) {
            throw error
        }
    }
}

