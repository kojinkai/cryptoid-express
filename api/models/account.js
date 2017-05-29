const ApiBase = require('../api-base');
const request = require('request');

class AccountClient extends ApiBase {

  constructor(ACCOUNT_ID) {
    super();
    this.config =  {
      path: `/v2/accounts/${ACCOUNT_ID}`
    };
  }

  getAccount(callback) {
    const config = Object.assign({
      method: 'GET',
      body: ''
    }, this.config);

    const options = this.createRequestOptions(config);
    request(options, callback);
  }  
}

module.exports = AccountClient;