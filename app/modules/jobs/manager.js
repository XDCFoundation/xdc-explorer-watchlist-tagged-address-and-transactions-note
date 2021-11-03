import Transactions from "../pendingTransactions"
import { httpConstants } from "../../common/constants"
export default class BLManager {


  static async handleWatchlistTransactions () {
    lhtWebLog("cron running", "", "handleWatchlistTransactions", "", "Kajal", httpConstants.LOG_LEVEL_TYPE.FUNCTIONAL)
    await Transactions.pendingTransactions()
    return true
  }
}
