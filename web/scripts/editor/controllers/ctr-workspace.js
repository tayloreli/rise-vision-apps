'use strict';

angular.module('risevision.editor.controllers')
  .controller('WorkspaceController', ['$scope', 'editorFactory',
    'placeholderFactory', 'userState', '$modal', '$templateCache',
    '$location', '$stateParams', '$window', 'RVA_URL', 'presentationTracker',
    function ($scope, editorFactory, placeholderFactory, userState, $modal,
      $templateCache, $location, $stateParams, $window, RVA_URL,
      presentationTracker) {
      $scope.factory = editorFactory;
      $scope.presentationTracker = presentationTracker;
      $scope.placeholderFactory = placeholderFactory;
      $scope.isSubcompanySelected = userState.isSubcompanySelected;
      $scope.isTestCompanySelected = userState.isTestCompanySelected;

      $scope.$watch('factory.hasLegacyItems', function (newValue) {
        if (newValue) {
          $scope.modalInstance = $modal.open({
            template: $templateCache.get(
              'confirm-instance/confirm-modal.html'),
            controller: 'confirmInstance',
            windowClass: 'modal-custom',
            resolve: {
              confirmationTitle: function () {
                return 'editor-app.workspace.legacyWarning.title';
              },
              confirmationMessage: function () {
                return 'editor-app.workspace.legacyWarning.message';
              },
              confirmationButton: function () {
                var confirmation =
                  'editor-app.workspace.legacyWarning.confirmation';
                return confirmation;
              },
              cancelButton: null
            }
          });
          $scope.modalInstance.result.then(function () {
            $window.location.href = RVA_URL +
              '/#/PRESENTATION_MANAGE/id=' + $stateParams.presentationId +
              '?cid=' + $location.search().cid;
          });
        }
      });
      
      var _handler;
      $scope.$watch('factory.$dirty', 
        function($dirty) {
          if ($dirty) {
            window.onbeforeunload = function(e) {
              return "You have pending unsaved changes. Do you really want to discard them?";
            };
            
            _handler = _handler || $scope.$on('$stateChangeStart', function (event, toState) {
              if (toState.name.indexOf('workspace') === -1) {
                var answer = confirm("Are you sure you want to leave this page?")
                if (!answer) {
                    event.preventDefault();
                }
              }
            });
          }
      });

      $scope.$on("$destroy", function () {
        _handler && _handler();
        
        $window.onbeforeunload = null;
      });

      $scope.$watch('factory.presentation.layout', 
        function(oldValue, newValue) {
          if (oldValue !== newValue) {
            $scope.factory.$dirty = true;
          }
      });
      
    }
  ]); //ctr
