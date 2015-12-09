'use strict';

angular.module('risevision.apps.launcher.controllers')
  .controller('HomeCtrl', ['$scope', 'launcherTracker',
    function ($scope, launcherTracker) {
      $scope.launcherTracker = launcherTracker;
    }
  ]); //ctr
