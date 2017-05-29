const express = require('express');
const crypto  = require('crypto');
const request = require('request');
const router  = express.Router();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const accountID = process.env.ACCOUNT_ID;

router.get('/', (req, res, next) => {
  // set the parameter for the request message
  const requestConfig = {
    method: 'GET',
    path: `/v2/accounts/${accountID}`,
    body: ''
  };
  const timestamp = Math.floor(Date.now() / 1000);
  const message = timestamp + requestConfig.method + requestConfig.path + requestConfig.body;

  //create a hexedecimal encoded SHA256 signature of the message
  const signature = crypto.createHmac('sha256', apiSecret).update(message).digest('hex');

  const options = {
    baseUrl: 'https://api.coinbase.com/',
    url: requestConfig.path,
    method: requestConfig.method,
    headers: {
      'CB-ACCESS-SIGN': signature,
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-KEY': apiKey,
      'CB-VERSION': '2016-04-30'
    }
  };

  console.log('getting accounts...');
  request(options, (err, response) => {

    if (err) {
      console.log(err);
    }
    console.log('sonding...\n', response.body);
    res.send(response.body);

  });
});

module.exports = router;
