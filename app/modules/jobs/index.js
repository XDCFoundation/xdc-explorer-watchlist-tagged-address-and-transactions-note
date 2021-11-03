import BLManager from './manager'
import { httpConstants } from '../../common/constants'

export default class JobController {
  static async monitorMeter () {
    await BLManager.monitorMeters().catch((err) =>
      lhtWebLog('monitorMeter', 'Job Failed', err, 'developer', httpConstants.LOG_LEVEL_TYPE.ERROR)
    )
  }
  static async handleWatchlistTransactions(){
    lhtWebLog("cron starts", "", "handleWatchlistTransactions", "", "Kajal", httpConstants.LOG_LEVEL_TYPE.FUNCTIONAL)
    let handleWatchlistTransactionsResponse = BLManager.handleWatchlistTransactions();
    lhtWebLog("cron ends", "", "handleWatchlistTransactions", "", "Kajal", httpConstants.LOG_LEVEL_TYPE.FUNCTIONAL)
}
}
