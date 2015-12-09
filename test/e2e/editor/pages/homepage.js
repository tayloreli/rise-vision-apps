'use strict';
var config = require('../../config/config.json');

var HomePage = function() {
  var url = config.rootUrl + '/editor';
  var editorAppContainer = element(by.css('.editor-app'));

  var editorImage = element(by.id('editor-image'));
  var manageEditorText = element(by.id('manage-editor-text'));
  var appTitleText = element(by.id('app-title'));
  var signUpText = element(by.id('sign-up-text'));
  var signInText = element(by.id('sign-in-text'));
  var signUpLink = element(by.id('sign-up-link'));
  var signInLink = element(by.id('sign-in-link'));

  this.get = function() {
    browser.get(url);
  };

  this.getUrl = function() {
    return url;
  }

  this.getEditorAppContainer = function() {
    return editorAppContainer;
  };

  this.getEditorImage = function() {
    return editorImage;
  };

  this.getManageEditorText = function() {
    return manageEditorText;
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

};

module.exports = HomePage;
