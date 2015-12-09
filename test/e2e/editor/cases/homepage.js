'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var helper = require('rv-common-e2e').helper;
var GoogleAuthPage = require('rv-common-e2e').googleAuthPage;

var HomePageScenarios = function() {

  browser.driver.manage().window().setSize(1920, 1080);
  describe("In order to manage presentations " +
    "As a user " +
    "I would like to have access to the homepage of the editor app", function () {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var commonHeaderPage;
    var googleAuthPage;
    before(function () {
      homepage = new HomePage();
      commonHeaderPage = new CommonHeaderPage();
      googleAuthPage = new GoogleAuthPage();
    });

    describe("Given a user who access the editor app", function () {

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
        expect(homepage.getEditorAppContainer().isDisplayed()).to.eventually.be.true;
      });

      it('should load common header', function () {
        expect(commonHeaderPage.getCommonHeader().isDisplayed()).to.eventually.be.true;
      });

      it('should have a editor menu item on the common header', function () {
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(4).isDisplayed()).to.eventually.be.true;
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(4).getText()).to.eventually.equal('Editor');
      });

      it('should go to home when clicking on Editor menu item', function () {
        commonHeaderPage.getCommonHeaderMenuItems().get(4).click();
        expect(browser.getCurrentUrl()).to.eventually.contain(homepage.getUrl());
      });

      it('should show the editor image', function () {
        expect(homepage.getEditorImage().isDisplayed()).to.eventually.be.true;
      });

      it('should show the editor title text', function () {
        expect(homepage.getAppTitleText().getText()).to.eventually.equal('Editor');
      });

      it('should show the manage editor text', function () {
        expect(homepage.getManageEditorText().getText()).to.eventually.equal('Create and manage HTML content for your digital signage displays, anywhere, anytime.');
      });

      it('should show the Sign Up link', function () {
        expect(homepage.getSignUpLink().isDisplayed()).to.eventually.be.true;
      });

      it('should show the Sign In link', function () {
        expect(homepage.getSignInLink().isDisplayed()).to.eventually.be.true;
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
        helper.wait(commonHeaderPage.getModalDialog(), 'Sign Up Modal');
        expect(commonHeaderPage.getModalDialog().isDisplayed()).to.eventually.be.true;
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
