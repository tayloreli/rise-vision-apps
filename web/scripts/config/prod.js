/*
 * App Configuration File
 * Put environment-specific global variables in this file.
 *
 * In general, if you put an variable here, you will want to
 * make sure to put an equivalent variable in all three places:
 * dev.js, test.js & prod.js
 *
 */

(function (angular) {

  'use strict';

  angular.module('risevision.common.i18n.config', [])
    .constant('LOCALES_PREFIX', 'locales/translation_')
    .constant('LOCALES_SUFIX', '.json');

  angular.module('risevision.apps.config', [])
    .value('RVA_URL', 'http://rva.risevision.com')
    .value('VIEWER_URL', 'http://preview.risevision.com')
    .value('STORE_AUTHORIZATION_URL',
      'https://store-dot-rvaserver2.appspot.com/v1/widget/auth')
    .value('ALERTS_WS_URL',
      'https://rvaserver2.appspot.com/alerts/cap');

})(angular);
