'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../../launcher/pages/homepage.js');
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
        
        commonHeaderPage.signOut();

        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should load welcome page', function () {
        expect(homepage.getWelcomeText().isPresent()).to.eventually.be.true;
      });

      it('should load common header', function () {
        expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
      });

      it('should have a schedule menu item on the common header', function () {
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(2).isPresent()).to.eventually.be.true;
        expect(commonHeaderPage.getCommonHeaderMenuItems().get(2).getText()).to.eventually.equal('Schedules');
      });

    });

  });
};

module.exports = HomePageScenarios;
