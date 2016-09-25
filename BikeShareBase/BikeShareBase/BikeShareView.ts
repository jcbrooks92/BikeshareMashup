import BS = require('./BikeShareBuild');
import gMaps = require('./GoogleMaps');
/// <reference path="jquery.d.ts" />

gMaps.forceImport;
BS.InitBikeShare();

window.setTimeout(gMaps.initMap(), 2000);

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

