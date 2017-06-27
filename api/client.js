const AccountClient = require('./models/account');
const BuysClient    = require('./models/buys');

class Client {

  createAccountClient() {
    return new AccountClient();
  }

  createBuysClient() {
    return new BuysClient();
  }
}

module.exports = Client;
