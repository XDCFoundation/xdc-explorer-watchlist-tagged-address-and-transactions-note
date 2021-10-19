/**
 * Created by AyushK on 18/09/20.
 */
import * as ValidationManger from "../middleware/validation";
import TestModule from "../app/modules/testModule";
import TrxPvtModule from "../app/modules/transactionPrivateNote";
import AddTransactionLabel from "../app/modules/addTransactionLabel";
import {stringConstants} from "../app/common/constants";
import UserController from "../app/modules/signIn";
import AuthModule from '../app/modules/auth0/index';

module.exports = (app) => {
    app.get('/', (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

    /**
     * route definition
     */
    app.get("/test-route", ValidationManger.validateUserLogin, new TestModule().testRoute);
    app.get("/transaction-private-note", ValidationManger.validateGetTransactionLable, new TrxPvtModule().transactionPrivateNote);
    app.post("/add-transaction-label", ValidationManger.validateTransactionLable, new AddTransactionLabel().addTransactionLabel);

    app.get("/sign-in", ValidationManger.validateUserLogin, new AuthModule().signIn );
    app.post("/change-password", ValidationManger.validateUserLogin, new AuthModule().changePassword);
    app.post('/delete-user', ValidationManger.validateUserLogin, new UserController().deleteUser);
    app.post("/add-address-tag", ValidationManger.validateUserLogin, new UserController().addTagAddress);
    app.get("/get-address-tag", ValidationManger.validateUserLogin, new UserController().getTagAddress);

};
