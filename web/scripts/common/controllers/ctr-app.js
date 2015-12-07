'use strict';

angular.module('risevision.apps.controllers')
  .controller('AppCtrl', ['$scope', '$rootScope', '$state',
    function ($scope, $rootScope, $state) {
      $scope.navOptions = [{
        title: 'Home',
        link: $state.href('apps.launcher.home'),
        states: [
          'apps.launcher.home',
          'apps.launcher.signup',
          'apps.launcher.signin'
        ]
      }, {
        title: 'Schedules',
        link: $state.href('apps.schedules.home'),
        states: [
          'apps.schedules.home',
          'apps.schedules.list',
          'apps.schedules.details',
          'apps.schedules.add'
        ]
      }, {
        title: 'Displays',
        link: $state.href('apps.displays.home'),
        states: [
          'apps.displays.home',
          'apps.displays.list',
          'apps.displays.add',
          'apps.displays.details'
        ]
      }, {
        title: 'Alerts',
        link: $state.href('apps.displays.alerts'),
        states: ['apps.displays.alerts']
      }, {
        title: 'Editor',
        link: $state.href('apps.editor.home'),
        states: [
          'apps.editor.home',
          'apps.editor.list',
          'apps.editor.workspace.artboard',
          'apps.editor.workspace.htmleditor'
        ]
      }];
      $scope.navSelected = 'apps.launcher.home';

      $rootScope.$on('$stateChangeSuccess', function () {
        $scope.navSelected = $state.current.name;
      });
    }
  ]); //ctr
