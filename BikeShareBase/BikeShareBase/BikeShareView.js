define(["require", "exports", './BikeShareBuild', './GoogleMaps'], function (require, exports, BS, gMaps) {
    "use strict";
    gMaps.forceImport;
    BS.InitBikeShare();
});
/*var e = document.getElementById('myButton')
e.onclick = function () {
    DisplayStation();
};

function DisplayStation() {
    document.getElementById("myDiv").innerHTML = "<p>" + BS2.bikeShares[0].name + "</p><p> Station: " + BS2.bikeShares[0].stations[0].stationInformation.name + "</p>";
}
*/
//# sourceMappingURL=BikeShareView.js.map