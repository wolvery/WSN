'use strict';
/**
 * @ngdoc function
 * @name wsnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wsnApp
 */
angular.module('wsnApp')
    .controller('RelayCtrl', function($scope, $http) {
        
        $http.get('/relayData/lastInserted').
        success(function(data, status, headers, config) {

            $scope.lastInserted = data;
            console.log('in1',$scope.lastInserted.In1);
            if ($scope.lastInserted.In1 === 1) {
                $scope.In1 = "on";
            } else {
                $scope.In1 = "off";
            }
            if ($scope.lastInserted.In2 === 1) {
                $scope.In2 = "on";
            } else {
                $scope.In2 = "off";
            }

        });
        $scope.update = function(n) {
            $http.get('/actuator/relay' + n).
            success(function(data, status, headers, config) {
                if (n === 1) {
                    if ($scope.In1 === "on") {
                        $scope.In1 = "off";
                    } else {
                        $scope.In1 = "on";
                    }
                } else {
                    if ($scope.In2 === "on") {
                        $scope.In2 = "off";
                    } else {
                        $scope.In2 = "on";
                    }
                }
            });
        }
    });