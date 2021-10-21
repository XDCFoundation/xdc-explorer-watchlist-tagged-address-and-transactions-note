import * as ValidationManger from "../middleware/validation";

import AddWatchList from "../app/modules/watchList/index"
import {stringConstants} from "../app/common/constants";
import TaggedAddress from "../app/modules/tagAddress";

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    app.get("/transaction-private-note/:userId",  new TrxPvtModule().transactionPrivateNote);
    app.post("/add-transaction-label", ValidationManger.validateTransactionLable, new AddTransactionLabel().addTransactionLabel);
   
    app.post("/add-address-tag", ValidationManger.validateTagAddressLable, new TaggedAddress().addTagAddress);
    app.get("/get-address-tag", ValidationManger.validateTagAddressLable, new TaggedAddress().getTagAddress);
    app.post('/addWatch', new AddWatchList().addWatchList);
    app.get("/getAddress", new AddWatchList().getAddressByUserId);

};
