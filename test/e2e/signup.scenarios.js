'use strict';
var expect = require('rv-common-e2e').expect;
var SignUpPage = require('./pages/signUpPage.js');
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;
var SignInPage = require('./pages/signInPage.js');

browser.driver.manage().window().setSize(1024, 768);
describe("In order to sign up with Rise Vision " +
         "As a user " +
         "I would like to have access to the sign up process", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var signInPage;
  var signUpPage;
  var googleAuthPage;
  before(function (){
    signInPage = new SignInPage();
    signUpPage = new SignUpPage();
    googleAuthPage = new GoogleAuthPage();
  });

  it('should show the sign up modal when the user is not signed in',function(){
    signUpPage.get();
    expect(signUpPage.getModalDialog().isDisplayed()).to.eventually.be.true;
    expect(signUpPage.getModalTitle().isDisplayed()).to.eventually.be.true;
    expect(signUpPage.getModalTitle().getText()).to.eventually.equal('Digital Signage Content Management');
  });


  it('should not sign in the user through google when it is already signed in',function(){
    signInPage.get();
    googleAuthPage.signin();
    signUpPage.get();
    expect(signUpPage.getModalDialog().isPresent()).to.eventually.be.false;
    expect(signUpPage.getModalTitle().isPresent()).to.eventually.be.false;
  });
});
