import BS = require('./BikeShareBuild');
import gMaps = require('./GoogleMaps');

gMaps.forceImport;
BS.InitBikeShare();

window.setTimeout(gMaps.initMap(), 2000);


