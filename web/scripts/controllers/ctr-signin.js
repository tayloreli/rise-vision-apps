'use strict';

angular.module('risevision.app-launcher.controllers')
  .controller('SignInCtrl', ['userState', '$state',
    function (userState, $state) {

      userState.authenticate(false).then(function () {
        $state.go('main.home');
      }).then(null, function () {
        userState.authenticate(true);
      });
    }
  ]);
