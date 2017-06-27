let express = require('express');
/* eslint-disable new-cap */
let router = express.Router();
/* eslint-enable new-cap */

/* GET home page. */
router.get('/', function(req, res) {
  res.send(200);
});

module.exports = router;
