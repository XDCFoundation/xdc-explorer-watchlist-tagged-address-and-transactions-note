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
    
    app.post('/addWatch', new AddWatchList().addWatchList);
    app.get("/getAddress", new AddWatchList().getAddressByUserId);
    
};
