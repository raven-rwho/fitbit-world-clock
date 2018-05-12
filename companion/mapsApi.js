export function MapsApi(apiKey) {
  if (apiKey !== undefined) {
    this.apiKey = apiKey;
  }
  else {
    // Default key for open public access.
    this.apiKey = "MW9S-E7SL-26DU-VV8V";
  }
};

// https://maps.googleapis.com/maps/api/timezone/json?location=39.6034810,-119.6822510&timestamp=1331161200&key=YOUR_API_KEY

MapsApi.prototype.getTimeZone = function(lat, lng) {
  let self = this;
  return new Promise(function(resolve, reject) {
    let url = "https://maps.googleapis.com/maps/api/timezone/json?";
    url += "location=" + lat + "," + lng
    url += "&key=" + self.apiKey;
    fetch(url).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log("Got JSON response from server:" + JSON.stringify(json));

      /*
      let data = json["root"]["station"][0];
      let departures = [];

      data["etd"].forEach( (destination) => {
        destination["estimate"].forEach( (train) => {
          let d = {
            "to": destination["abbreviation"],
            "minutes": Number.parseInt(train["minutes"]),
            "platform": train["platform"],
            "bike": (train["bikeflag"] === "1" ? true : false)
          };
          if (!Number.isInteger(d["minutes"])) {
            d["minutes"] = 0;
          }
          departures.push(d);
        });
      });

      // Sort departures
      departures.sort( (a,b) => { return (a["minutes"] - b["minutes"]) } );

      resolve(departures);
      */
    }).catch(function (error) {
      reject(error);
    });
  });
}