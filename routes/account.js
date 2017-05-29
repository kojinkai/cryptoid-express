const express = require('express');
const router  = express.Router();

const apiKey    = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const accountID = process.env.ACCOUNT_ID;

const Client = require('../api/client');
const client = new Client(apiKey, apiSecret, accountID);
const accountClient = client.createClient('account');

router.get('/', (req, res, next) => {
  accountClient.getAccount((err, response) => {
    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });

});

module.exports = router;
