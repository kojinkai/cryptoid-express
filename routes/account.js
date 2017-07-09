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

function formatPurchaseFromRaw(rawPurchase) {
  const { id, total } = rawPurchase;
  const currency = rawPurchase.amount.currency;

  const formattedPurchase = {
    currency,
    id,
    total
  }

  return formattedPurchase
}

router.get('/', (req, res) => {

  accountClient.getAccounts((err, response) => {
    if (err) {
      console.log(err);
    }

    const originalAccounts = JSON.parse(response.body);    
    const formattedAccounts = originalAccounts.data.map(formatAccountFromRaw);

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

    const originalPurchase = JSON.parse(response.body);
    const formattedPurchases = originalPurchase.data.map(formatPurchaseFromRaw);
    console.log('formatted purchases: ', formattedPurchases);
    res.send({ data: formattedPurchases });

  });

});

module.exports = router;
