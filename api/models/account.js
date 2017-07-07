const ApiBase = require('../api-base');
const request = require('request');

class AccountClient extends ApiBase {

  constructor() {
    super();
    this.apiVersion = 'v2';
    this.resource = 'accounts';
  }

  getAccounts(callback) {
    const config = {
      method: 'GET',
      body: '',
      path: `/${this.apiVersion}/${this.resource}`
    };

    const options = this.createRequestOptions(config);
    request(options, callback);
  }

  getAccountByID(id, callback) {
    const config = {
      method: 'GET',
      body: '',
      path: `/${this.apiVersion}/${this.resource}/${id}`
    };
    const options = this.createRequestOptions(config);
    
    request(options, callback);
  }

  getBuysByID(id, callback) {
    const config = {
      method: 'GET',
      body: '',
      path: `/${this.apiVersion}/${this.resource}/${id}/buys`
    };

    const options = this.createRequestOptions(config);
    request(options, callback);
  }


}

module.exports = AccountClient;
