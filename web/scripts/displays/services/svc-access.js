'use strict';

angular.module('risevision.displays.services')
  .factory('canAccessDisplays', ['$q', 'userState',
    function ($q, userState) {
      return function () {
        var deferred = $q.defer();
        userState.authenticate(false).then(function () {
            if (userState.isRiseVisionUser()) {
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })
          .then(null, deferred.reject);
        return deferred.promise;
      };
    }
  ]);
