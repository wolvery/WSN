'use strict';
/**
 * @ngdoc function
 * @name wsnApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wsnApp
 */
angular.module('wsnApp')
  .controller('MainCtrl', function($scope,$http) {
     console.log($scope);
  	$http.get('/sensorData/lastInserted').
    success(function(data, status, headers, config) {

      $scope.lastInserted = data; 
      if ($scope.lastInserted.light){
      	$scope.luz = "acesa";
      } else{
      	$scope.luz = "desligada"
      }
      if ($scope.lastInserted.motion){
      	$scope.presenca = "Movimento detectado";
      } else{
      	$scope.presenca = "Sem movimento"
      }

      console.log(data);
    });
  });
