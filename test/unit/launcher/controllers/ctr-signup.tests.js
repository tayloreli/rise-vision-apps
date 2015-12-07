'use strict';
describe('controller: Sign Up', function() {
  beforeEach(module('risevision.apps.launcher.controllers'));
  beforeEach(module(function ($provide) {
    $provide.service('userState', function() {
      return {
        authenticate: function(forceAuth) {

          var deferred = Q.defer();
          if(!forceAuth){
            goToLogin = false;
            if(isLoggedIn) {

               deferred.resolve();
            } else {
              deferred.reject();
            }
          }else{
            goToLogin = true;
            deferred.resolve();
          }

          return deferred.promise;
        }
      };
    });
    $provide.service('$modalInstance',function(){
      return {
        open : function(){
          return;
        }
      }
    });
    $provide.service('$state',function(){
      return {
        _state : '',
        go : function(state, params){
          if (state){
            this._state = state;
          }
          currentState = this._state;
          return this._state;
        }
      }
    });
  }));
  var $scope, isLoggedIn, goToLogin, currentState, $modalInstance, $modalInstanceOpenSpy;
  beforeEach(function () {
    currentState = '';
  });

  it('should redirect user to home as it is already logged in',function(done){
    isLoggedIn = true;

    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $modalInstanceOpenSpy = sinon.spy($modalInstance, 'open');

      $controller('SignUpCtrl', {
        $modal: $modalInstance,
        userState: $injector.get('userState'),
        $state: $injector.get('$state')
      });
      $scope.$digest();
    });

    setTimeout(function(){
      $modalInstanceOpenSpy.should.not.have.been.called;
      expect(goToLogin).to.be.false;
      expect(currentState).to.equal('apps.launcher.home');
      done();
    },10);
  });

  it('should show sign up modal when user is not logged in',function(done){
    isLoggedIn = false;
    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $modalInstanceOpenSpy = sinon.spy($modalInstance, 'open');

      $controller('SignUpCtrl', {
        $modal: $modalInstance,
        userState: $injector.get('userState'),
        $state: $injector.get('$state')
      });
      $scope.$digest();
    });

    setTimeout(function(){
      $modalInstanceOpenSpy.should.have.been.called;
      expect(goToLogin).to.be.false;
      expect(currentState).to.not.equal('apps.home');
      done();
    },10);
  });
});
