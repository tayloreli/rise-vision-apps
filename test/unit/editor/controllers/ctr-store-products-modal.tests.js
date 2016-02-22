'use strict';
describe('controller: Store Products Modal', function() {
  beforeEach(module('risevision.editor.controllers'));
  beforeEach(module('risevision.editor.services'));
  beforeEach(module(mockTranlate()));
  beforeEach(module(function ($provide) {
    $provide.value('STORE_AUTHORIZATION_URL','http://www.example.com/api/auth')
    $provide.service('ScrollingListService', function() {
      return function() {
        return scrollingListService
      };
    });
    $provide.service('store',function(){
      return {
        product: {
          list : function(){
          }
        }
      }
    });
    $provide.service('$loading',function(){
      return {
        start : function(spinnerKeys){
          return;
        },
        stop : function(spinnerKeys){
          return;
        }
      }
    });
    $provide.service('$modalInstance',function(){
      return {
        close : function(){
          return;
        },
        dismiss : function(action){
          return;
        }
      }
    });
    $provide.value('category', 'Templates');
    $provide.service('$modal',function(){
      return {
        open: function(func){
          return {
            result:{
              then:function(func){
                expect(func).to.be.a('function');
                func();
              }
            }
          }
        }
      };
    });
    $provide.service('playlistItemFactory',function(){
      return {
        addWidgetByUrl : function(){}
      }
    });
  }));
  
  var $scope, $loading, $loadingStartSpy, $loadingStopSpy;
  var $modalInstance, $modalInstanceDismissSpy, $modalInstanceCloseSpy, $q;
  var $modal, playlistItemAddWidgetByUrlSpy, scrollingListService;
  beforeEach(function(){
    scrollingListService = {
      search: {},
      loadingItems: false,
      doSearch: function() {}
    };

    inject(function($injector,$rootScope, $controller){
      $scope = $rootScope.$new();
      $modalInstance = $injector.get('$modalInstance');
      $q = $injector.get('$q');
      $modal = $injector.get('$modal');
      $modalInstanceDismissSpy = sinon.spy($modalInstance, 'dismiss');
      $modalInstanceCloseSpy = sinon.spy($modalInstance, 'close');
      var playlistItemFactory = $injector.get('playlistItemFactory');
      playlistItemAddWidgetByUrlSpy = sinon.spy(playlistItemFactory, 'addWidgetByUrl');
      $loading = $injector.get('$loading');
      $loadingStartSpy = sinon.spy($loading, 'start');
      $loadingStopSpy = sinon.spy($loading, 'stop');
      $controller('storeProductsModal', {
        $scope : $scope,
        $rootScope: $rootScope,
        $modalInstance : $modalInstance,
        store: $injector.get('store'),
        category: $injector.get('category'),
        ScrollingListService: $injector.get('ScrollingListService'),
        $loading: $loading
      });
      $scope.$digest();
    });
  });

  it('should exist',function(){
    expect($scope).to.be.ok;
    
    expect($scope.factory).to.be.ok;
    expect($scope.factory.loadingItems).to.be.false;
    expect($scope.search).to.be.ok;
    expect($scope.filterConfig).to.be.ok;
    expect($scope.selectProductTag).to.be.ok;

    expect($scope.select).to.be.a('function');
    expect($scope.dismiss).to.be.a('function');
    expect($scope.addWidgetByUrl).to.be.a('function');
  });

  it('should init the scope objects',function(){
    expect($scope.search).to.be.ok;
    expect($scope.search).to.have.property('category');
    expect($scope.search.count).to.equal(1000);
  });


  describe('$loading: ', function() {
    it('should stop spinner', function() {
      $loadingStopSpy.should.have.been.calledWith('product-list-loader');
    });
    
    it('should start spinner', function(done) {
      $scope.factory.loadingItems = true;
      $scope.$digest();
      setTimeout(function() {
        $loadingStartSpy.should.have.been.calledWith('product-list-loader');
        
        done();
      }, 10);
    });
  });

  describe('selectProductTag', function() {
    var doSearchSpy;
    beforeEach(function() {
      doSearchSpy = sinon.spy(scrollingListService, 'doSearch');
    });
    
    it('should select appropriate tag', function() {
      $scope.selectProductTag('education');
      
      expect($scope.search.productTag).to.equal('education');
      doSearchSpy.should.have.been.called;
    });
    
    it('should select all tag', function() {
      $scope.search.productTag = 'education';
      
      $scope.selectProductTag('all');
      
      expect($scope.search.productTag).to.be.undefined;
      doSearchSpy.should.have.been.called;
    });
    
    it('should not call API twice for all', function() {
      $scope.search.productTag = undefined;

      $scope.selectProductTag('all');
      
      expect($scope.search.productTag).to.be.undefined;
      doSearchSpy.should.not.have.been.called;
    });
    
    it('should not call API twice for the same category', function() {
      $scope.search.productTag = 'education';

      $scope.selectProductTag('education');
      
      expect($scope.search.productTag).to.equal('education');
      doSearchSpy.should.not.have.been.called;
    });
  })

  describe('$modalInstance functionality: ', function() {
    it('should exist',function(){
      expect($scope).to.be.truely;
      
      expect($scope.select).to.be.a('function');
      expect($scope.dismiss).to.be.a('function');
    });

    it('select: should close modal when clicked on a product',function(){
      var product = {paymentTerms: 'free'};
      $scope.select(product);

      $modalInstanceCloseSpy.should.have.been.calledWith(product);
    });

    it('should dismiss modal when clicked on close with no action',function(){
      $scope.dismiss();

      $modalInstanceDismissSpy.should.have.been.called;
    });

    it('should dismiss modal and open add WidgetByUrl modal',function(){
      $scope.addWidgetByUrl();

      $modalInstanceDismissSpy.should.have.been.called;
      playlistItemAddWidgetByUrlSpy.should.have.been.called;
    })
  });

});
