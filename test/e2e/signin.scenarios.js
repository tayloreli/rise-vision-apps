'use strict';
var expect = require('rv-common-e2e').expect;
var SignInPage = require('./pages/signInPage.js');
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;
var HomePage = require('./pages/homepage.js');

browser.driver.manage().window().setSize(1024, 768);
describe("In order to sign in with Rise Vision " +
         "As a user " +
         "I would like to authenticate with google", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var signInPage;
  var googleAuthPage;
  beforeEach(function (){
    homepage = new HomePage();
    signInPage = new SignInPage();
    googleAuthPage = new GoogleAuthPage();
    signInPage.get();

  });

  it('should sign in the user through google',function(){
    googleAuthPage.signin();
    expect(homepage.getAppLauncherContainer().isPresent()).to.eventually.be.true;
  });


  it('should not sign in the user through google when it is already signed in',function(){
    expect(homepage.getAppLauncherContainer().isPresent()).to.eventually.be.true;
  });
});
