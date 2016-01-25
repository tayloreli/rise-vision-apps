'use strict';

angular.module('risevision.editor.controllers')

.controller("SharedCtrl", [
  "$scope", "$modal",
  function ($scope, $modal) {

    $scope.open = function () {
      $modal.open({
        templateUrl: "partials/editor/shared-modal.html",
        size: "md",
        controller: 'SharedCtrl'
      });
    };
  }
]);