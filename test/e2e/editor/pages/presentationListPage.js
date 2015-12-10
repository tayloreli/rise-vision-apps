'use strict';
var PresentationListPage = function() {
  var editorAppContainer = element(by.css('.editor-app'));

  var title = element(by.id('title'));
  var searchFilter = element(by.tagName('search-filter'));
  var presentationAddButton = element(by.id('presentationAddButton'));
  var newPresentationButton = element(by.id('newPresentationButton'));
  var fromTemplatePresentationButton = element(by.id('fromTemplatePresentationButton'));

  var presentationListTable = element(by.id('presentationListTable'));
  var tableHeaderName = element(by.id('tableHeaderName'));
  var tableHeaderStatus = element(by.id('tableHeaderStatus'));
  var tableHeaderChangeDate = element(by.id('tableHeaderChangeDate'));
  var presentationItems = element.all(by.repeater('presentation in presentations.list'));

  this.getEditorAppContainer = function() {
    return editorAppContainer;
  };

  this.getTitle = function() {
    return title;
  };

  this.getSearchFilter = function() {
    return searchFilter;
  };

  this.getPresentationAddButton = function() {
    return presentationAddButton;
  };

  this.getNewPresentationButton = function() {
    return newPresentationButton;
  };

  this.getFromTemplatePresentationButton = function() {
    return fromTemplatePresentationButton;
  };

  this.getPresentationListTable = function() {
    return presentationListTable;
  };

  this.getTableHeaderName = function() {
    return tableHeaderName;
  };

  this.getTableHeaderStatus = function() {
    return tableHeaderStatus;
  };

  this.getTableHeaderChangeDate = function() {
    return tableHeaderChangeDate;
  };

  this.getPresentationItems = function() {
    return presentationItems;
  };
};

module.exports = PresentationListPage;
