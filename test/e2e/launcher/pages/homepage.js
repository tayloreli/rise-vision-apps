'use strict';
var config = require('../config/config.json');

var HomePage = function() {
  var url = config.rootUrl + '/';
  var appLauncherContainer = element(by.id('appLauncherContainer'));

  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  }

  this.getAppLauncherContainer = function() {
    return appLauncherContainer;
  };
};

module.exports = HomePage;
