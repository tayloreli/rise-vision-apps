'use strict';
var expect = require('rv-common-e2e').expect;
var HomePage = require('./../pages/homepage.js');
var CommonHeaderPage = require('rv-common-e2e').commonHeaderPage;
var helper = require('rv-common-e2e').helper;

var HomepageScenarios = function() {
  
  browser.driver.manage().window().setSize(1024, 768);
  describe("In order to access Rise Vison apps " +
           "As a user " +
           "I would like to have access to the homepage of the apps launcher", function() {
    this.timeout(2000);// to allow for protactor to load the seperate page
    var homepage;
    var commonHeaderPage;
    before(function (){
      homepage = new HomePage();
      commonHeaderPage = new CommonHeaderPage();

      homepage.get();
      //wait for spinner to go away.
      helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
    });

    it('should load',function(){
      expect(homepage.getAppLauncherContainer().isPresent()).to.eventually.be.true;
    });

    it('should load common header',function(){
      expect(commonHeaderPage.getCommonHeader().isPresent()).to.eventually.be.true;
    });
    
    describe("Given a user who wants to share the url", function () {
      before(function () {
        homepage.get();
        //wait for spinner to go away.
        helper.waitDisappear(commonHeaderPage.getLoader(), 'CH spinner loader');
      });

      it('should contain meta tags for sharing it nicely', function () {
        expect(homepage.getMetaByName('description').getAttribute('content')).to.eventually.equal('We have a couple of apps that will allow you to manage your Digital Signage. Managing from the content creation to its delivery on an unlimited number of displays anywhere in the world.');
      });

      it('should contain meta tags for sharing it nicely on G+', function () {
        expect(homepage.getMetaByItemProp('name').getAttribute('content')).to.eventually.equal('Rise Vision | Apps');
        expect(homepage.getMetaByItemProp('description').getAttribute('content')).to.eventually.equal('We have a couple of apps that will allow you to manage your Digital Signage. Managing from the content creation to its delivery on an unlimited number of displays anywhere in the world.');
        expect(homepage.getMetaByItemProp('image').getAttribute('content')).to.eventually.equal('https://s3.amazonaws.com/Rise-Images/landing-page/rv-image.png');
      });

      it('should contain meta tags for sharing it nicely on Twitter', function () {
        expect(homepage.getMetaByName('twitter:card').getAttribute('content')).to.eventually.equal('summary_large_image');
        expect(homepage.getMetaByName('twitter:site').getAttribute('content')).to.eventually.equal('@RiseVision');
        expect(homepage.getMetaByName('twitter:domain').getAttribute('content')).to.eventually.equal('https://apps.risevision.com');
        expect(homepage.getMetaByName('twitter:title').getAttribute('content')).to.eventually.equal('Rise Vision | Apps');
        expect(homepage.getMetaByName('twitter:description').getAttribute('content')).to.eventually.equal('We have a couple of apps that will allow you to manage your Digital Signage. Managing from the content creation to its delivery on an unlimited number of displays anywhere in the world.');
        expect(homepage.getMetaByName('twitter:image:src').getAttribute('content')).to.eventually.equal('https://s3.amazonaws.com/Rise-Images/landing-page/rv-image.png');
        expect(homepage.getMetaByName('twitter:url').getAttribute('content')).to.eventually.equal('https://apps.risevision.com');
      });

      it('should contain meta tags for sharing it nicely on Facebook', function () {
        expect(homepage.getMetaByProperty('og:locale').getAttribute('content')).to.eventually.equal('en_US');
        expect(homepage.getMetaByProperty('og:title').getAttribute('content')).to.eventually.equal('Rise Vision | Apps');
        expect(homepage.getMetaByProperty('og:type').getAttribute('content')).to.eventually.equal('product');
        expect(homepage.getMetaByProperty('og:url').getAttribute('content')).to.eventually.equal('https://apps.risevision.com');
        expect(homepage.getMetaByProperty('og:image').getAttribute('content')).to.eventually.equal('https://s3.amazonaws.com/Rise-Images/landing-page/rv-image.png');
        expect(homepage.getMetaByProperty('og:description').getAttribute('content')).to.eventually.equal('We have a couple of apps that will allow you to manage your Digital Signage. Managing from the content creation to its delivery on an unlimited number of displays anywhere in the world.');
        expect(homepage.getMetaByProperty('article:publisher').getAttribute('content')).to.eventually.equal('https://www.facebook.com/risevision');
        expect(homepage.getMetaByProperty('og:site_name').getAttribute('content')).to.eventually.equal('Rise Vision | Apps');
      });
    });
  });
};

module.exports = HomepageScenarios;
