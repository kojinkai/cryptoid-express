const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const {
  allAccounts,
  bitcoinBuys,
  ethereumBuys
} = require('./dummy-data');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

function formatPurchaseFromRaw(rawPurchase) {
  const { id, total, status, created_at } = rawPurchase;
  const currency = rawPurchase.amount.currency;

  const formattedPurchase = {
    currency,
    id,
    total,
    status,
    created_at,
  }

  return formattedPurchase
}

const app = express();
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.get('/account', (req, res, next) => {
  console.log('sending accounts');
  res.send(allAccounts);
});

app.get('/account/:id/buys', (req, res, next) => {
  let purchases;

  if (req.params.id === 'a1671f2b-19c2-570c-be22-f71062d93594') {
    purchases = bitcoinBuys;
  } else if (req.params.id === '1945c787-d445-5c1b-950a-24c84fc073e7') {
    purchases = ethereumBuys;
  }

  const formattedPurchases = purchases.data.map(formatPurchaseFromRaw);
  res.send({ data: formattedPurchases });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
