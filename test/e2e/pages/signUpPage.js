'use strict';
var HomePage = require('./homepage.js');

var SignUpPage = function() {
  var homepage = new HomePage;
  var url = homepage.getUrl() + 'signup';
  var modalDialog = element(by.css('.modal-dialog'));
  var startWithAGoogleAccount = element(by.buttonText('Start with a Google Account'));

  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  };

  this.getModalDialog = function () {
    return modalDialog;
  };

  this.getStartWithAGoogleAccount = function () {
    return startWithAGoogleAccount;
  };

};

module.exports = SignUpPage;
