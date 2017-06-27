const ApiBase = require('../api-base');
const request = require('request');

class AccountClient extends ApiBase {

  constructor() {
    super();
    this.apiVersion = 'v2';
    this.resource = 'accounts';
  }

  getAccounts(callback) {
    console.log('****\nmodel: getting accounts');
    const config = {
      method: 'GET',
      body: '',
      path: `/${this.apiVersion}/${this.resource}`
    };

    const options = this.createRequestOptions(config);
    console.log('request with these options: ', options);
    request(options, callback);
  }

  getAccountByID(id, callback) {
    console.log('****\nmodel: getting account: ', id);
    const config = {
      method: 'GET',
      body: '',
      path: `/${this.apiVersion}/${this.resource}/${id}`
    };
    console.log('request with this config: ', config);
    const options = this.createRequestOptions(config);
    
    request(options, callback);
  }

  getBuysByID(id, callback) {
    console.log('****\nmodel: getting buys: ', id);
    const config = {
      method: 'GET',
      body: '',
      path: `/${this.apiVersion}/${this.resource}/${id}/buys`
    };

    const options = this.createRequestOptions(config);
    console.log('request with these options: ', options);
    request(options, callback);
  }


}

module.exports = AccountClient;
