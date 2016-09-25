define(["require", "exports", './BikeShareBuild', './GoogleMaps', './PastData'], function (require, exports, BS, gMaps, pastData) {
    "use strict";
    gMaps.forceImport;
    BS.InitBikeShare();
    window.setTimeout(gMaps.initMap(), 2000);
    google.charts.load('current', { 'packages': ['corechart'] });
    pastData.forceImport;
});
//# sourceMappingURL=BikeShareView.js.map