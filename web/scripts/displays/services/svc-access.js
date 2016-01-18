'use strict';

angular.module('risevision.displays.services')
  .factory('canAccessDisplays', ['$q', 'userState', '$state',
    function ($q, userState, $state) {
      return function () {
        var deferred = $q.defer();
        userState.authenticate(false).then(function () {
            if (userState.isRiseVisionUser()) {
              deferred.resolve();
            } else {
              return $q.reject();
            }
          })
          .then(null, function () {
            $state.go('apps.launcher.unauthorized');

            deferred.reject();
          });
        return deferred.promise;
      };
    }
  ]);
