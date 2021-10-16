import { apiFailureMessage, apiSuccessMessage} from "../../common/constants";
import UserTransactionSchema from "../../models/userTransaction"


export default class Manger {
    fetchtransactionPrivateNote= async (requestData) => {
        // API business logic
        console.log(requestData)
        try {
            if (!requestData) throw apiFailureMessage.INVALID_PARAMS;
            return await UserTransactionSchema.find(requestData)
            
     
          } catch (error) {
            throw error;
          }
        
    }

}
