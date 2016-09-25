define(["require", "exports", './BikeShareBuild', './GoogleMaps'], function (require, exports, BS, gMaps) {
    "use strict";
    /// <reference path="jquery.d.ts" />
    gMaps.forceImport;
    BS.InitBikeShare();
    window.setTimeout(gMaps.initMap(), 2000);
    google.charts.load('current', { 'packages': ['corechart'] });
});
//# sourceMappingURL=BikeShareView.js.map