'use strict';
var StoreProductsModalPage = function() {
  var storeProductsModal = element(by.id('addStoreProductModal'));
  var modalTitle = element(by.id('storeModalTitle'));
  var searchFilter = element(by.tagName('search-filter'));
  var searchInput = element(by.id('storeProductsSearchInput'));
  var searchCategories = element.all(by.repeater('tag in productTags'));

  var storeProductsLoader = element(by.css('#addStoreProductModal .spinner-backdrop'));

  var storeProductsList = element(by.id('productList'));
  var storeProducts = element.all(by.css('.storeProduct'));
  var addBlankPresentation = element(by.css('.blank-template'));
  var suggestTemplate = element(by.css('.suggest-template'));  
  var productNameFields = element.all(by.id('productName'));
  var statusFields = element.all(by.id('status'));

  var addWidgetByUrlButton = element(by.id('addWidgetByUrl'));


  this.getStoreProductsModal = function () {
    return storeProductsModal;
  };

  this.getModalTitle = function () {
    return modalTitle;
  };

  this.getTitle = function() {
    return title;
  };

  this.getSearchFilter = function() {
    return searchFilter;
  };

  this.getSearchInput = function() {
    return searchInput;
  };
  
  this.getSearchCategories = function() {
    return searchCategories;
  }

  this.getStoreProductsList = function() {
    return storeProductsList;
  };

  this.getAddBlankPresentation = function() {
    return addBlankPresentation;
  };

  this.getSuggestTemplate = function() {
    return suggestTemplate;
  };
  
  this.getStoreProductsLoader = function() {
    return storeProductsLoader;
  };

  this.getStoreProducts = function() {
    return storeProducts;
  };

  this.getProductNameFields = function() {
    return productNameFields;
  };

  this.getStatusFields = function() {
    return statusFields;
  };

  this.getAddWidgetByUrlButton = function() {
    return addWidgetByUrlButton;
  };
};

module.exports = StoreProductsModalPage;
