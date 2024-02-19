// ========================================
// ui.js - User Interface Utilities
// ========================================
import config from '../utilities/config.js';

// ======== Object for User Interface functions ========
const ui =  {
    // ======== setBalance getter function ========
    get accountInput() {
        return document.querySelector('#accountNumber').value;
    },

    // ======== setBalance getter function ========
    get toAccountInput() {
        return document.querySelector('#toAccountNumber').value;
    },

    // ======== transaction value getter function ========
    get valueInput() {
        return parseFloat(document.querySelector('#amount').value);
    },

    // ======== setBalance setter function ========
    setBalance(balance) {
        document.querySelector('#balance').innerText = balance;
    },

    // ======== setBlockNumber setter function ========
    setBlockNumber(blockNumber) {
        document.querySelector('#blockNumber').innerText = blockNumber;
    },

    // ======== showTransactionResult setter function ========
    showTransactionResult(message, transactionHash = '') {
        const resultContainer = document.querySelector('#transactionResult');
        resultContainer.innerHTML = `${message} `;
    
        if (transactionHash) {
            const link = document.createElement('a');
            link.href = `${config.etherscanHashEndpoint}${transactionHash}`;
            link.target = '_blank';
            link.textContent = `${transactionHash}`;
            resultContainer.appendChild(link);
        }
    },

    // ======== updateTransactionList setter function ========
    updateTransactionList(transactions, isNewTransaction = false) {
        const transactionList = document.getElementById('transactionList');
        transactionList.innerHTML = '';
    
        if (!transactions || transactions.length === 0) {
            const emptyCard = document.createElement('div');
            emptyCard.classList.add('transaction-card');
            emptyCard.textContent = 'Check the balance of your wallet to see the last 10 transactions.';
            transactionList.appendChild(emptyCard);
        } else {
            transactions.forEach((tx, index) => {
                const card = document.createElement('div');
                card.classList.add('transaction-card');

                if (isNewTransaction && index === 0) {
                    card.classList.add('new-transaction');
                }

                card.innerHTML = `
                    <p>Date: ${tx.date} Time: ${tx.time}</p>
                    <p>Amount: ${tx.value}</p>
                    <p>From: ${tx.from}</p>
                    <p>To: ${tx.to}</p>
                `;
                transactionList.appendChild(card);
            });
        }
    },
};

export default ui;