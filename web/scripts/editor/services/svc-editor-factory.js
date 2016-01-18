'use strict';

angular.module('risevision.editor.services')
  .value('REVISION_STATUS_PUBLISHED', 'Published')
  .value('REVISION_STATUS_REVISED', 'Revised')
  /*jshint multistr: true */
  .value('DEFAULT_LAYOUT',
    '\
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">\n\
<html>\n\
\t<head>\n\
\t\t<meta http-equiv="content-type" content="text/html; charset=UTF-8">\n\
\t\t<title></title>\n\
\t</head>\n\
\n\
\t<body style="width:1920px;height:1080px; margin: 0; overflow: hidden;" >\n\
\t</body>\n\
</html>\n'
  )
  .factory('editorFactory', ['$q', '$state', 'userState', 'presentation',
    'presentationParser', 'distributionParser', 'presentationTracker',
    'VIEWER_URL', 'REVISION_STATUS_REVISED', 'REVISION_STATUS_PUBLISHED',
    'DEFAULT_LAYOUT', '$modal', '$rootScope', '$window',
    function ($q, $state, userState, presentation, presentationParser,
      distributionParser, presentationTracker, VIEWER_URL,
      REVISION_STATUS_REVISED, REVISION_STATUS_PUBLISHED, DEFAULT_LAYOUT,
      $modal, $rootScope, $window) {
      var factory = {};

      factory.openPresentationProperties = function () {
        $modal.open({
          templateUrl: 'partials/editor/presentation-properties-modal.html',
          size: 'md',
          controller: 'PresentationPropertiesModalController'
        });
      };

      var _clearMessages = function () {
        factory.loadingPresentation = false;
        factory.savingPresentation = false;

        factory.errorMessage = '';
        factory.apiError = '';
      };

      factory.newPresentation = function () {
        factory.presentation = {
          layout: DEFAULT_LAYOUT
        };
        factory.hasLegacyItems = false;
        presentationParser.parsePresentation(factory.presentation);

        _clearMessages();
      };

      factory.newPresentation();

      var _updatePresentation = function (presentation) {
        factory.presentation = presentation;

        presentationParser.parsePresentation(factory.presentation);
        distributionParser.parseDistribution(factory.presentation);

        factory.hasLegacyItems = presentationParser.hasLegacyItems;
        $rootScope.$broadcast('presentationUpdated');
      };

      factory.getPresentation = function (presentationId) {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.get(presentationId)
          .then(function (result) {
            _updatePresentation(result.item);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('get', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });

        return deferred.promise;
      };

      var _arrayContains = function (items, obj) {
        var i = items.length;
        while (i--) {
          if (items[i] === obj) {
            return true;
          }
        }
        return false;
      };

      var _updateEmbeddedIds = function (presentation) {
        presentation.embeddedIds = [];
        var i = presentation.placeholders && presentation.placeholders.length;

        while (i--) {
          var j = presentation.placeholders[i].items &&
            presentation.placeholders[i].items.length;
          while (j--) {
            var item = presentation.placeholders[i].items[j];
            if (item && item.type === 'presentation' &&
              !_arrayContains(presentation.embeddedIds, item.objectData)) {
              presentation.embeddedIds.push(item.objectData);
            }
          }
        }
      };

      var _parseOrUpdatePresentation = function () {
        if ($state.is('apps.editor.workspace.htmleditor')) {
          presentationParser.parsePresentation(factory.presentation);
        } else {
          presentationParser.updatePresentation(factory.presentation);
        }

        distributionParser.updateDistribution(factory.presentation);

        _updateEmbeddedIds(factory.presentation);
      };

      factory.addPresentation = function () {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;
        factory.savingPresentation = true;

        _parseOrUpdatePresentation();

        presentation.add(factory.presentation)
          .then(function (resp) {
            if (resp && resp.item && resp.item.id) {
              presentationTracker('Presentation Created', resp.item.id,
                resp.item.name);

              $state.go('apps.editor.workspace.artboard', {
                presentationId: resp.item.id
              });

              deferred.resolve(resp.item.id);
            }
          })
          .then(null, function (e) {
            _showErrorMessage('add', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
            factory.savingPresentation = false;
          });

        return deferred.promise;
      };

      factory.updatePresentation = function () {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;
        factory.savingPresentation = true;

        _parseOrUpdatePresentation();

        presentation.update(factory.presentation.id, factory.presentation)
          .then(function (resp) {
            presentationTracker('Presentation Updated', resp.item.id,
              resp.item.name);

            _updatePresentation(resp.item);

            deferred.resolve(resp.item.id);
          })
          .then(null, function (e) {
            _showErrorMessage('update', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
            factory.savingPresentation = false;
          });

        return deferred.promise;
      };

      factory.save = function () {
        presentationTracker('Save Presentation', factory.presentation.id,
          factory.presentation.name);
        if (factory.presentation.id) {
          return factory.updatePresentation();
        } else {
          return factory.addPresentation();
        }
      };

      factory.deletePresentation = function () {
        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.delete(factory.presentation.id)
          .then(function () {
            presentationTracker('Presentation Deleted',
              factory.presentation.id, factory.presentation.name);

            factory.presentation = {};

            $state.go('apps.editor.list');
          })
          .then(null, function (e) {
            _showErrorMessage('delete', e);
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });
      };

      factory.isRevised = function () {
        return factory.presentation.revisionStatusName ===
          REVISION_STATUS_REVISED;
      };

      factory.publishPresentation = function () {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;
        factory.savingPresentation = true;

        presentation.publish(factory.presentation.id)
          .then(function (presentationId) {
            presentationTracker('Presentation Published',
              factory.presentation.id, factory.presentation.name);

            factory.presentation.revisionStatusName =
              REVISION_STATUS_PUBLISHED;
            factory.presentation.changeDate = new Date();
            factory.presentation.changedBy = userState.getUsername();

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('publish', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
            factory.savingPresentation = false;
          });

        return deferred.promise;
      };

      factory.restorePresentation = function (presentationId) {
        var deferred = $q.defer();

        _clearMessages();

        //show loading spinner
        factory.loadingPresentation = true;

        presentation.restore(factory.presentation.id)
          .then(function (result) {
            presentationTracker('Presentation Restored',
              factory.presentation.id, factory.presentation.name);

            _updatePresentation(result.item);

            deferred.resolve();
          })
          .then(null, function (e) {
            _showErrorMessage('restore', e);

            deferred.reject();
          })
          .finally(function () {
            factory.loadingPresentation = false;
          });

        return deferred.promise;
      };

      factory.copyPresentation = function () {
        presentationTracker('Presentation Copied', factory.presentation.id,
          factory.presentation.name);

        factory.presentation.id = undefined;
        factory.presentation.name = 'Copy of ' + factory.presentation.name;
        factory.presentation.revisionStatusName = undefined;

        $state.go('apps.editor.workspace.artboard', {
          presentationId: undefined,
          copyPresentation: true
        }, {
          reload: true
        });
      };

      factory.newCopyOf = function (presentationId) {
        factory.getPresentation(presentationId)
          .then(factory.copyPresentation);
      };

      factory.addFromTemplate = function () {
        presentationTracker('Add Presentation From Template');
        var modalInstance = $modal.open({
          templateUrl: 'partials/editor/store-products-modal.html',
          size: 'lg',
          controller: 'storeProductsModal',
          resolve: {
            category: function () {
              return 'Templates';
            }
          }
        });

        modalInstance.result.then(function (productDetails) {
          presentationTracker('Template Selected');
          if (!productDetails || !productDetails.rvaEntityId) {
            return;
          }
          factory.newCopyOf(productDetails.rvaEntityId);
        });
      };

      var _getPreviewUrl = function (presentationId) {
        if (presentationId) {
          return VIEWER_URL + '/?type=presentation&id=' + presentationId +
            '&showui=true';
        }
        return null;
      };

      factory.saveAndPreview = function () {
        presentationTracker('Preview Presentation', factory.presentation.id,
          factory.presentation.name);

        $window.open('/loading-preview.html', 'rvPresentationPreview');

        factory.save().then(function (presentationId) {
          $window.open(_getPreviewUrl(presentationId),
            'rvPresentationPreview');
        });
      };

      var _showErrorMessage = function (action, e) {
        factory.errorMessage = 'Failed to ' + action + ' Presentation!';
        factory.apiError = e.result.error.message ? e.result.error.message :
          e.result.error.toString();
      };

      return factory;
    }
  ]);
