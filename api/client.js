const crypto  = require('crypto');
const AccountClient = require('./models/account');
const BuysClient    = require('./models/buys');

class Client {
  constructor(API_KEY, API_SECRET, ACCOUNT_ID) {
    this.apiKey    = API_KEY;
    this.apiSecret = API_SECRET;
    this.accountID = ACCOUNT_ID;
  }

  createClient(type, config) {
    switch (type) {
      case 'account':
        return new AccountClient(crypto, this.apiKey, this.apiSecret, this.accountID);
        break;
      case 'buys':
        return new BuysClient(crypto, this.apiKey, this.apiSecret, this.accountID);        
        break;
      default:
        throw new Error({
          name: 'TypeError',
          message: `
            When creating a new api client you must pass a valid type.
            Choose from 'account' or 'buys'.
          `
        });
    }
  }
}

module.exports = Client;