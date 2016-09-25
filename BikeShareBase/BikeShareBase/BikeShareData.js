"use strict";
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
exports.BikeShare = BikeShare;
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
exports.PricingPlans = PricingPlans;
var Station = (function () {
    function Station() {
    }
    return Station;
}());
exports.Station = Station;
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
exports.StationInformation = StationInformation;
var StationStatus = (function () {
    function StationStatus(station_id, num_bikes_available) {
        this.station_id = station_id;
        this.num_bikes_available = num_bikes_available;
    }
    return StationStatus;
}());
exports.StationStatus = StationStatus;
//# sourceMappingURL=BikeShareData.js.map