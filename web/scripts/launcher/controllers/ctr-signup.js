'use strict';

angular.module('risevision.apps.launcher.controllers')
  .controller('SignUpCtrl', ['$modal', 'userState', '$state',
    function ($modal, userState, $state) {

      userState.authenticate(false).then(function () {
        $state.go('main.home');
      }).then(null, function () {
        $modal.open({
          templateUrl: 'signup-modal.html',
          controller: 'SignUpModalCtrl'
        });
      });

    }
  ]);
