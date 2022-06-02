import Utils from "../../utils";
import WatchlistAddressSchema from "../../models/UserWatchlistAddress";
import { apiFailureMessage, httpConstants } from "../../common/constants";

const parseGetcontentRequest = (requestObj) => {
  if (!requestObj) return {};
  let skip = 0;
  if (requestObj.skip || requestObj.skip === 0) {
    skip = requestObj.skip;
    delete requestObj.skip;
  }
  let limit = 0;
  if (requestObj.limit) {
    limit = requestObj.limit;
    delete requestObj.limit;
  }
  let sortingKey = "";
  if (requestObj.sortingKey) {
    sortingKey = requestObj.sortingKey;
    delete requestObj.sortingKey;
  }
  let selectionKeys = "";
  if (requestObj.selectionKeys) {
    selectionKeys = requestObj.selectionKeys;
    delete requestObj.selectionKeys;
  }
  let searchQuery = [];
  if (
    requestObj.searchKeys &&
    requestObj.searchValue &&
    Array.isArray(requestObj.searchKeys) &&
    requestObj.searchKeys.length
  ) {
    requestObj.searchKeys.map((searchKey) => {
      let searchRegex = { $regex: requestObj.searchValue, $options: "i" };
      searchQuery.push({ [searchKey]: searchRegex });
    });
    requestObj["$or"] = searchQuery;
  }
  if (requestObj.searchKeys) delete requestObj.searchKeys;
  if (requestObj.searchValue) delete requestObj.searchValue;
  return {
    requestData: requestObj,
    skip: skip,
    limit: limit,
    sortingKey: sortingKey,
    selectionKeys: selectionKeys,
  };
};

export default class BlManager {
  addWatchlist = async (request) => {
    let addressDetail = await WatchlistAddressSchema.findOne({
      userId: request.userId,
      address: request.address,
      isDeleted: false,
    });
    if (addressDetail) {
      throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
    }
    // Utils.lhtLog('Watchlist: BL Manager', `add-watchlist`, addressDetail.length, '', httpConstants.LOG_LEVEL_TYPE.INFO)
    // let addressLength = addressDetail.length;
    // for(var i=0; i<addressLength; i++){
    //     if (addressDetail[i].address === request.address && addressDetail[i].isDeleted === false) {
    //         Utils.lhtLog('Watchlist: BL Manager', `add-watchlist`, "Address Already Exist", '', httpConstants.LOG_LEVEL_TYPE.INFO)
    //         throw apiFailureMessage.ADDRESS_ALREADY_EXISTS;
    //     }
    //     else if(addressDetail[i].address === request.address && addressDetail[i].isDeleted === true){
    //         Utils.lhtLog('Watchlist: BL Manager', `add-watchlist`, "New Address", '', httpConstants.LOG_LEVEL_TYPE.INFO)
    //        return await WatchlistAddressSchema.findAndUpdateData({userId: request.userId , address:request.address},
    //         {
    //             isDeleted:false,
    //             modifiedOn:Date.now(),
    //             notification:request && request.notification ? request.notification : {}
    //         }
    //         )
    //     }
    // }
    let addressObj = this.parseWatchlistData(request);
    return addressObj.save();
  };

  parseWatchlistData(requestObj) {
    let addressObj = new WatchlistAddressSchema(requestObj);
    addressObj.address = requestObj.address;
    addressObj.userId = requestObj.userId;
    addressObj.description = requestObj.description;
    addressObj.addedOn = Date.now();
    addressObj.tagName = "";
    addressObj.balance = 0;
    addressObj.notification.type = requestObj.type;
    addressObj.notification.isEnabled = requestObj.isEnabled;
    addressObj.isTaggedAddress = false;
    addressObj.isWatchlistAddress = true;
    addressObj.isDeleted = false;
    addressObj.isActive = true;
    addressObj.createdOn = Date.now();
    addressObj.modifiedOn = Date.now();
    return addressObj;
  }

  editWatchList = async (request) => {
    // let userDetail = await WatchlistAddressSchema.getUserAddress({
    //   _id: request._id,
    // });
    // userDetail = {
    //   modifiedOn: new Date().getTime(),
    // };
    // if (!userDetail) {
    //   throw Utils.error(
    //     {},
    //     apiFailureMessage.ID_NOT_EXISTS,
    //     httpConstants.RESPONSE_CODES.FORBIDDEN
    //   );
    // }
    let userDetail = {};
    if (request.address) {
      userDetail["address"] = request.address;
    }
    if (request.description) {
      userDetail["description"] = request.description;
    }
    if (
      request.notification &&
      request.notification.type 
    ) {
      userDetail["notification"] = request.notification;
    }
    return WatchlistAddressSchema.findAndUpdateData(
      { _id: request._id },
      userDetail
    );
  };

  async getAddressByUserId(requestData) {
    return WatchlistAddressSchema.find({
      isActive: true,
      isDeleted: false,
      userId: requestData.userId,
      isWatchlistAddress: true,
    });
  }

  async getListOfWatchList(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
    } catch (err) {
      throw err;
    }
  }

  async getContentWatchlist(request) {
    if (!request)
      throw Utils.error(
        {},
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    try {
      request["isDeleted"] = false;
      let contentRequest = parseGetcontentRequest(request);

      // const watchlistContent = await WatchlistAddressSchema.getFilteredData(
      //     contentRequest.requestData,
      //     contentRequest.selectionKeys,
      //     contentRequest.skip,
      //     contentRequest.limit,
      //     contentRequest.sortingKey
      // );

      let skip =
        typeof contentRequest.skip === "object"
          ? 0
          : Number(contentRequest.skip);
      let query = [
        { $match: contentRequest.requestData },
        { $skip: skip },
        { $limit: Number(contentRequest.limit) },
        {
          $lookup: {
            from: "xin-accounts",
            localField: "address",
            foreignField: "address",
            as: "addressDetail",
          },
        },
        {
          $project: {
            address: 1,
            userId: 1,
            description: 1,
            balance: {
              $arrayElemAt: [
                {
                  $cond: {
                    if: { $gt: [{ $size: "$addressDetail" }, 0] },
                    then: "$addressDetail.balance",
                    else: [0],
                  },
                },
                0,
              ],
            },
            tagName: 1,
            addedOn: 1,
            notification: 1,
            isTaggedAddress: 1,
            isWatchlistAddress: 1,
            isDeleted: 1,
            isActive: 1,
            createdOn: 1,
            modifiedOn: 1,
          },
        },
      ];

      let watchlistContent = await WatchlistAddressSchema.aggregate(
        query
      ).catch((err) => {
        console.log("err", err);
      });
      let totalCount = watchlistContent ? watchlistContent.length : 0;
      return { watchlistContent, totalCount };
    } catch (err) {
      throw err;
    }
  }

  async deleteWatchList(request) {
    // try {
    //   let userDetail = await WatchlistAddressSchema.getUserAddress({
    //     _id: request._id,
    //     isWatchlistAddress: true,
    //   });
    //   if (!userDetail) {
    //     throw Utils.error(
    //       {},
    //       apiFailureMessage.ID_NOT_EXISTS,
    //       httpConstants.RESPONSE_CODES.FORBIDDEN
    //     );
    //   }
    return WatchlistAddressSchema.findAndUpdateData(
      { _id: request._id, isWatchlistAddress: true },
      { isDeleted: true, modifiedOn: new Date().getTime() }
    );

    //   return response;
    //     } catch (err) {
    //       throw err;
    //     }
  }
}
