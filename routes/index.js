import * as ValidationManger from "../middleware/validation";
// import TestModule from "../app/modules/testModule";
import TrxPvtModule from "../app/modules/transactionPrivateNote";
import AddTransactionLabel from "../app/modules/addTransactionLabel";
import {stringConstants} from "../app/common/constants";
import TaggedAddress from "../app/modules/tagAddress";
import AddWatchList from "../app/modules/watchList";
import NotifyUser from "../app/modules/notification"

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    // app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    app.get("/transaction-private-note/:userId",  new TrxPvtModule().transactionPrivateNote);
    app.post("/add-transaction-label", ValidationManger.validateTransactionLable, new AddTransactionLabel().addTransactionLabel);
    app.post("/add-address-tag", ValidationManger.validateTagAddressLable, new TaggedAddress().addTagAddress);
    app.get("/get-address-tag", ValidationManger.validateTagAddressLable, new TaggedAddress().getTagAddress);
    app.post('/addWatch', new AddWatchList().addWatchList);
    app.get("/getAddress", new AddWatchList().getAddressByUserId);

    app.get("/notify-user", ValidationManger.validateUserAddress, new NotifyUser().notifyUser);

};