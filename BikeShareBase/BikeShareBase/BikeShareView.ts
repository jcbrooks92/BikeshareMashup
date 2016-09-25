import BS = require('./BikeShareBuild');
import gMaps = require('./GoogleMaps');

gMaps.forceImport;
BS.InitBikeShare();

/*var e = document.getElementById('myButton')
e.onclick = function () {
    DisplayStation();
};

function DisplayStation() {
    document.getElementById("myDiv").innerHTML = "<p>" + BS2.bikeShares[0].name + "</p><p> Station: " + BS2.bikeShares[0].stations[0].stationInformation.name + "</p>";
}
*/

