'use strict';
angular.module('risevision.apps', [
    'ui.router',
    'ngTouch',
    'ui.bootstrap',
    // 'ui.bootstrap.showErrors',
    'risevision.common.header',
    'risevision.common.header.templates',
    'risevision.common.components.last-modified',
    'risevision.common.components.search-filter',
    'risevision.common.components.scrolling-list',
    'risevision.common.components.focus-me',
    'risevision.common.components.confirm-instance',
    'risevision.common.components.timeline',
    'risevision.common.components.analytics',
    'risevision.common.components.distribution-selector',
    'risevision.common.components.presentation-selector',
    'risevision.widget.common.storage-selector',
    'risevision.common.loading',
    'risevision.common.i18n',
    'risevision.apps.partials',
    'risevision.apps.config',
    'risevision.apps.controllers',
    'risevision.apps.launcher.controllers',
    'risevision.apps.launcher.directives',
    'risevision.apps.launcher.services',
    'risevision.schedules.services',
    'risevision.schedules.controllers',
    'risevision.schedules.filters',
    'risevision.schedules.directives'
  ])
  // Set up our mappings between URLs, templates, and controllers
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function storeRouteConfig($urlRouterProvider, $stateProvider,
      $locationProvider) {

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      // Use $stateProvider to configure states.
      $stateProvider.state('apps', {
        template: '<div ui-view></div>'
      })
      
      .state('apps.launcher', {
        abstract: true,
        template: '<div class="website" ui-view></div>'
      })

      .state('apps.launcher.home', {
        url: '/',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get(
            'partials/launcher/app-launcher.html');
        }],
        controller: 'HomeCtrl'
      })

      .state('apps.launcher.signup', {
        url: '/signup',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get(
            'partials/launcher/app-launcher.html');
        }],
        controller: 'SignUpCtrl'
      })

      .state('apps.launcher.signin', {
        url: '/signin',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get(
            'partials/launcher/app-launcher.html');
        }],
        controller: 'SignInCtrl'
      })
      
      // schedules
      .state('apps.schedules', {
        abstract: true,
        template: '<div class="container schedules-app" ui-view></div>'
      })
      
      .state('apps.schedules.home', {
        url: '/schedules',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/schedules/landing-page.html');
        }],
        controller: ['canAccessSchedules', '$state',
      
          function (canAccessSchedules, $state) {
            canAccessSchedules().then(function () {
              $state.go('apps.schedules.list');
            });
          }
        ]        
      })

      .state('apps.schedules.list', {
        url: '/schedules/list',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/schedules/schedules-list.html');
        }],
        controller: 'schedulesList',
        resolve: {
          canAccessSchedules: ['canAccessSchedules',
            function (canAccessSchedules) {
              return canAccessSchedules();
            }
          ]
        }
      })

      .state('apps.schedules.details', {
        url: '/schedules/details/:scheduleId',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/schedules/schedule-details.html');
        }],
        controller: 'scheduleDetails',
        resolve: {
          scheduleInfo: ['canAccessSchedules', 'scheduleFactory',
            '$stateParams',
            function (canAccessSchedules, scheduleFactory, $stateParams) {
              return canAccessSchedules().then(function () {
                //load the schedule based on the url param
                return scheduleFactory.getSchedule($stateParams.scheduleId);
              });
            }
          ]
        }
      })

      .state('apps.schedules.add', {
        url: '/schedules/add',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get('partials/schedules/schedule-add.html');
        }],
        controller: 'scheduleAdd',
        resolve: {
          scheduleInfo: ['canAccessSchedules', 'scheduleFactory',
            function (canAccessSchedules, scheduleFactory) {
              return canAccessSchedules().then(scheduleFactory.newSchedule);
            }
          ]
        }
      });
    }
  ])
  .run(['$rootScope', '$state', 'userState',
    function ($rootScope, $state, userState) {
      $rootScope.$on('risevision.user.signedOut', function () {
        $state.go('apps.launcher.home');
      });

      $rootScope.$on('risevision.company.selectedCompanyChanged', function () {
        if ($state.current.name === 'apps.schedules.list' ||
          $state.current.name === 'apps.schedules.root') {
          $state.go($state.current.name, null, {
            reload: true
          });
        }
      });
    }
  ])
  // .config(['showErrorsConfigProvider',
  //   function (showErrorsConfigProvider) {
  //     showErrorsConfigProvider.trigger('keypress');
  //   }
  // ])
  ;
  
angular.module('risevision.apps.controllers', []);

angular.module('risevision.apps.launcher.controllers', []);
angular.module('risevision.apps.launcher.directives', []);
angular.module('risevision.apps.launcher.services', []);

angular.module('risevision.schedules.services', [
  'risevision.common.header',
  'risevision.common.gapi'
]);

angular.module('risevision.schedules.filters', []);
angular.module('risevision.schedules.directives', [
  'risevision.schedules.filters'
]);
angular.module('risevision.schedules.controllers', []);
