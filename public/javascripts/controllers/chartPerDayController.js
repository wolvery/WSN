'use strict';
/**
 * @ngdoc function
 * @name wsnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wsnApp
 */
angular.module('wsnApp')
    .controller('ChartPerDayCtrl', ['$http', '$scope', '$timeout',
        function($http, $scope, $timeout) {
           console.log('message');
            $http.get('/sensorData/lastmaxperdays/').
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
                $scope.lineMaxTemperature = {
                    labels: timingSeries,
                    series: ['Temperature (Celsius)'],
                    data: [
                        temperatureSeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineMaxHumidity = {
                    labels: timingSeries,
                    series: ['Humidity (%)'],
                    data: [
                        humiditySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineMaxIluminity = {
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
            $http.get('/sensorData/lastminperdays/').
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
                $scope.lineMinTemperature = {
                    labels: timingSeries,
                    series: ['Temperature (Celsius)'],
                    data: [
                        temperatureSeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineMinHumidity = {
                    labels: timingSeries,
                    series: ['Humidity (%)'],
                    data: [
                        humiditySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineMinIluminity = {
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