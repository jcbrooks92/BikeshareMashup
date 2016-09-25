define(["require", "exports", './BikeShareBuild', './GoogleMaps'], function (require, exports, BS, gMaps) {
    "use strict";
    /// <reference path="jquery.d.ts" />
    gMaps.forceImport;
    BS.InitBikeShare();
    window.setTimeout(gMaps.initMap(), 2000);
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('timeofday', 'Time of Day');
        data.addColumn('number', 'Emails Received');
        data.addRows([
            [[8, 30, 45], 5],
            [[9, 0, 0], 10],
            [[10, 0, 0, 0], 12],
            [[10, 45, 0, 0], 13],
            [[11, 0, 0, 0], 15],
            [[12, 15, 45, 0], 20],
            [[13, 0, 0, 0], 22],
            [[14, 30, 0, 0], 25],
            [[15, 12, 0, 0], 30],
            [[16, 45, 0], 32],
            [[16, 59, 0], 42]
        ]);
        var options = {
            title: 'Bike Availability by Time',
            titlePosition: 'none',
            height: 300,
            width: 425,
            bar: { groupWidth: "400%" },
            legend: { position: "none" },
            backgroundColor: '#292929',
            titleTextStyle: { color: '#f8f8f4' },
            hAxis: {
                textStyle: {
                    color: '#f8f8f4'
                },
                gridlines: { color: 'transparent' }
            },
            vAxis: {
                textStyle: {
                    color: '#f8f8f4'
                },
                gridlines: { color: 'transparent' }
            }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
});
//# sourceMappingURL=BikeShareView.js.map