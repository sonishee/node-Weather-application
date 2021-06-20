const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic29uaXNoZWUiLCJhIjoiY2twdmQyM2FzMDJwMTJvdGNrZ3J1ZTVibSJ9.6pJgk6uATI9j91o2mOjaPg&limit=1`;

  request({ url, json: true, rejectUnauthorized: true }, (error, { body }) => {
    console.log(body.features);
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
