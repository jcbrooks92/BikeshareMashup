define(["require", "exports", './BikeShareBuild'], function (require, exports, BS) {
    "use strict";
    function initMap() {
        var myGeoLocationLabel = "M";
        var stationName = "Me";
        var map = new google.maps.Map(document.getElementById('map'));
        var mapOpt = {};
        mapOpt.center = new google.maps.LatLng(46.8772, -96.7898);
        mapOpt.zoom = 14;
        map.setOptions(mapOpt);
        var map = new google.maps.Map(document.getElementById('map'), mapOpt);
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var checkExist = setInterval(function () {
                    if (BS.bikeShares[0].stations) {
                        console.log("Exists!");
                        clearInterval(checkExist);
                    }
                }, 2000);
                BS.bikeShares[0].stations.forEach(function (station) {
                    var info = station.stationInformation;
                    mapMarker(info.name, { lat: info.lat, lng: info.lon }, map, info.name);
                });
                var myPosition = new google.maps.LatLng(pos.lat, pos.lng);
                map.setCenter(myPosition);
            }, function () {
                handleLocationError(true, google.maps.InfoWindow, map.getCenter());
            });
        }
        else {
            // Browser doesn't support Geolocation
            handleLocationError(false, google.maps.InfoWindow, map.getCenter());
        }
    }
    exports.initMap = initMap;
    /*function bikeStationMark(map) {                                   //add Bike markers
        for (var i = 0; Bikeshare[i].Station != null; i++) {
            mapMarker(BikeShare[i].Station.StationInformation.name,{ )
        }
    
    }*/
    function mapMarker(markerLabel, markerLocation, map, stationName) {
        var marker = new google.maps.Marker({
            position: markerLocation,
            map: map,
            title: stationName
        });
        marker.addListener('click', function () {
            document.getElementById("myDiv").innerHTML = "<p> Station: " + stationName + "</p>";
        });
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
});
//# sourceMappingURL=GoogleMaps.js.map