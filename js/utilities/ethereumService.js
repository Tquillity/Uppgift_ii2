// ============================================================
// ethereumService.js
// ============================================================
import config from '../utilities/config.js';

// ======== Object for Ethereum Services functions ========
const ethereumServices = {
    
    // ======== requestAccounts function ========
    async requestAccounts() {
        if (typeof ethereum !== 'undefined') {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            return accounts;
        } else {
            alert('please install metamask to proceed!');
            return [];
        }
    },

    // ======== getBalance function ========
    async getBalance(account) {
        if (typeof ethereum !== 'undefined') {
            const balance = await ethereum.request({
                method:'eth_getBalance',
                params: [account, 'latest'],
            });
            return (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(2);
        }
        return 0;
    },

    // ======== sendTransaction function ========
    async sendTransaction(from, to, amount) {
        try{
            const params = [
                {
                    from: from,
                    to: to,
                    value: Number(amount * Math.pow(10, 18)).toString(16),
                    gas: Number(21000).toString(16),
                    gasPrice: Number(2500000).toString(16),
                },
            ];
            const response = await ethereum.request({
                method: 'eth_sendTransaction',
                params, params,
            });
            return response;         
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    // ======== getLatestBlock function ========
    async getLatestBlock() {
        if (typeof ethereum !== 'undefined') {
            const latestBlock = await ethereum.request({
                method: 'eth_blockNumber',
            });
            return parseInt(latestBlock, 16);
        }
        return 0;
    },

    // ======== fetchLatestTransactions function ========
    async fetchLatestTransactions(account) {
        const url = `${config.etherscanApiUrl}?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&sort=desc&apikey=${config.etherscanApiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.result.slice(0,10).map(tx => ({
            from: tx.from,
            to: tx.to,
            value: (parseInt(tx.value)/ Math.pow(10, 18)).toFixed(2) + 'ETH',
            date: new Date(tx.timeStamp * 1000).toLocaleDateString("sv-SE"),
            time: new Date(tx.timeStamp * 1000).toLocaleTimeString("sv-SE"),
        }));
    }
};

export default ethereumServices;