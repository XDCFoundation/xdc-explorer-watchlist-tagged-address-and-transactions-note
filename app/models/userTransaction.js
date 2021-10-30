let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const UserTransactionSchema = new Schema({
    transactionHash: { type: String, default: "" },

    userId: { type: String, default: "" },

    trxLable: { type: String, default: "" },

    note: { type: Number, default: "" },

    addedOn: { type: Number, default: Date.now() },

    isDeleted: { type: Boolean, default: false },

    isActive: { type: Boolean, default: false },

    createdOn: { type: Number, default: Date.now() },

    modifiedOn: { type: Number, default: Date.now() },
});

UserTransactionSchema.method({
    saveData: async function () {
        return await this.save();
    },
});

UserTransactionSchema.static({
    getUserTransaction: function (findQuery) {
        return this.findOne(findQuery);
    },

    updateUserTransaction: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            returnNewDocument: true,
        });
    },

    updateUserTransaction: function (findObj, updateObj) {
        return this.updateMany(findObj, updateObj);
    },
    
    findAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, { new: true })
      },

    getFilteredData: function (requestData, selectionKeys, offset, limit, sortingKey) {
        return this.find(requestData, selectionKeys).sort(sortingKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
    },

    getUserTransaction: function (
        findObj,
        selectionKey = "",
        skip = 0,
        limit = 0,
        sort = 1
    ) {
        return this.find(findObj, selectionKey).skip(skip).limit(limit).sort(sort);
    },

    bulkUpsert: function (bulkOps) {
        return this.bulkWrite(bulkOps);
    },
});

module.exports = mongoose.model(
    "xin-user-transaction-notes",
    UserTransactionSchema
);
