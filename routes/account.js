const express = require('express');
const crypto  = require('crypto');
const request = require('request');
const router  = express.Router();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const accountID = process.env.ACCOUNT_ID;
const AccountClient = require('../api/account');
const requestConfig = {
  method: 'GET',
  path: `/v2/accounts/${accountID}`,
  body: ''
};
const accountClient = new AccountClient(requestConfig, crypto, apiKey, apiSecret, accountID);

router.get('/', (req, res, next) => {
  accountClient.getAccount((err, response) => {
    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });

});

module.exports = router;
