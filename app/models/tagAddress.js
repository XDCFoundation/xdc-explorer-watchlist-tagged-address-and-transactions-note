const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  userId: {type: Number, default: ''},
  tagName: { type: String, default: '' },
  address: { type: String, default: '' },
  addedOn: { type: Number, default: new Date() },
  modifiedOn: { type: Number, default: new Date() }
})

tagSchema.method({
  saveData: async function () {
    return this.save()
  }
})
tagSchema.static({
  findData: function (findObj) {
    return this.find(findObj)
  },
  findOneData: function (findObj) {
    return this.findOne(findObj)
  },
  findOneAndUpdateData: function (findObj, updateObj) {
    return this.findOneAndUpdate(findObj, updateObj, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    })
  },
  findDataWithAggregate: function (findObj) {
    return this.aggregate(findObj)
  },
  getFilteredData: function (requestData, selectionKeys, offset, limit, sortingKey) {
    return this.find(requestData, selectionKeys).sort(sortingKey).skip(parseInt(offset)).limit(parseInt(limit)).exec();
},
})
export default mongoose.model('xin-tag-address', tagSchema)
