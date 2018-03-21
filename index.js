// const express = require('express');
// const app = express();

// // reply to request with "Hello World!"
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// //start a server on port 80 and log its start to our console
// const server = app.listen(80, () => {

//   const port = server.address().port;
//   console.log('Example app listening on port ', port);

// });

// // get something that is down from here http://www.isitdownrightnow.com/

const axios = require('axios');
const chalk = require('chalk');

const URLS = [
  'http://dimitrioslytras.com',
  'http://google.com',
  'https://cssmaid.netlify.com/',
  'http://www.000webhost.com',
  'http://www.sss.gov.ph',
];

const REQUEST_TIMEOUT = 5000;
const UPTIME_INTERVAL = 300000; // 5 minutes

const promises = URLS.map(url => axios.get(url, { timeout: REQUEST_TIMEOUT }));

const handleSuccess = () => {
  // flicker some green thingie
  console.log(chalk.green('All good boss'));
};

const handleError = error => {
  if (error.response) {
    // Something other than 200
    // probably ignore if not 500
    console.log(chalk.red(error.response.status));
  } else if (error.request) {
    // No response
    // raise the alarm
    console.log(`${chalk.underline(error.config.url)} is ${chalk.red('DOWN')}`);
  } else {
    // Something happened while performing the request, ignore it
  }
};

const checkForDowntime = () => {
  axios
    .all(promises)
    .then(() => handleSuccess())
    .catch(error => handleError(error))
    .then(() => {
      console.log('\n' + chalk.green('Last Checked: ') + new Date() + '\n\n');
      setTimeout(() => checkForDowntime(), UPTIME_INTERVAL);
    });
};

checkForDowntime();