const crypto = require('crypto');

class ApiBase {
  constructor() {
    /* eslint-disable no-process-env */
    this.apiKey    = process.env.API_KEY;
    this.apiSecret = process.env.API_SECRET;
    /* eslint-enable no-process-env */
  }

  createRequestOptions(config) {
    const timestamp = Math.floor(Date.now() / 1000);
    const message = timestamp + config.method + config.path + config.body;
    console.log('message is: ', message);
    const signature = crypto.createHmac('sha256', this.apiSecret).update(message).digest('hex');
    const options = {
      baseUrl: 'https://api.coinbase.com/',
      url: config.path,
      method: config.method,
      headers: {
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-KEY': this.apiKey,
        'CB-VERSION': '2016-04-30'
      }
    };

    return options;
  }
}

module.exports = ApiBase;
