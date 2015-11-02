'use strict';

angular.module('risevision.app-launcher.controllers')

.controller("AlertsModalCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.open = function () {
      $modal.open({
        templateUrl: "partials/presentation-modal.html",
        size: "md"
      });
    };

    $scope.openDistribution = function () {
      $modal.open({
        templateUrl: "partials/distribution-modal.html",
        size: "md"
      });
    };
  }
]);