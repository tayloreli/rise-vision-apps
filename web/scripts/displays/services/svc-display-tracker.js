'use strict';

angular.module('risevision.displays.services')
  .factory('displayTracker', ['userState', 'segmentAnalytics',
    function (userState, segmentAnalytics) {
      return function (eventName, displayId, displayName, downloadType) {
        if (eventName) {
          segmentAnalytics.track(eventName, {
            displayId: displayId,
            displayName: displayName,
            companyId: userState.getSelectedCompanyId(),
            downloadType: downloadType
          });
        }
      };
    }
  ]);
