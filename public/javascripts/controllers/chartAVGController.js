'use strict';
/**
 * @ngdoc function
 * @name wsnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wsnApp
 */
angular.module('wsnApp')
    .controller('ChartPerAVGCtrl', ['$http', '$scope', '$timeout',
        function($http, $scope, $timeout) {
            
            $http.get('/sensorData/lastavgperhours/').
            success(function(datas, status, headers, config) {
                var temperatureSeries = [];
                var humiditySeries = [];
                var iluminitySeries = [];
                var timingSeries = [];
                datas.forEach(function(element, index) {
                    temperatureSeries.push(element.temperatures);
                    humiditySeries.push(element.humidity);
                    iluminitySeries.push(element.iluminity);
                    timingSeries.push(element._id.hour+":00 de "+element._id.day+"/"+element._id.month);
                });
                $scope.lineAvgHourTemperature = {
                    labels: timingSeries,
                    series: ['Temperature (Celsius)'],
                    data: [
                        temperatureSeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineAvgHourHumidity = {
                    labels: timingSeries,
                    series: ['Humidity (%)'],
                    data: [
                        humiditySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineAvgHourIluminity = {
                    labels: timingSeries,
                    series: ['Iluminity (LUX)'],
                    data: [
                        iluminitySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
            });

            $http.get('/sensorData/lastavgperdays/').
            success(function(datas, status, headers, config) {
                var temperatureSeries = [];
                var humiditySeries = [];
                var iluminitySeries = [];
                var timingSeries = [];
                datas.forEach(function(element, index) {
                    temperatureSeries.push(element.temperatures);
                    humiditySeries.push(element.humidity);
                    iluminitySeries.push(element.iluminity);
                    timingSeries.push(element._id.day+"/"+element._id.month);
                });
                $scope.lineAvgDayTemperature = {
                    labels: timingSeries,
                    series: ['Temperature (Celsius)'],
                    data: [
                        temperatureSeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineAvgDayHumidity = {
                    labels: timingSeries,
                    series: ['Humidity (%)'],
                    data: [
                        humiditySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineAvgDayIluminity = {
                    labels: timingSeries,
                    series: ['Iluminity (LUX)'],
                    data: [
                        iluminitySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
            });

        }
    ]);