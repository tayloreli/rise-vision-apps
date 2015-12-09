'use strict';

xdescribe("filter: Display fields", function() {

  var $scope, scope, element, compiledElem;

  beforeEach(module('risevision.displays.filters'));
  beforeEach(module('templates'));

  beforeEach(module(function ($provide) {
    $provide.value("COUNTRIES", [""]);
  }));
  
  beforeEach(function() {
    inject(function(_$rootScope_, _$compile_) {
      $scope = _$rootScope_.$new();
      //$scope.display = {};

      element = _$compile_('<display-fields></display-fields>')($scope);

    });
  });
  
  xit("should exist", function() {
    $scope.$digest()
    //expect(scope).to.be.exist;
    console.log(element.isolateScope());
    expect(element.isolateScope()).to.eventually.be.ok;

  });

  xit("isChromeOs: ", function() {
    expect(scope.isChromeOs()).to.be.true;
    expect(scope.isChromeOs({os: "cros/x86-64"})).to.be.false;
  });

});
