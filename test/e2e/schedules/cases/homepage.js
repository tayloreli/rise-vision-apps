'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var helper = require('rv-common-e2e').helper;
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;
var HomePageScenarios = function() {


  browser.driver.manage().window().setSize(1920, 1080);
  describe("In order to manage schedules " +
    "As a user " +
    "I would like to have access to the homepage of the schedules app", function () {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var commonHeaderPage;
    var googleAuthPage;
    before(function () {
      homepage = new HomePage();
      commonHeaderPage = new CommonHeaderPage();
      googleAuthPage = new GoogleAuthPage();
    });

    describe("Given a user who access the schedules app", function () {

      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should load', function () {
        expect(homepage.getSchedulesAppContainer().isPresent()).to.eventually.be.true;
      });

      it('should load common header', function () {
        expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
      });

      it('should have a schedule menu item on the common header', function () {
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(1).isPresent()).to.eventually.be.true;
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(1).getText()).to.eventually.equal('Schedules');
      });

      it('should go to home when clicking on Schedules menu item', function () {

        commonHeaderPage.getCommonHeaderMenuItems().get(1).click();
        browser.sleep(10000);
        expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());
      });

      it('should show the schedules image', function () {
        expect(homepage.getSchedulesImage().isPresent()).to.eventually.be.true;
      });

      it('should show the schedules title text', function () {
        expect(homepage.getAppTitleText().getText()).to.eventually.equal('Schedules');
      });

      it('should show the manage schedules text', function () {
        expect(homepage.getManageSchedulesText().getText()).to.eventually.equal('Schedule delivery of HTML content to your digital signage displays, anywhere, anytime.');
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

      it('should go to google authentication when clicking on the sign in link', function () {
        homepage.getSignInLink().click().then(function () {
          googleAuthPage.signin();
          expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());
        });
      });
    });
  });
};

module.exports = HomePageScenarios;
