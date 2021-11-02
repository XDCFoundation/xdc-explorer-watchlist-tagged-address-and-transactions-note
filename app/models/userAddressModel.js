let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const UserAddressSchema = new Schema({
  address: { type: String, default: "" },
  userId: { type: String, default: "" },
  description: { type: String, default: "" },
  nameTag: { type: Number, default: "" },
  balance: { type: Number, default: 0 },
  addedOn: { type: Number, default: Date.now() },
  notification: {
    type: { type: String, default: "", enum: [NO, INOUT, IN, OUT] },
    isEnabled: { type: Boolean, default: false },
  },
  isDeleted: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdOn: { type: Number, default: Date.now() },
  modifiedOn: { type: Number, default: Date.now() },
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
  findData: function (findObj) {
    return this.find(findObj);
  },
  findAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, { new: true });
  },
  updateUserAddress: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      returnNewDocument: true,
    });
  },
  //   updateUserAddress: function (findObj, updateObj) {
  //     return this.updateMany(findObj, updateObj);
  //   },
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
module.exports = mongoose.model("xin-user-address", UserAddressSchema);
