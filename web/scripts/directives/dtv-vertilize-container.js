'use strict';

angular.module('risevision.app-launcher.directives')
  .directive('vertilizeContainer', [
    function () {
      return {
        restrict: 'EA',
        controller: [
          '$scope', '$window',
          function ($scope, $window) {
            // Alias this
            var _this = this;

            // Array of children heights
            _this.childrenHeights = [];

            // API: Allocate child, return index for tracking.
            _this.allocateMe = function () {
              _this.childrenHeights.push(0);
              return (_this.childrenHeights.length - 1);
            };

            // API: Update a child's height
            _this.updateMyHeight = function (index, height) {
              _this.childrenHeights[index] = height;
            };

            // API: Get tallest height
            _this.getTallestHeight = function () {
              var height = 0;
              for (var i = 0; i < _this.childrenHeights.length; i = i + 1) {
                height = Math.max(height, _this.childrenHeights[i]);
              }
              return height;
            };

            // Add window resize to digest cycle
            angular.element($window).bind('resize', function () {
              return $scope.$apply();
            });
          }
        ]
      };
    }
  ]);
