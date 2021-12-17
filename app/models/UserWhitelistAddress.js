let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const WhitelistAddressSchema = new Schema({
    address: {type: String, default: ""},
    userId: {type: String, default: ""},
    description: {type: String, default: ""},
    tagName: {type: String, default: ''},
    balance: {type: Number, default: 0},
    addedOn: {type: Number, default: Date.now()},
    notification: {
        type: {type: String, default: ""},
        isEnabled: {type: Boolean, default: false},
    },
    isTaggedAddress: {type: Boolean, default: false},
    isWatchlistAddress: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    createdOn: {type: Number, default: Date.now()},
    modifiedOn: {type: Number, default: Date.now()},
});

WhitelistAddressSchema.method({
    saveData: async function () {
        return await this.save();
    },
});

WhitelistAddressSchema.static({
    getUserAddress: function (findQuery) {
        return this.findOne(findQuery);
    },
    findData: function (findObj) {
        return this.find(findObj);
    },
    findAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {new: true});
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    },
    findOneData: function (findObj) {
        return this.findOne(findObj)
    },
    findDataWithAggregate: function (findObj) {
        return this.aggregate(findObj)
    },
    updateUserAddress: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            returnNewDocument: true,
        });
    },
    bulkUpsert: function (bulkOps) {
        return this.bulkWrite(bulkOps);
    },
    getFilteredData: function (
        requestData,
        selectionKeys,
        offset,
        limit,
        sortingKey
    ) {
        return this.find(requestData, selectionKeys)
            .sort(sortingKey)
            .skip(parseInt(offset))
            .limit(parseInt(limit))
            .exec();
    },
});
module.exports = mongoose.model("xin-user-watchlist-address", WhitelistAddressSchema);
