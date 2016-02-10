'use strict';
describe('controller: Home', function() {
  beforeEach(module('risevision.apps.launcher.controllers'));
  var $scope;
  beforeEach(function(){
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $controller('HomeCtrl', {
        $scope: $scope,
        launcherTracker: function(){},
        editorFactory: function(){},
      });
      $scope.$digest();
    });
  });
  it('should exist',function(){
    expect($scope).to.be.ok;
    expect($scope.launcherTracker).to.be.ok;
    expect($scope.editorFactory).to.be.ok;
  });
});
