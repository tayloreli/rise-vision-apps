'use strict';
var config = require('../../config/config.json');

var HomePage = function() {
  var url = config.rootUrl + '/';
  var protectedPageUrl = config.rootUrl + '/displays/list';
  var appLauncherContainer = element(by.id('appLauncherContainer'));

  var welcomeText = element(by.id('welcome-text'));
  var appTitleText = element(by.id('app-title'));
  var signUpText = element(by.id('sign-up-text'));
  var signInText = element(by.id('sign-in-text'));
  var signUpLink = element(by.id('sign-up-link'));
  var signInLink = element(by.id('sign-in-link'));  


  this.get = function() {
    browser.get(url);
  };

  this.getProtectedPage = function() {
    browser.get(protectedPageUrl);
  };

  this.getUrl = function() {
    return url;
  }

  this.getProtectedPageUrl = function() {
    return protectedPageUrl;
  }

  this.getAppLauncherContainer = function() {
    return appLauncherContainer;
  };

  this.getWelcomeText = function() {
    return welcomeText;
  };

  this.getAppTitleText = function() {
    return appTitleText;
  };

  this.getSignUpText = function() {
    return signUpText;
  };

  this.getSignInText = function() {
    return signInText;
  };

  this.getSignUpLink = function() {
    return signUpLink;
  };

  this.getSignInLink = function() {
    return signInLink;
  };

  this.getMetaByName = function(name) {
    return element(by.xpath("//meta[@name='"+name+"']"));
  };

  this.getMetaByItemProp = function(itemprop) {
    return element(by.xpath("//meta[@itemprop='"+itemprop+"']"));
  };

  this.getMetaByProperty = function(property) {
    return element(by.xpath("//meta[@property='"+property+"']"));
  };

};

module.exports = HomePage;
