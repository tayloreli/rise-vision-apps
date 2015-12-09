'use strict';
var ArtboardPage = function() {
  var artboardContainer = element(by.id('artboard'));
  var overlayContainer = element(by.css('#artboard > div > div'));
  

  this.getArtboardContainer = function() {
    return artboardContainer;
  };

  this.getOverlayContainer = function() {
    return overlayContainer;
  };

  this.getPlaceholderContainer  = function() {
  	return this.getArtboardContainer().element(by.css('artboard-placeholder'));
  };

};

module.exports = ArtboardPage;
