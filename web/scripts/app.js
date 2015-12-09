'use strict';
angular.module('risevision.apps', [
    'risevision.common.header',
    'risevision.common.header.templates',
    'risevision.common.components.last-modified',
    'risevision.common.components.search-filter',
    'risevision.common.components.scrolling-list',
    'risevision.common.components.focus-me',
    'risevision.common.components.confirm-instance',
    'ui.router',
    'ngTouch',
    'ui.bootstrap',
    'risevision.apps.partials',
    'risevision.apps.launcher.controllers',
    'risevision.apps.launcher.directives',
    'risevision.apps.launcher.services'
  ])
  // Set up our mappings between URLs, templates, and controllers
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function storeRouteConfig($urlRouterProvider, $stateProvider,
      $locationProvider) {

      $locationProvider.html5Mode(true);

      $urlRouterProvider.otherwise('/');

      // Use $stateProvider to configure states.
      $stateProvider.state('main', {
        template: '<div ui-view></div>'
      })

      .state('main.home', {
        url: '/',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get(
            'partials/launcher/app-launcher.html');
        }],
        controller: 'HomeCtrl'
      })

      .state('main.signup', {
        url: '/signup',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get(
            'partials/launcher/app-launcher.html');
        }],
        controller: 'SignUpCtrl'
      })

      .state('main.signin', {
        url: '/signin',
        templateProvider: ['$templateCache', function ($templateCache) {
          return $templateCache.get(
            'partials/launcher/app-launcher.html');
        }],
        controller: 'SignInCtrl'
      });
    }
  ]);

angular.module('risevision.common.i18n.config', [])
  .constant('LOCALES_PREFIX',
    'bower_components/rv-common-i18n/dist/locales/translation_')
  .constant('LOCALES_SUFIX', '.json');



angular.module('risevision.apps.launcher.controllers', []);
angular.module('risevision.apps.launcher.directives', []);
angular.module('risevision.apps.launcher.services', []);
