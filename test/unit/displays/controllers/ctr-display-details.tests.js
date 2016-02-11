'use strict';
describe('controller: display details', function() {
  var displayId = 1234;
  beforeEach(module('risevision.displays.controllers'));
  beforeEach(module('risevision.displays.services'));
  beforeEach(module(mockTranlate()));
  beforeEach(module(function ($provide) {
    $provide.service('userState',userState);
    $provide.service('display',function(){
      return {
        update : function(display){
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not update display');
          }
          return deferred.promise;
        },
        get: function(displayId) {
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not get display');
          }
          return deferred.promise;
        },
        delete: function(displayId) {
          var deferred = Q.defer();
          if(updateDisplay){
            deferred.resolve(displayId);
          }else{
            deferred.reject('ERROR; could not delete display');
          }
          return deferred.promise;
        }
      }
    });
    $provide.service('displayTracker', function() { 
      return function(name) {
        trackerCalled = name;
      };
    });
    $provide.service('$stateParams',function(){
      return {
        displayId: 'abcd1234'
      }
    });
    $provide.service('$state',function(){
      return {
        _state : '',
        go : function(state, params){
          if (state){
            this._state = state;
          }
          return this._state;
        }
      }
    });
    $provide.service('$modal',function(){
      return {
        open : function(obj){
          expect(obj).to.be.truely;
          var deferred = Q.defer();
          if(confirmDelete){
            deferred.resolve();
          }else{
            deferred.reject();
          }
          
          return {
            result: deferred.promise
          };
        }
      }
    });
  }));
  var $scope, userState, $state, updateDisplay, confirmDelete, trackerCalled;
  beforeEach(function(){
    trackerCalled = undefined;
    userState = function(){
      return {
        getSelectedCompanyId : function(){
          return 'some_company_id';
        },
        _restoreState : function(){

        },
        isSubcompanySelected : function(){
          return true;
        }
      }
    };
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $state = $injector.get('$state');
      $controller('displayDetails', {
        $scope : $scope,
        userState : $injector.get('userState'),
        display:$injector.get('display'),
        $modal:$injector.get('$modal'),
        $state : $state,
        $log : $injector.get('$log')});
      $scope.$digest();
    });
  });
  
  beforeEach(function(done) {
    updateDisplay = true;
    
    setTimeout(function(){
      expect($scope.loadingDisplay).to.be.false;
      done();
    },10);
  });

  it('should exist',function(){
    expect($scope).to.be.ok;
    expect($scope.displayId).to.be.ok;
    expect($scope.displayTracker).to.be.ok;

    expect($scope.save).to.be.a('function');
    expect($scope.confirmDelete).to.be.a('function');
  });

  it('should init the correct defaults',function(){
    expect($scope.savingDisplay).to.be.false;
  });

  describe('submit: ',function(){
    it('should return early if the form is invalid',function(){
      $scope.displayDetails = {};
      $scope.displayDetails.$valid = false;
      $scope.save();
    });

    it('should save the display',function(done){
      updateDisplay = true;

      $scope.displayDetails = {};
      $scope.displayDetails.$valid = true;
      $scope.display = {id:123};
      $scope.save();
      expect($scope.savingDisplay).to.be.true;
      setTimeout(function(){
        expect(trackerCalled).to.equal('Display Updated');
        expect($scope.savingDisplay).to.be.false;
        expect($scope.submitError).to.not.be.ok;
        done();
      },10);
    });

    it('should show an error if fails to update the display',function(done){
      updateDisplay = false;

      $scope.$digest();
      $scope.displayDetails = {};
      $scope.displayDetails.$valid = true;
      $scope.save();
      setTimeout(function(){
        expect($state._state).to.be.empty;
        expect(trackerCalled).to.not.equal('Display Updated');
        expect($scope.savingDisplay).to.be.false;
        expect($scope.submitError).to.be.ok;
        done();
      },10);
    });
  });
  
  describe('delete: ',function(){
    beforeEach(function() {
      confirmDelete = false;
    });
    
    it('should return early the user does not confirm',function(){
      $scope.confirmDelete();
      
      expect($scope.loadingDisplay).to.be.false;
      expect($state._state).to.be.empty;
    });
    
    it('should delete the display',function(done){
      confirmDelete = true;
      updateDisplay = true;
      $scope.display = {id:123};
      
      $scope.confirmDelete();
      setTimeout(function(){
        expect($scope.loadingDisplay).to.be.false;
        expect($scope.submitError).to.not.be.ok;
        expect(trackerCalled).to.equal('Display Deleted');
        expect($state._state).to.equal('apps.displays.list');
        done();
      },10);
    });
    
    it('should show an error if fails to delete the display',function(done){
      confirmDelete = true;
      updateDisplay = false;
      
      $scope.confirmDelete();
      setTimeout(function(){
        expect($state._state).to.be.empty;
        expect(trackerCalled).to.not.be.ok;
        expect($scope.loadingDisplay).to.be.false;
        expect($scope.submitError).to.be.ok;
        done();
      },10);
    });
  });

  describe('browserUpgradeMode:',function(){
    it('should watch display.browserUpgradeMode',function(){
      expect($scope.$$watchers[0].exp).to.equal('display.browserUpgradeMode');
    });

    it('should change to User Managed (1) any value different than Auto Upgrade (0)',function(){
      $scope.display = {id:123, browserUpgradeMode: 2};
      $scope.$digest();
      expect($scope.display.browserUpgradeMode).to.equal(1);
      $scope.display = {id:123, browserUpgradeMode: 1};
      $scope.$digest();
      expect($scope.display.browserUpgradeMode).to.equal(1);
    });

    it('should not change Auto Upgrade (0)',function(){
      $scope.display = {id:123, browserUpgradeMode: 0};
      $scope.$digest();
      expect($scope.display.browserUpgradeMode).to.equal(0);
    });
  })

});
