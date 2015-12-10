'use strict';
describe('service: access:', function() {
  beforeEach(module('risevision.displays.services'));

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
  }));
  
  var canAccessDisplays, authenticate, isRiseVisionUser;
  beforeEach(function(){
    isRiseVisionUser = true;
    authenticate = true;

    inject(function($injector){
      canAccessDisplays = $injector.get('canAccessDisplays');
    });
  });

  it('should exist',function(){
    expect(canAccessDisplays).to.be.truely;
    expect(canAccessDisplays).to.be.a('function');
  });
  
  it('should return resolve if authenticated',function(done){
    canAccessDisplays()
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

    canAccessDisplays()
    .then(function() {
      done("authenticated");
    })
    .then(null, function() {
      done();
    });  
  });
  
  it('should reject if user is not authenticated',function(done){
    isRiseVisionUser = true;
    authenticate = false;

    canAccessDisplays()
    .then(function() {
      done("authenticated");
    })
    .then(null, function() {
      done();
    });  
  });

});
