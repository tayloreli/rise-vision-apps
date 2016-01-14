'use strict';
angular.module('risevision.editor.controllers')
  .controller('storeProductsModal', ['$scope', 'ScrollingListService',
    'store', '$modalInstance', '$loading', '$filter', 'STORE_URL', 'category',
    '$modal', 'storeAuthorization', 'playlistItemFactory',
    function ($scope, ScrollingListService, store, $modalInstance, $loading,
      $filter, STORE_URL, category, $modal, storeAuthorization, playlistItemFactory) {
      var defaultCount = 1000;

      $scope.search = {
        category: category,
        count: defaultCount
      };

      $scope.storeUrl = STORE_URL;
      $scope.factory = new ScrollingListService(store.product.list,
        $scope.search);

      $scope.filterConfig = {
        placeholder: 'Search Products',
        id: 'storeProductsSearchInput'
      };

      $scope.$watch('factory.loadingItems', function (loading) {
        if (loading) {
          $loading.start('product-list-loader');
        } else {
          $loading.stop('product-list-loader');
        }
      });

      $scope.select = function (product) {
        if (category === 'Templates' && product.paymentTerms.toLowerCase() !==
          'free') {
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

      $scope.addWidgetByUrl = function() {
        $modalInstance.dismiss();
        playlistItemFactory.addWidgetByUrl();
      };

      $scope.dismiss = function () {
        $modalInstance.dismiss();
      };
    }
  ]);
