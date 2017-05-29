function ApiBase() {
  if (!(this instanceof ApiBase)) {
    return new ApiBase();
  }
}

ApiBase.prototype.createRequestOptions = function(config, crypto, API_KEY, API_SECRET, ACCOUNT_ID) {
  const timestamp = Math.floor(Date.now() / 1000);
  const message = timestamp + config.method + config.path + config.body;
  const signature = crypto.createHmac('sha256', API_SECRET).update(message).digest('hex');
  const options = {
    baseUrl: 'https://api.coinbase.com/',
    url: config.path,
    method: config.method,
    headers: {
      'CB-ACCESS-SIGN': signature,
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-KEY': API_KEY,
      'CB-VERSION': '2016-04-30'
    }
  };

  return options;
};

module.exports = ApiBase;