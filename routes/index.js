/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";

import AddWatchList from "../app/modules/watchList/index"
import {stringConstants} from "../app/common/constants";

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    app.get("/transaction-private-note", ValidationManger.validateGetTransactionLable, new TrxPvtModule().transactionPrivateNote);
    app.post("/add-transaction-label", ValidationManger.validateTransactionLable, new AddTransactionLabel().addTransactionLabel);
};
