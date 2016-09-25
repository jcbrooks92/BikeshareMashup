define(["require", "exports", './BikeShareBuild', './GoogleMaps'], function (require, exports, BS, gMaps) {
    "use strict";
    gMaps.forceImport;
    BS.InitBikeShare();
    window.setTimeout(gMaps.initMap(), 2000);
});
//# sourceMappingURL=BikeShareView.js.map