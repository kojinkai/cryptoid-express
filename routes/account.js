const express = require('express');
const crypto  = require('crypto');
const request = require('request');
const router  = express.Router();

// const Client = require('coinbase').Client;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const accountID = process.env.ACCOUNT_ID;

const timestamp = Math.floor(Date.now() / 1000);

// set the parameter for the request message
const req = {
  method: 'GET',
  path: `/v2/accounts/${accountID}`,
  body: ''
};

const message = timestamp + req.method + req.path + req.body;

//create a hexedecimal encoded SHA256 signature of the message
const signature = crypto.createHmac("sha256", apiSecret).update(message).digest("hex");

//create the request options object
const options = {
  baseUrl: 'https://api.coinbase.com/',
  url: req.path,
  method: req.method,
  headers: {
    'CB-ACCESS-SIGN': signature,
    'CB-ACCESS-TIMESTAMP': timestamp,
    'CB-ACCESS-KEY': apiKey,
    'CB-VERSION': '2016-04-30'
  }
};

router.get('/', (req, res, next) => {
  request(options, (err, response) => {

    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });
});

module.exports = router;
