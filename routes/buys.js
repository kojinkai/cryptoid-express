const express = require('express');
const router  = express.Router();
const Client  = require('../api/client');

const client = new Client();
const accountClient = client.createAccountClient();

router.get('/', (req, res, next) => {
  accountClient.getAccount((err, response) => {
    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });

});

module.exports = router;
