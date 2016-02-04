'use strict';
angular.module('risevision.editor.controllers')
  .constant('TEMPLATES_CATEGORY', 'Templates')
  .constant('TEMPLATE_PRODUCT_TAGS', [
    'all',
    'education',
    'business',
    'lifestyle',
    'worship',
    'healthcare',
    'hospitality',
    'retail',
    'other'
  ])
  .controller('storeProductsModal', ['$scope', 'ScrollingListService',
    'store', '$modalInstance', '$loading', '$filter', 'STORE_URL', 'category',
    '$modal', 'storeAuthorization', 'playlistItemFactory',
    'TEMPLATE_PRODUCT_TAGS', 'TEMPLATES_CATEGORY', 'presentationTracker',
    function ($scope, ScrollingListService, store, $modalInstance, $loading,
      $filter, STORE_URL, category, $modal, storeAuthorization,
      playlistItemFactory, TEMPLATE_PRODUCT_TAGS, TEMPLATES_CATEGORY,
      presentationTracker) {
      var defaultCount = 1000;
      $scope.presentationTracker = presentationTracker;

      $scope.productTags = TEMPLATE_PRODUCT_TAGS;

      $scope.search = {
        category: category,
        count: defaultCount
      };

      $scope.storeUrl = STORE_URL;
      $scope.factory = new ScrollingListService(store.product.list,
        $scope.search);

      $scope.filterConfig = {
        placeholder: $filter('translate')(
          'editor-app.storeProduct.' + (category === TEMPLATES_CATEGORY ?
            'templates' : 'content') + '.search'),
        id: 'storeProductsSearchInput'
      };

      $scope.$watch('factory.loadingItems', function (loading) {
        if (loading) {
          $loading.start('product-list-loader');
        } else {
          $loading.stop('product-list-loader');
        }
      });

      $scope.selectProductTag = function (tag) {
        if (tag !== $scope.search.productTag && !(!$scope.search.productTag &&
            tag === 'all')) {
          $scope.search.productTag = tag === 'all' ? undefined : tag;

          $scope.factory.doSearch();
        }
      };

      $scope.select = function (product) {
        if (category === TEMPLATES_CATEGORY &&
          product.paymentTerms.toLowerCase() !== 'free') {
          $loading.start('product-list-loader');
          storeAuthorization.check(product.productCode).then(function () {
            $modalInstance.close(product);
          }, function () {
            var goToStoreModalInstance = $modal.open({
              templateUrl: 'partials/editor/go-to-store-modal.html',
              size: 'md',
              controller: 'GoToStoreModalController',
              resolve: {
                product: function () {
                  return product;
                }
              }
            });
            goToStoreModalInstance.result.then(function () {
              $modalInstance.dismiss();
            });
          }).finally(function () {
            $loading.stop('product-list-loader');
          });
        } else {
          $modalInstance.close(product);
        }
      };

      $scope.addWidgetByUrl = function () {
        $modalInstance.dismiss();
        playlistItemFactory.addWidgetByUrl();
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);
