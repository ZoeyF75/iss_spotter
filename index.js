const nextISSTimesForMyLocation = require('./iss');

const passResults = (passTimes) => {
  for (const p of passTimes) {
    const duration = p.duration;
    const datetime = new Date(0);
    datetime.setUTCSeconds(p.risetime);
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error,passTimes) => {
  return error ? console.log("It didn't work!", error) : passResults(passTimes);
});

// const funcs = require('./iss');
// const fetchMyIP = funcs.fetchMyIP;
// const fetchCoordsByIP = funcs.fetchCoordsByIP;
// const fetchISSflyoverTimes = funcs.fetchISSFlyOverTimes;


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });


//  => {
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