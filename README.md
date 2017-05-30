# cryptoid-express

A lightweight express app to handle requests and decorate them with authentication headers

## Installation

```bash
$ git clone git@github.com:kojinkai/cryptoid-express.git && npm i
```

## Running the app
Put the following script in a file called start.sh in the project root.
This file is ignored and not checked into version control as it contains your api key & secret
```bash
#!/bin/bash

# Put the app in debug mode, useful for development
export DEBUG=cryptoid-express:*
# put your key here
export API_KEY=<_your_api_key_>
# put your secret key here
export API_SECRET=<_your_api_secret_>
# and your unique ID for your account
# n.b. ID's can be obtained by making an authenticated call to https://api.coinbase.com/v2/accounts/
# this will return all your accounts and their IDs
# see https://developers.coinbase.com/docs/wallet/api-key-authentication for more
export ACCOUNT_ID=<_your_account_ID_>
npm start
```

Then run
```bash
$ . ./start.sh
```

* This is the counterpart API interface for the front-end React application that extends the coinbase dashboard found here https://github.com/kojinkai/cryptoid