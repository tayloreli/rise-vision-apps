'use strict';

angular.module('risevision.app-launcher.directives')
  .directive('vertilize', [
    function () {
      return {
        restrict: 'EA',
        require: '^vertilizeContainer',
        link: function (scope, element, attrs, parent) {
          // My index allocation
          var myIndex = parent.allocateMe();

          // Get my real height by cloning so my height is not affected.
          var getMyRealHeight = function () {
            var clone = element.clone()
              .removeAttr('vertilize')
              .css({
                height: '',
                width: element.width(),
                position: 'fixed',
                top: 0,
                left: 0,
                visibility: 'hidden'
              });
            element.after(clone);
            var realHeight = clone.height();
            clone.remove();
            return realHeight;
          };

          // Watch my height
          scope.$watch(getMyRealHeight, function (myNewHeight) {
            if (myNewHeight) {
              parent.updateMyHeight(myIndex, myNewHeight);
            }
          });

          // Watch for tallest height change
          scope.$watch(parent.getTallestHeight, function (tallestHeight) {
            if (tallestHeight) {
              element.css('height', tallestHeight);
            }
          });
        }
      };
    }
  ]);
