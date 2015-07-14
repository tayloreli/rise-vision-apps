'use strict';

angular.module('risevision.app-launcher.controllers')
  .controller('AppCtrl', ['$scope', '$location',
    function ($scope, $rootScope, $location) {
      $scope.navOptions = [{}];
    }
  ]); //ctr
