define(["require", "exports", './BikeShareBuild'], function (require, exports, BS) {
    "use strict";
    exports.archiveData = new Array();
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == 200) {
                callback(rawFile.responseText);
            }
        };
        rawFile.send(null);
    }
    //usage:
    readTextFile("./Data/season-data-2016.json", function (text) {
        var data = JSON.parse(text);
        data.forEach(function (e) {
            var bikeShareEntry = new BikeShareHistory(e.CheckoutDate, e.CheckoutStation, e.CheckoutTime, e.ReturnDate, e.ReturnStation, e.ReturnTime);
            exports.archiveData.push(bikeShareEntry);
        });
        // # RiderType
        // CheckoutDate
        // CheckoutStation
        // CheckoutTime
        // ReturnDate
        // ReturnStation
        // ReturnTime
        PairData();
    });
    class BikeShareHistory {
        constructor(CheckoutDate, CheckoutStation, CheckoutTime, ReturnDate, ReturnStation, ReturnTime) {
            this.CheckoutDate = CheckoutDate;
            this.CheckoutStation = CheckoutStation;
            this.CheckoutTime = CheckoutTime;
            this.ReturnDate = ReturnDate;
            this.ReturnStation = ReturnStation;
            this.ReturnTime = ReturnTime;
            CheckoutTime = CheckoutTime.split(":");
            ReturnTime = ReturnTime.split(":");
        }
    }
    exports.BikeShareHistory = BikeShareHistory;
    function PairData() {
        exports.archiveData.forEach(function (e) {
            BS.bikeShares[0].stations.forEach(function (station) {
                if (e.CheckoutStation == station.stationInformation.name) {
                    station.history.push(new BS.BikeShareHistory(e.CheckoutDate, e.CheckoutStation, e.CheckoutTime, e.ReturnDate, e.ReturnStation, e.ReturnTime));
                }
            });
        });
        console.log("Yay " + BS.bikeShares[0].stations[0].history[0].CheckoutDate);
    }
});
//# sourceMappingURL=PastData.js.map