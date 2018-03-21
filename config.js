const config = {};

config.URLS = [
  { url: "https://dimitrioslytras.com", isUp: true, lastReachable: null },
  { url: "https://google.com", isUp: true, lastReachable: null },
  { url: "https://cssmaid.netlify.com/", isUp: true, lastReachable: null },
  { url: "http://www.000webhost.com", isUp: true, lastReachable: null },
  { url: "http://www.sss.gov.ph", isUp: true, lastReachable: null },
  { url: "http://www.mango.com", isUp: true, lastReachable: null },
  { url: "http://www.leo.org", isUp: true, lastReachable: null },
  { url: "https://www.github.com", isUp: true, lastReachable: null },
  { url: "https://www.gitlab.com", isUp: true, lastReachable: null }

];

config.REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT || 5000;
config.UPTIME_INTERVAL = process.env.UPTIME_INTERVAL || 200000;
config.CRITICAL_LEVEL = process.env.CRITICAL_LEVEL || 90;

module.exports = config;