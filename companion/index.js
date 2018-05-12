import { geolocation } from "geolocation";
import * as messaging from "messaging";

function locationSuccess(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(`Latitude: ${lat}\nLongitude: ${lon}`);
}

function locationError(error) {
  console.log(`Error: ${error.code}\nMessage: ${error.message}`);
}

let watcherID = geolocation.watchPosition(locationSuccess, locationError);

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  sendBartSchedule();
}

// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log(JSON.stringify(evt.data));
}
