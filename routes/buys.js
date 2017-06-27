const express = require('express');
/* eslint-disable new-cap */
const router  = express.Router();
/* eslint-enable new-cap */
const Client  = require('../api/client');

const client = new Client();
const buysClient = client.createBuysClient();

router.get('/', (req, res) => {
  buysClient.getBuys((err, response) => {
    if (err) {
      console.log(err);
    }

    res.send(response.body);

  });

});

module.exports = router;
