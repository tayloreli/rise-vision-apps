'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var SchedulesListPage = require('./../pages/schedulesListPage.js');
var helper = require('rv-common-e2e').helper;

var SigninScenarios = function() {




describe("In order to manage schedules " +
         "As a user " +
         "I would like to be able to sign in to the Schedules app", function() {
  this.timeout(2000);// to allow for protactor to load the seperate page
  var homepage;
  var commonHeaderPage;
  var schedulesListPage;
  before(function (){
    homepage = new HomePage();
    commonHeaderPage = new CommonHeaderPage();
    schedulesListPage = new SchedulesListPage();

    homepage.get();
  });

  it('should sign in to the Schedules app',function(){
    //wait for spinner to go away.g
    helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader').then(function () {
      commonHeaderPage.signin();
    });
    expect(schedulesListPage.getTitle().isPresent()).to.eventually.be.true;
  });
});
};

module.exports = SigninScenarios;
