'use strict';

angular.module('risevision.apps.launcher.controllers')

.controller("modalCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.open = function () {
      $modal.open({
        templateUrl: "partials/launcher/template-modal.html",
        size: "lg"
      });
    };

    $scope.openShared = function () {
      $modal.open({
        templateUrl: "partials/launcher/shared-modal.html",
        size: "md"
      });
    };

  }
]);
