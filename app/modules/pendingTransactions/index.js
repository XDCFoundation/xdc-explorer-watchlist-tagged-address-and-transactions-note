import PendingTransactionsManager from "./pendingTransactions";


export default class PendingTransactions {
    static async pendingTransactions() {
        await new PendingTransactionsManager().syncTransactions();
    }
    static async listenAddresses() {
        await new PendingTransactionsManager().listenAddresses();
    }
}
