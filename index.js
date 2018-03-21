const axios = require('axios');
const chalk = require('chalk');
const symbols = require('log-symbols');
const matrix = require('node-sense-hat').Leds;
const config = require('./config');

const red = [255, 0, 0];
const green = [0, 100, 0];
const white = [0, 0, 0];

const urls = [...config.URLS];
let timeout;

// Helpers ------------------------------------------
const generateStats = urls => {
  const reachable = urls.filter(entry => entry.isUp).length;
  const displaySymbol =
    reachable === urls.length ? symbols.success : symbols.warning;

  console.log(`\n ${displaySymbol} ${reachable}/${urls.length} are UP`);
};

const paintMatrix = urls => {
  const array = new Array(64).fill(white);
  urls.forEach((entry, index) => {
    array[index] = entry.isUp ? green : red;
  });
  matrix.setPixels(array);
};
// End Helpers ----------------------------------------

// Main -----------------------------------------------
const checkForDowntime = async () => {
  console.log('\n' + chalk.green('Checking status: ') + new Date() + '\n');

  for (let entry of urls) {
    try {
      // Check if reachable
      const response = await axios.get(entry.url, {
        timeout: config.REQUEST_TIMEOUT,
      });
      console.log(` ${symbols.success} ${response.config.url}`);
      entry = { ...entry, isUp: true, lastReachable: new Date() };
    } catch (e) {
      // Nope, no response
      entry.isUp = false;
      console.log(
        ` ${symbols.error} ${e.config.url} - Last time up: ${chalk.underline(
          entry.lastReachable || 'N/A'
        )}`
      );
    }
  }

  generateStats(urls);
  paintMatrix(urls);
  timeout = setTimeout(() => checkForDowntime(), config.UPTIME_INTERVAL);
};
// End Main ------------------------------------------

// Bootstrap
checkForDowntime();
