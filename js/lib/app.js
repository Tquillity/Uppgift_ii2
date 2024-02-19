// ============================================================
// app.js - Application start
// ============================================================

import ethereumServices from "../utilities/ethereumService.js";
import ui from "../utilities/ui.js";

const initApp = () => {
    document.querySelector('#checkBalance').addEventListener('click', async () => {
        const account = await ethereumServices.requestAccounts();
        if (account.length > 0) {
            const balance = await ethereumServices.getBalance(account[0]);
            ui.setBalance(balance +' ETH');

            const transactions = await ethereumServices.fetchLatestTransactions(account[0]);
            ui.updateTransactionList(transactions);

            const latestBlock = await ethereumServices.getLatestBlock();
            ui.setBlockNumber(latestBlock);
        }
    }); 



    document.querySelector('#sendTx').addEventListener('click', async () => {
        const transactionResponse = await ethereumServices.sendTransaction(
            ui.accountInput,
            ui.toAccountInput,
            ui.valueInput
        );
        if (transactionResponse) {
            ui.showTransactionResult('Transaction submitted SUCCESSFULLY, your TX HASH:', transactionResponse);

            //! This function only works if transaction is finished within 30 seconds so a gas fee
            //! of "aggresive" or "normal" is a requirement.
            setTimeout(async () => {
                const transactionList = document.getElementById('transactionList');
                transactionList.innerHTML = '';
                const account = ui.accountInput;
                const transactions = await ethereumServices.fetchLatestTransactions(account);
                ui.updateTransactionList(transactions, true);
            }, 30000);
            
        } else {
            ui.showTransactionResult("Transaction failed.");
        }
    });

    document.querySelector('#getLatestBlock').addEventListener('click', async () => {
        const latestBlock = await ethereumServices.getLatestBlock();
        ui.setBlockNumber(latestBlock);
    });

    ui.updateTransactionList();
};

document.addEventListener('DOMContentLoaded', initApp);