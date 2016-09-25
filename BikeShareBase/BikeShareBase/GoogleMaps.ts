import BS = require('./BikeShareBuild');
// Must call initMap to start google maps

export var forceImport;

export function initMap() {                             //create map object
    var myGeoLocationLabel = "M";
    var stationName = "Me";
    var map: google.maps.Map = new google.maps.Map(document.getElementById('map'));
    var mapOpt: google.maps.MapOptions = {};
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
                var info: BS.StationInformation = station.stationInformation;
                mapMarker(info.name, { lat: info.lat, lng: info.lon }, map, info.name, station);
            })

            var myPosition = new google.maps.LatLng(pos.lat, pos.lng);
            map.setCenter(myPosition);
        }, function () {
            handleLocationError(true, google.maps.InfoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, google.maps.InfoWindow, map.getCenter());
    }


}

/*function bikeStationMark(map) {                                   //add Bike markers
    for (var i = 0; Bikeshare[i].Station != null; i++) {
        mapMarker(BikeShare[i].Station.StationInformation.name,{ )
    }

}*/

function mapMarker(markerLabel, markerLocation, map, stationName, station: BS.Station) {
    var marker = new google.maps.Marker({
        position: markerLocation,
        map: map,
        title: stationName
    });

    marker.addListener('click', function () {  //listen on the button click to make the call to the station name
        var m: google.maps.Map = map;
        var pos: google.maps.LatLng = markerLocation;
        m.setCenter(new google.maps.LatLng(Number(pos.lat), Number(pos.lng)));
        m.setZoom(16);

        var dataContainer: HTMLElement = document.getElementById("data");
        dataContainer.innerHTML = "";

        var header: HTMLElement = document.createElement("h3");
        header.innerText = stationName;
        dataContainer.appendChild(header);

        var subHeading: HTMLElement = document.createElement("div");
        subHeading.setAttribute("class", "col-md-12");
        dataContainer.appendChild(subHeading);

        var subHeadingText: HTMLElement = document.createElement("h4");
        subHeadingText.innerText = station.stationInformation.address;
        subHeading.appendChild(subHeadingText);

        var row: HTMLElement = document.createElement("div");
        row.setAttribute("class", "row-fluid");
        subHeading.appendChild(row);

        var columnLeft: HTMLElement = document.createElement("div");
        columnLeft.setAttribute("class", "col-md-6");
        columnLeft.innerText = station.stationStatus.num_bikes_available;
        row.appendChild(columnLeft);

        var columnRight: HTMLElement = document.createElement("div");
        columnRight.setAttribute("class", "col-md-6");
        columnRight.innerText = station.stationStatus.num_docks_available;
        row.appendChild(columnRight);
    })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}
