'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;
var helper = require('rv-common-e2e').helper;

var HomePageScenarios = function() {

  browser.driver.manage().window().setSize(1920, 1080);
  describe("In order to manage displays " +
    "As a user " +
    "I would like to have access to the homepage of the displays app", function () {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var commonHeaderPage;
    var googleAuthPage;
    before(function () {
      homepage = new HomePage();
      commonHeaderPage = new CommonHeaderPage();
      googleAuthPage = new GoogleAuthPage();
    });

    describe("Given a user who access the displays app", function () {

      before(function () {
        homepage.get();
        
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
        
        commonHeaderPage.signOut();
        
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should load', function () {
        expect(homepage.getDisplaysAppContainer().isPresent()).to.eventually.be.true;
      });

      it('should load common header', function () {
        expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
      });

      it('should have a display menu item on the common header', function () {
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(2).isPresent()).to.eventually.be.true;
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(2).getText()).to.eventually.equal('Displays');
      });

      it('should have Alerts menu item on the common header', function () {
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(3).isPresent()).to.eventually.be.true;
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(3).getText()).to.eventually.equal('Alerts');
      });

      it('should go to home when clicking on Displays menu item', function () {
        commonHeaderPage.getCommonHeaderMenuItems().get(2).click();
        expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());
      });

      it('should show the displays image', function () {
        expect(homepage.getDisplaysImage().isPresent()).to.eventually.be.true;
      });

      it('should show the manage displays text', function () {
        expect(homepage.getManageDisplaysText().getText()).to.eventually.equal('Manage and monitor your digital signage displays, anywhere, anytime.');
      });

      it('should show the Sign Up link', function () {
        expect(homepage.getSignUpLink().isPresent()).to.eventually.be.true;
      });

      it('should show the Sign In link', function () {
        expect(homepage.getSignInLink().isPresent()).to.eventually.be.true;
      });

      it('should show the Sign Up text', function () {
        expect(homepage.getSignUpText().getText()).to.eventually.equal('for free, no credit card required, or');
      });

      it('should show the Sign In text', function () {
        expect(homepage.getSignInText().getText()).to.eventually.equal('if you already have an account.');
      });
    });

    describe("Given a user who wants to sign up", function () {
      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should open sign up model when clicking on the sign up link', function () {
        homepage.getSignUpLink().click();
        expect(commonHeaderPage.getModalDialog().isPresent()).to.eventually.be.true;
      });
    });

    describe("Given a user who wants to sign in", function () {
      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should go to google authentication when clicking on the sign in link', function (done) {
        homepage.getSignInLink().click().then(function () {
          googleAuthPage.signin();
          expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());

          done();
        });
      });
    });

  });
};

module.exports = HomePageScenarios;
