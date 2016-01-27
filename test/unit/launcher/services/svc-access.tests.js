'use strict';
describe('service: access:', function() {
  beforeEach(module('risevision.apps.launcher.services'));

  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('userState',function(){
      return {
        authenticate : function(){
          var deferred = Q.defer();
                  
          if (authenticate) {
            deferred.resolve("auth");
          }
          else {
            deferred.reject("not auth");
          }
          
          return deferred.promise
        },
        isRiseVisionUser : function(){
          return isRiseVisionUser;
        }, 
        _restoreState: function(){}
      }
    });
    $provide.service('$state', function() {
      return {
        go: function(state) {
          newState = state;
        }
      };
    });
  }));
  
  var canAccessLauncher, authenticate, isRiseVisionUser, newState;
  beforeEach(function(){
    isRiseVisionUser = true;
    authenticate = true;

    inject(function($injector){
      canAccessLauncher = $injector.get('canAccessLauncher');
    });
  });

  it('should exist',function(){
    expect(canAccessLauncher).to.be.truely;
    expect(canAccessLauncher).to.be.a('function');
  });
  
  it('should return resolve if authenticated',function(done){
    canAccessLauncher()
    .then(function(){
      done();
    })
    .then(null, function() {
      done("error");
    });
  });
  
  it('should reject if user is not Rise Vision User',function(done){
    isRiseVisionUser = false;
    authenticate = true;

    canAccessLauncher()
    .then(function() {
      done("authenticated");
    })
    .then(null, function() {
      expect(newState).to.equal('apps.launcher.unauthorized');
      
      done();
    });  
  });
  
  it('should reject if user is not authenticated',function(done){
    isRiseVisionUser = true;
    authenticate = false;

    canAccessLauncher()
    .then(function() {
      done("authenticated");
    })
    .then(null, function() {
      expect(newState).to.equal('apps.launcher.unauthorized');
      
      done();
    });  
  });

});
