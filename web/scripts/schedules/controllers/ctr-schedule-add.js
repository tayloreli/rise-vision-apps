'use strict';

angular.module('risevision.schedules.controllers')
  .controller('scheduleAdd', ['$scope', 'scheduleFactory', '$loading', '$log',
    'scheduleTracker',
    function ($scope, scheduleFactory, $loading, $log, scheduleTracker) {
      $scope.factory = scheduleFactory;
      $scope.schedule = scheduleFactory.schedule;

      $scope.$watch('factory.loadingSchedule', function (loading) {
        if (loading) {
          $loading.start('schedule-loader');
        } else {
          $loading.stop('schedule-loader');
        }
      });

      $scope.save = function () {
        scheduleTracker('Save Schedule', scheduleFactory.schedule.id,
          scheduleFactory.schedule.name);
        if (!$scope.scheduleDetails.$valid) {
          $log.error('form not valid: ', $scope.scheduleDetails.errors);
          return;
        }

        scheduleFactory.addSchedule();
      };

    }
  ]);
