"use strict";
var feeds;
this.feeds = [];
var Feed = (function () {
    function Feed(url, name) {
        this.url = url;
        this.name = name;
    }
    Feed.prototype.buildClasses = function (feedType) {
        switch (feedType) {
            case "system_information":
                break;
            case "station_information":
                break;
            case "station_status":
                break;
            case "system_pricing_plans":
                break;
        }
    };
    return Feed;
}());
var BikeShare;
(function (BikeShare_1) {
    var BikeShare = (function () {
        function BikeShare(system_id, name, langauge, url, phone_number, email, timezone) {
            this.system_id = system_id;
            this.name = name;
            this.langauge = langauge;
            this.url = url;
            this.phone_number = phone_number;
            this.email = email;
            this.timezone = timezone;
        }
        return BikeShare;
    }());
    BikeShare_1.BikeShare = BikeShare;
    var PricingPlans = (function () {
        function PricingPlans(price, is_taxable, url, description, currency, name, plan_id) {
            this.price = price;
            this.is_taxable = is_taxable;
            this.url = url;
            this.description = description;
            this.currency = currency;
            this.name = name;
            this.plan_id = plan_id;
        }
        return PricingPlans;
    }());
    BikeShare_1.PricingPlans = PricingPlans;
    var Stations;
    (function (Stations) {
        var StationInformation = (function () {
            function StationInformation(lon, lat, address, name, station_id) {
                this.lon = lon;
                this.lat = lat;
                this.address = address;
                this.name = name;
                this.station_id = station_id;
            }
            return StationInformation;
        }());
        Stations.StationInformation = StationInformation;
        var StationStatus = (function () {
            function StationStatus(station_id, num_bikes_available) {
                this.station_id = station_id;
                this.num_bikes_available = num_bikes_available;
            }
            return StationStatus;
        }());
        Stations.StationStatus = StationStatus;
    })(Stations = BikeShare_1.Stations || (BikeShare_1.Stations = {}));
})(BikeShare = exports.BikeShare || (exports.BikeShare = {}));
function myFunction() {
    //var el = document.getElementById("test");
    //el.innerHTML = "test text"
    var xmlhttp = new XMLHttpRequest();
    var url = "https://gbfs.bcycle.com/bcycle_greatrides/gbfs.json";
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results);
            results.data.en.feeds.forEach(function (feed) {
                feeds.push(new Feed(feed.url, feed.name));
            });
            feeds.forEach(function (feed) {
                console.log(feed.name + ", " + feed.url);
            });
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
;
//# sourceMappingURL=BikeShare.js.map