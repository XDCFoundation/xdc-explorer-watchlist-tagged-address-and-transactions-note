import {httpConstants} from "../common/constants";
const CronMasterJob = require('cron-master').CronMasterJob;
import JobController from "../modules/jobs";

module.exports = new CronMasterJob({

    timeThreshold: (2 * 60 * 1000),

    meta: {
        name: 'Notification for watchlists',
        requestID: ""
    },

    cronParams: {
        cronTime: "*/10 * * * * *",
        onTick: async function (job, done) {
            lhtWebLog('onTick', `Cron ato fetch transactions`, {}, "", '', httpConstants.LOG_LEVEL_TYPE.INFO);
            await JobController.handleWatchlistTransactions();
            done(null, 'ok');
        }
    }
});