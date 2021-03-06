const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    error ? callback(error, null) : callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates by IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    error ? callback(error, null) : callback(null, {latitude: JSON.parse(body).latitude, longitude: JSON.parse(body).longitude});
  });
};

const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyovertimes with coordindates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    error ? callback(error, null) : callback(null, JSON.parse(body).response);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    return error ? callback(error, null) : fetchCoordsByIP(ip, (error, coordinates) => {
      return error ? callback(error,null) : fetchISSFlyOverTimes(coordinates, (error, passesObject) => {
        return error ? callback(error,null) : callback(null, passesObject);
      });
    });
  });
  
};

module.exports = nextISSTimesForMyLocation;