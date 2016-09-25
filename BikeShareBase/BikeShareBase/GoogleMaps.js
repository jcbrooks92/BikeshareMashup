define(["require", "exports"], function (require, exports) {
    "use strict";
    // Must call initMap to start google maps
    initMap();
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
                mapMarker(myGeoLocationLabel, pos, map, stationName);
                mapMarker("sexy", { lat: 46.8772, lng: -96.7898 }, map, "BS");
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
            var stationName = alert(marker.getTitle());
            /* for (var i=0; Bikeshare[i].Station != null; i++) {
                 if (BikeShare[i].Station.StationInformation.name == stationName) {              //code to print information in left hand column
                     
                 }
                 
             }*/
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