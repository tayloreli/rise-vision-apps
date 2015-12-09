'use strict';
describe('directive: sidebar', function() {
  var $compile,
      $rootScope;

  beforeEach(module('risevision.editor.controllers'));
  beforeEach(module('risevision.editor.services'));
  beforeEach(module('risevision.editor.directives'));
  beforeEach(module(mockTranlate()));
  beforeEach(module(function ($provide) {
    $provide.service('placeholderFactory', function() {
      return {};
    });
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
    $templateCache.put('partials/editor/sidebar.html', '<p>mock</p>');
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Replaces the element with the appropriate content', function() {
    var element = $compile("<sidebar></sidebar>")($rootScope);
    $rootScope.$digest();
    expect(element.html()).to.equal('<p>mock</p>');
  });
});
