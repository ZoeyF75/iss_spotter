const funcs = require('./iss');
const fetchMyIP = funcs.fetchMyIP;
const fetchCoordsByIP = funcs.fetchCoordsByIP;
const fetchISSflyoverTimes = funcs.fetchISSFlyOverTimes;

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('154.5.122.129', (error, latitude, longitude) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:' , `latitude: ${latitude}`, `longitude: ${longitude}`);
// });

// fetchISSflyoverTimes({latitude: 49.2773, longitude : -123.0679}, (error, passesObject) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned times:', passesObject);
// });


