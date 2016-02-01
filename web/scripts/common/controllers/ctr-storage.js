'use strict';

angular.module('risevision.apps.controllers')

.controller("UxCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.open = function () {
      $modal.open({
        templateUrl: "partials/storage-modal.html",
        size: "lg"
      });
    };
  }
]);
