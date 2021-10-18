let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserAddressSchema = new Schema({
    address: { type: String, default: "" },
    UserId: { type: String, default:""},
    description: { type: String, default: "" },
    nameTag:{ type: Number, default: "" },
    balance: { type: Number, default: 0 },
    addedOn: {type: Number, default: Date.now()},
    notification: {
    type:{type: String, default: "" },
    isEnabled: { type: Boolean, default: false },
    },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdOn: { type:Number,default: Date.now()},
    modifiedOn: { type:Number,default: Date.now()},
});


UserAddressSchema.method({
    saveData: async function () {
        return await this.save();
    },
});
UserAddressSchema.static({
    getUserAddress: function (findQuery) {
        return this.findOne(findQuery);
    },
    updateUserAddress: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            returnNewDocument: true,
        });
    },
    updateUserAddress: function (findObj, updateObj) {
        return this.updateMany(findObj, updateObj);
    },
    // getUserAddress: function (findObj, selectionKey = "", skip = 0, limit = 0, sort = 1) {
    //     return this.find(findObj, selectionKey).skip(skip).limit(limit).sort(sort);
    // },
    bulkUpsert: function (bulkOps) {
        return this.bulkWrite(bulkOps)
    }
});
module.exports= mongoose.model("xin-user-address", UserAddressSchema);