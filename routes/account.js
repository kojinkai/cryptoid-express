const express = require('express');
/* eslint-disable new-cap */
const router  = express.Router();
/* eslint-enable new-cap */
const Client  = require('../api/client');
const isUndefined = require('lodash.isundefined');

const client = new Client();
const accountClient = client.createAccountClient();

function formatAccountFromRaw(rawAccount) {
  const { name, currency, id } = rawAccount;

  const formattedAccount = {
    balance: rawAccount.native_balance,
    currency,
    id,
    name
  };

  return formattedAccount;
}

router.get('/', (req, res) => {

  accountClient.getAccounts((err, response) => {
    if (err) {
      console.log(err);
    }
    const formattedAccounts = JSON.parse(response.body).data.map(account => formatAccountFromRaw(account));

    res.send({ data: formattedAccounts });

  });

});

router.get('/:id', (req, res) => {

  if (isUndefined(req.params.id)) {
    res.send('use a valid account ID');
  }

  accountClient.getAccountByID(req.params.id, (err, response) => {
    if (err) {
      console.log(err);
    }

    const originalAccount = JSON.parse(response.body);
    const formattedAccount = formatAccountFromRaw(originalAccount.data);

    res.send({ data: formattedAccount });

  });

});


router.get('/:id/buys', (req, res) => {

  if (isUndefined(req.params.id)) {
    res.send('use a valid account ID');
  }

  accountClient.getBuysByID(req.params.id, (err, response) => {
    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });

});

module.exports = router;
