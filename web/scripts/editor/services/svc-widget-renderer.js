'use strict';

angular.module('risevision.editor.services')
  .value('IFRAME_PREFIX', 'if_')
  .value('RENDER_WIDGETS', [
    'ba0da120-7c67-437f-9caf-73585bd30c74',
    '64cc543c-c2c6-49ab-a4e9-40ceba48a253'
  ])
  .factory('widgetRenderer', ['gadgetsApi', '$window', 'IFRAME_PREFIX',
    'RENDER_WIDGETS', 'userState',
    function (gadgetsApi, $window, IFRAME_PREFIX, RENDER_WIDGETS, userState) {
      var factory = {};

      factory._placeholders = {};

      var _isRenderingAllowed = function(objectReference) {
        return RENDER_WIDGETS.indexOf(objectReference) !== -1;
      }

      factory.register = function (placeholder, element) {
        if (placeholder.items && placeholder.items[0] && _isRenderingAllowed(placeholder.items[0].objectReference)) {
          factory._placeholders[placeholder.id] = placeholder;
          _createIframe(placeholder, element);
        }
      };

      factory.unregister = function (placeholder, element) {
        delete factory._placeholders[placeholder.id];
        var frameName = IFRAME_PREFIX + placeholder.id;
        gadgetsApi.rpc.removeReceiver(frameName);
        element.find('#' + frameName).remove();
      };

      factory.notifyResize = function (placeholder, element) {
        if (factory._placeholders[placeholder.id]) {
          factory.unregister(placeholder, element);
          factory.register(placeholder, element);
        }
      };

      factory.notifyChanges = function (placeholder, element) {
        if (factory._placeholders[placeholder.id]) {
          if (!placeholder.items || !placeholder.items[0] || !_isRenderingAllowed(placeholder.items[0].objectReference)) {
            factory.unregister(placeholder, element);
          } else {
            gadgetsApi.rpc.call(IFRAME_PREFIX + placeholder.id,
              'rsparam_set_' +
              placeholder.id, null, 'additionalParams', placeholder.items[
                0].additionalParams);
          }
        } else {
          factory.register(placeholder, element);
        }
      };

      var _createIframe = function (placeholder, element) {
        var renderId = placeholder.id;
        var widgetUrl = placeholder.items[0].objectData +
          '?up_id=' + renderId +
          '&up_companyId=' + userState.getSelectedCompanyId() +
          '&up_rsW=' + placeholder.width +
          '&up_rsH=' + placeholder.height +
          '&parent=' + encodeURIComponent($window.location.origin);

        widgetUrl = widgetUrl
          .replace('http://', '//')
          .replace('https://', '//');

        var frameName = IFRAME_PREFIX + renderId;
        var myFrame = document.createElement('iFrame');
        myFrame.setAttribute('id', frameName);
        myFrame.setAttribute('name', frameName);
        myFrame.style.width = '100%';
        myFrame.style.height = '100%';
        myFrame.setAttribute('allowTransparency', true);
        myFrame.setAttribute('frameBorder', '0');
        myFrame.setAttribute('scrolling', 'no');
        element.append(myFrame);
        var myFrameObj = (myFrame.contentWindow) ? myFrame.contentWindow :
          (myFrame.contentDocument.document) ? myFrame.contentDocument.document :
          myFrame.contentDocument;
        myFrame.src = widgetUrl;

        myFrameObj.onload = (function () {
          gadgetsApi.rpc.setupReceiver(frameName);
        })();
      };

      gadgetsApi.rpc.register('rsevent_ready', function () {
        //Register to avoid error messages. Doing nothing for now.
      });

      gadgetsApi.rpc.register('rsparam_get', function (id, param) {
        var value;
        if (typeof (param) === 'string') {
          value = getParam(param, id);
        } else if (param.length) {
          value = [];
          for (var i = 0; i < param.length; i++) {
            value[i] = getParam(param[i], id);
          }
        }
        gadgetsApi.rpc.call(IFRAME_PREFIX + id, 'rsparam_set_' + id, null,
          param,
          value);
      });

      var getParam = function (paramName, id) {
        if (paramName === 'additionalParams') {
          return factory._placeholders[id].items[0].additionalParams;
        } else {
          return '';
        }
      };

      return factory;
    }
  ]);
