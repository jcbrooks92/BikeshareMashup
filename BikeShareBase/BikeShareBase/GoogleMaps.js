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
                    mapMarker(info.name, { lat: info.lat, lng: info.lon }, map, info.name, station);
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
    function mapMarker(markerLabel, markerLocation, map, stationName, station) {
        var avail = station.stationStatus.num_bikes_available;
        var docks = station.stationStatus.num_docks_available;
        var total = avail + docks;
        if (station.stationStatus.is_renting != 1) {
            var image = './images/bike-icon-grey.png';
        }
        else if (avail < 3) {
            var image = './images/bike-icon-red.png';
        }
        else if (avail <= 5) {
            var image = './images/bike-icon-yellow.png';
        }
        else {
            var image = './images/bike-icon-green.png';
        }
        var marker = new google.maps.Marker({
            position: markerLocation,
            map: map,
            title: stationName,
            icon: image
        });
        marker.addListener('dblclick', function () {
            var m = map;
            var pos = markerLocation;
            m.setCenter(new google.maps.LatLng(Number(pos.lat), Number(pos.lng)));
            m.setZoom(m.getZoom() + 1);
        });
        marker.addListener('click', function () {
            var m = map;
            var pos = markerLocation;
            var dataContainer = document.getElementById("data");
            dataContainer.innerHTML = "";
            var header = document.createElement("h3");
            header.setAttribute("class", "col-md-offset-1");
            header.innerText = stationName;
            dataContainer.appendChild(header);
            var subHeading = document.createElement("div");
            subHeading.setAttribute("class", "col-md-offset-1");
            dataContainer.appendChild(subHeading);
            var subHeadingText = document.createElement("h4");
            subHeadingText.innerText = station.stationInformation.address;
            subHeading.appendChild(subHeadingText);
            var columnLeft = document.createElement("span");
            columnLeft.setAttribute("class", "col-md-6 col-md-offset-1 h3 ");
            columnLeft.innerText = "Bikes: ";
            dataContainer.appendChild(columnLeft);
            var col;
            if (avail < 3) {
                col = "rgb(187, 0, 0)";
            }
            else if (avail <= 5) {
                col = "rgb(216, 226, 91)";
            }
            else {
                col = "green";
            }
            var columnLeftText = document.createElement("span");
            columnLeftText.setAttribute("class", "badge h2");
            columnLeftText.style.backgroundColor = col;
            columnLeftText.innerText = station.stationStatus.num_bikes_available;
            columnLeft.appendChild(columnLeftText);
            var columnRight = document.createElement("span");
            columnRight.setAttribute("class", "col-md-5 h3");
            columnRight.innerText = "Docks: ";
            dataContainer.appendChild(columnRight);
            var col;
            if (docks < 3) {
                col = "rgb(187, 0, 0)";
            }
            else if (docks <= 5) {
                col = "rgb(216, 226, 91)";
            }
            else {
                col = "green";
            }
            var columnRightText = document.createElement("span");
            columnRightText.setAttribute("class", "badge h2");
            columnRightText.style.backgroundColor = col;
            columnRightText.innerText = station.stationStatus.num_docks_available;
            columnRight.appendChild(columnRightText);
            var renting = document.createElement("span");
            renting.setAttribute("class", "col-md-6 col-md-offset-1 h3 ");
            renting.innerText = station.stationStatus.is_renting == 1 && avail >= 1 ? "Rentals available" : "Rentals unavailable";
            dataContainer.appendChild(renting);
            var docking = document.createElement("span");
            docking.setAttribute("class", "col-md-6 col-md-offset-1 h3 ");
            docking.innerText = station.stationStatus.is_returning == 1 && docks >= 1 ? "Docks available" : "Docks unavailable";
            dataContainer.appendChild(docking);
            drawChart(dataContainer, station);
        });
    }
    function drawChart(parent, station) {
        var data = new google.visualization.DataTable();
        data.addColumn('timeofday', 'Time of Day');
        data.addColumn('number', 'Bikes Rented');
        //[[8, 30, 45], 5],
        var rentals = new Array();
        var d = new Date();
        // 30 min increments
        for (var i = 0; i < 24; i++) {
            rentals[i] = new Array();
            rentals[i].push(0);
        }
        station.history.forEach(function (e) {
            var eDate = new Date(e.CheckoutDate + " " + e.CheckoutTime);
            if (eDate.getDay() == d.getDay()) {
                //&& eDate.getMonth() == d.getMonth()) {
                var hour = eDate.getHours();
                if (hour)
                    rentals[hour][0] += 1;
            }
        });
        for (var i = 0; i < rentals.length; i++) {
            console.log(rentals[i][0]);
            var d = new Date(rentals[i]);
            data.addRow([[i, 0, 0], rentals[i][0]]);
        }
        console.log(rentals.length);
        var options = {
            title: 'Bike Availability by Time',
            titlePosition: 'none',
            height: 300,
            width: 425,
            legend: { position: "none" },
            backgroundColor: '#292929',
            titleTextStyle: { color: '#f8f8f4' },
            hAxis: {
                textStyle: {
                    color: '#f8f8f4'
                },
                gridlines: { color: 'transparent' },
                format: 'h:mm a',
                viewWindow: {
                    min: [7, 30, 0],
                    max: [17, 30, 0]
                }
            },
            vAxis: {
                textStyle: {
                    color: 'transparent'
                },
                gridlines: { color: 'transparent' }
            },
        };
        var chartDiv = document.createElement("chart_div");
        chartDiv.setAttribute('class', 'col-md-12');
        var chart = new google.visualization.ColumnChart(chartDiv);
        parent.appendChild(chartDiv);
        chart.draw(data, options);
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
});
//# sourceMappingURL=GoogleMaps.js.map