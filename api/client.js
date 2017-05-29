const AccountClient = require('./models/account');
const BuysClient    = require('./models/buys');

class Client {
  constructor() {
    this.accountID = process.env.ACCOUNT_ID;
  }

  createAccountClient() {
    return new AccountClient(this.accountID);
  }

  createBuysClient() {
    return new BuysClient(this.accountID);
  }
}

module.exports = Client;