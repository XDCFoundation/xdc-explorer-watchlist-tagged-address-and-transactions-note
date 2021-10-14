import { apiFailureMessage, httpConstants} from "../../common/constants";
import Utils from "../../utils";
import UserTransactionSchema from "../../models/userTransaction"
export default class Manger {
    addTransactionLabel = async (requestData) => {
        console.log(requestData)
        if (!requestData || !requestData.userId || !requestData.trxLable || !requestData.transactionHash)

        throw Utils.error({}, apiFailureMessage.INVALID_PARAMS, httpConstants.RESPONSE_CODES.FORBIDDEN);
      try {
          let lableTrx = new UserTransactionSchema(requestData);
          return await lableTrx.save();
      }catch (error) {
        throw error
      }
    }
}
