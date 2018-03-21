// get something that is down from here http://www.isitdownrightnow.com/
const axios = require("axios");
const chalk = require("chalk");
const symbols = require("log-symbols");
const config = require('./config');

const urls = [...config.URLS];

const checkIfCritical = (reachable, total) => {
  const displaySymbol = reachable === total ? symbols.success : symbols.warning;

  console.log(`\n ${displaySymbol} ${reachable}/${total} are UP`);

  if (Math.floor(reachable / total * 100) < config.CRITICAL_LEVEL) {
    // console.log('welp, prob should do something')
  }
};

const checkForDowntime = async () => {
  console.log("\n" + chalk.green("Checking status: ") + new Date() + "\n");

  for (let entry of urls) {

    try {
      // Check if reachable
      const response = await axios.get(entry.url, { timeout: config.REQUEST_TIMEOUT });
      console.log(` ${symbols.success} ${response.config.url}`);
      entry = { ...entry, isUp: true, lastReachable: new Date() };
    }
    catch (e) {
      // Nope, no response
      entry.isUp = false;
      console.log(
        ` ${symbols.error} ${e.config.url} - Last time up: ${chalk.underline(
          entry.lastReachable || "N/A"
        )}`
      );
    }
  }

  const reachable = urls.filter(entry => entry.isUp).length;

  checkIfCritical(reachable, urls.length);
  setTimeout(() => checkForDowntime(), config.UPTIME_INTERVAL);
};

checkForDowntime();
