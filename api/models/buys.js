const ApiBase = require('../api-base');
const request = require('request');

class BuysClient extends ApiBase {

  constructor(config, crypto, API_KEY, API_SECRET, ACCOUNT_ID) {
    super();
    this.config =  {
      path: `/v2/accounts/${ACCOUNT_ID}/buys`,
    };
    this.crypto     = crypto;
    this.API_KEY    = API_KEY;
    this.API_SECRET = API_SECRET;
    this.ACCOUNT_ID = ACCOUNT_ID;
  }

  getBuys(callback) {
    const config = Object.assign({
      method: 'GET',
      body: ''
    }, this.config);

    const options = this.createRequestOptions(config, this.crypto, this.API_KEY, this.API_SECRET);
    request(options, callback);
  }  
}

module.exports = BuysClient;