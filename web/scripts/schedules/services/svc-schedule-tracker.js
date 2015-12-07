'use strict';

angular.module('risevision.schedules.services')
  .factory('scheduleTracker', ['userState', 'segmentAnalytics',
    function (userState, segmentAnalytics) {
      return function (eventName, scheduleId, scheduleName) {
        if (eventName) {
          segmentAnalytics.track(eventName, {
            scheduleId: scheduleId,
            scheduleName: scheduleName,
            companyId: userState.getSelectedCompanyId()
          });
        }
      };
    }
  ]);
