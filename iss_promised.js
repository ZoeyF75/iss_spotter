const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json');

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body)['ip'];
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchFlyoverTimes = (geo) => {
  const coordinates = {latitude: JSON.parse(geo).latitude, longitude: JSON.parse(geo).longitude};
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchFlyoverTimes)
    .then((data) => JSON.parse(data));
};

module.exports = nextISSTimesForMyLocation;
