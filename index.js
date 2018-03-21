// get something that is down from here http://www.isitdownrightnow.com/

const axios = require("axios");
const chalk = require("chalk");
const logSymbols = require("log-symbols")

// Make them ENV variables

const URLS = [
  { url: "https://dimitrioslytras.com", isUp: true },
  { url: "https://google.com", isUp: true },
  { url: "https://cssmaid.netlify.com/", isUp: true },
  { url: "http://www.000webhost.com", isUp: true},
  { url: "http://www.sss.gov.ph", isUp: true },
  { url: "http://www.mango.com", isUp: true },
  { url: "http://www.leo.org", isUp: true }
];

const REQUEST_TIMEOUT = 5000;
// const UPTIME_INTERVAL = 300000; // 5 minutes
const UPTIME_INTERVAL = 100000; // 5 minutes

// const promises = URLS.map(url => axios.get(url, { timeout: REQUEST_TIMEOUT }));

const checkForDowntime = () => {
  console.log('\n' + chalk.green('Checking status: ') + new Date() + '\n');
  URLS.forEach(async entry => {
    try {
      const response = await axios.get(entry.url, { timeout: REQUEST_TIMEOUT });
      console.log(` - ${response.config.url} ${logSymbols.success}`);
      entry.isUp = true;
    } catch (e) {
      entry.isUp = false;
      console.log(` - ${e.config.url} ${logSymbols.error}`);
    }
  });

  // const reachable = URLS.filter(entry => entry.isUp).length
  // console.log(reachable + '/' + URLS.length + ' are up')
  setTimeout(() => checkForDowntime(), UPTIME_INTERVAL);
}

checkForDowntime();