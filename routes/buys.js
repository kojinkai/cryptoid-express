const express = require('express');
const router  = express.Router();
const Client  = require('../api/client');

const client = new Client();
const buysClient = client.createBuysClient();

router.get('/', (req, res, next) => {
  buysClient.getBuys((err, response) => {
    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });

});

module.exports = router;
