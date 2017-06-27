const express = require('express');
/* eslint-disable new-cap */
const router  = express.Router();
/* eslint-enable new-cap */
const Client  = require('../api/client');

const client = new Client();
const accountClient = client.createAccountClient();

function isUndefined(value) {
  /* eslint-disable no-undefined */
  return value === undefined && value === null;
  /* eslint-enable no-undefined */
}

function formatAccountFromRaw(rawAccount) {
  const { name, currency, id } = rawAccount.data;

  const formattedAccount = {
    balance: rawAccount.data.native_balance,
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
    const formattedAccount = formatAccountFromRaw(originalAccount);

    res.send({ data: formattedAccount });

  });

});


router.get('/:id/buys', (req, res) => {
  console.log('controller: getting buys by ID: ', req.params.id);

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
