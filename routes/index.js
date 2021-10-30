import * as ValidationManger from "../middleware/validation";
// import TestModule from "../app/modules/testModule";
import TrxPvtModule from "../app/modules/transactionPrivateNote";
import AddTransactionLabel from "../app/modules/addTransactionLabel";
import { stringConstants } from "../app/common/constants";
import TaggedAddress from "../app/modules/tagAddress";
import AddWatchList from "../app/modules/watchList";

module.exports = (app) => {
  app.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  /**
   * route definition
   */
  // app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
  app.get(
    "/transaction-private-note/:userId",
    new TrxPvtModule().transactionPrivateNote
  );

  app.post(
    "/add-transaction-label",
    ValidationManger.validateTransactionLable,
    new AddTransactionLabel().addTransactionLabel
  );

  app.post(
    "/add-address-tag",
    ValidationManger.validateTagAddressLable,
    new TaggedAddress().addTagAddress
  );

  app.get("/get-address-tag/:userId", new TaggedAddress().getTagAddress);

  app.post(
    "/add-watchlist",
    ValidationManger.validateWatchList,
    new AddWatchList().addWatchList
  );

  app.get("/getAddress/:UserId", new AddWatchList().getAddressByUserId);

  app.put(
    "/edit-address-tag",
    ValidationManger.validateEditTagAddressLable,
    new TaggedAddress().editTagAddress
  );

  app.put(
    "/edit-watchlist",
    ValidationManger.validateEditWatchList,
    new AddWatchList().editWatchList
  );

  app.put(
    "/edit-transaction-Private-note",
    ValidationManger.validateEditTransactionPrivateNote,
    new TrxPvtModule().editTransactionPrivateNote
  );

  app.get(
    "/get-content-watchlist/:limit/:skip",
    new AddWatchList().getContentWatchlist
  );

  app.get(
    "/get-content-txn-label/:limit/:skip",
    new AddTransactionLabel().getContentTxnLabel
  );

  app.get(
    "/get-content-tag-address/:limit/:skip",
    new TaggedAddress().getContentTagAddress
  );
};
