const ApiBase = require('./api-base');
const request = require('request');

function AccountClient(config, crypto, API_KEY, API_SECRET, ACCOUNT_ID) {
  this.config     = config;
  this.crypto     = crypto;
  this.API_KEY    = API_KEY;
  this.API_SECRET = API_SECRET;
  this.ACCOUNT_ID = ACCOUNT_ID;

  if (!(this instanceof AccountClient)) {
    return new AccountClient();
  }
}

AccountClient.prototype = Object.create(ApiBase.prototype);

AccountClient.prototype.getAccount = function(callback) {
  const options = this.createRequestOptions(this.config, this.crypto, this.API_KEY, this.API_SECRET, this.ACCOUNT_ID);
  request(options, callback);
}

module.exports = AccountClient;