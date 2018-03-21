// get something that is down from here http://www.isitdownrightnow.com/
const axios = require("axios");
const chalk = require("chalk");
const symbols = require("log-symbols");

// Make them ENV variables
const URLS = [
  { url: "https://dimitrioslytras.com", isUp: true, lastReachable: null },
  { url: "https://google.com", isUp: true, lastReachable: null },
  { url: "https://cssmaid.netlify.com/", isUp: true, lastReachable: null },
  { url: "http://www.000webhost.com", isUp: true, lastReachable: null },
  { url: "http://www.sss.gov.ph", isUp: true, lastReachable: null },
  { url: "http://www.mango.com", isUp: true, lastReachable: null },
  { url: "http://www.leo.org", isUp: true, lastReachable: null }
];

const REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT || 5000;
const UPTIME_INTERVAL = process.env.UPTIME_INTERVAL || 200000;

const checkForDowntime = async () => {
  console.log("\n" + chalk.green("Checking status: ") + new Date() + "\n");

  for (let entry of URLS) {
    try {
      // Check if reachable
      const response = await axios.get(entry.url, { timeout: REQUEST_TIMEOUT });
      console.log(` ${symbols.success} ${response.config.url}`);
      entry = { ...entry, isUp: true, lastReachable: new Date() };
    } catch (e) {
      // Nope, no response
      entry.isUp = false;
      console.log(
        ` ${symbols.error} ${e.config.url} - Last time up: ${chalk.underline(
          entry.lastReachable || "N/A"
        )}`
      );
    }
  }

  const reachable = URLS.filter(entry => entry.isUp).length;
  console.log(`\n ${symbols.info} ${reachable}/${URLS.length} are UP`);
  setTimeout(() => checkForDowntime(), UPTIME_INTERVAL);
};

checkForDowntime();
