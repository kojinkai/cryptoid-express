const ApiBase = require('./api-base');
const request = require('request');

class AccountClient extends ApiBase {

  constructor(config, crypto, API_KEY, API_SECRET, ACCOUNT_ID) {
    super();
    this.config     = config;
    this.crypto     = crypto;
    this.API_KEY    = API_KEY;
    this.API_SECRET = API_SECRET;
    this.ACCOUNT_ID = ACCOUNT_ID;
  }

  getAccount(callback) {
    const options = this.createRequestOptions(this.config, this.crypto, this.API_KEY, this.API_SECRET, this.ACCOUNT_ID);
    request(options, callback);
  }  
}

module.exports = AccountClient;