'use strict';
/**
 * @ngdoc function
 * @name wsnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wsnApp
 */
angular.module('wsnApp')
    .controller('ChartCtrl', ['$http', '$scope', '$timeout',
        function($http, $scope, $timeout) {
           
            var n = 25;
            $http.get('/sensorData/lastInserted/'+n).
            success(function(datas, status, headers, config) {
                var temperatureSeries = [];
                var humiditySeries = [];
                var iluminitySeries = [];
                var timingSeries = [];
                datas.forEach(function(element, index) {
                    temperatureSeries.push(element.temperature);
                    humiditySeries.push(element.humidity);
                    iluminitySeries.push(element.iluminity);
                    var date = new Date(element.date);
                    timingSeries.push(date.toUTCString());
                });
                $scope.lineLastTemperature = {
                    labels: timingSeries,
                    series: ['Temperature (Celsius)'],
                    data: [
                        temperatureSeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineLastHumidity = {
                    labels: timingSeries,
                    series: ['Humidity (%)'],
                    data: [
                        humiditySeries
                    ],
                    onClick: function(points, evt) {
                        console.log(points, evt);
                    }
                };
                $scope.lineLastIluminity = {
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


            //   $scope.bar = {
            //    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
            // series: ['Series A', 'Series B'],

            // data: [
            //    [65, 59, 80, 81, 56, 55, 40],
            //    [28, 48, 40, 19, 86, 27, 90]
            // ]

            //   };

            //   $scope.donut = {
            //   	labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            //   	data: [300, 500, 100]
            //   };

            //   $scope.radar = {
            //   	labels:["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],

            //   	data:[
            //   	    [65, 59, 90, 81, 56, 55, 40],
            //   	    [28, 48, 40, 19, 96, 27, 100]
            //   	]
            //   };

            //   $scope.pie = {
            //   	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
            //   	data : [300, 500, 100]
            //   };

            //   $scope.polar = {
            //   	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            //   	data : [300, 500, 100, 40, 120]
            //   };

            //   $scope.dynamic = {
            //   	labels : ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"],
            //   	data : [300, 500, 100, 40, 120],
            //   	type : 'PolarArea',

            //   	toggle : function () 
            //   	{
            //   		this.type = this.type === 'PolarArea' ?
            //   	    'Pie' : 'PolarArea';
            // }
            //   };
        }
    ]);