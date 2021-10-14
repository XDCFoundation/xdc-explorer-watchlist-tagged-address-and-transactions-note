
export default class Manger {
    transactionPrivateNote= async (requestData) => {
        // API business logic
        console.log(requestData)
        // try {
        //     if (!requestData) throw apiFailureMessage.INVALID_PARAMS;
        //     return await UserTransactionSchema.find(requestData, selectionKey)
        //       .sort(sortCriteria)
        //       .skip(skip)
        //       .limit(limit);
        //   } catch (error) {
        //     throw error;
        //   }
        return "working";
    }
}
