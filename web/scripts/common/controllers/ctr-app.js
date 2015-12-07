'use strict';

angular.module('risevision.apps.controllers')
  .controller('AppCtrl', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {
      $scope.navOptions = [
        {
          title: 'Home',
          link: $state.href('apps.launcher.home'),
          states: [
            'apps.launcher.home', 
            'apps.launcher.signup', 
            'apps.launcher.signin'
          ]
        },
        {
        title: 'Schedules',
        link: $state.href('apps.schedules.home'),
        states: [
          'apps.schedules.home',
          'apps.schedules.list', 
          'apps.schedules.details', 
          'apps.schedules.add'
        ]
      }];
      $scope.navSelected = 'apps.launcher.home';
      
      $rootScope.$on('$stateChangeSuccess', function () {
        $scope.navSelected = $state.current.name;
      });
    }
  ]); //ctr
