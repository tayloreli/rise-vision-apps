'use strict';

angular.module('risevision.apps.directives')
  .directive('unsavedChanges', ['placeholderFactory',
    function (placeholderFactory) {
      return {
        scope: {
          isDirty: '='
        },
        restrict: 'A',
        link: function ($scope) {
          
        } //link()
      };
    }
  ]);
