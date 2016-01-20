'use strict';
describe('service: display tracker:', function() {
  beforeEach(module('risevision.displays.services'));

  beforeEach(module(function ($provide) {
    $provide.service('$q', function() {return Q;});
    $provide.service('userState',function(){
      return {
        getSelectedCompanyId: function() {
          return "companyId";
        }, 
        _restoreState: function(){}
      }
    });
    $provide.service('segmentAnalytics',function(){
      return {
        track: function(newEventName, newEventData) {
          eventName = newEventName;
          eventData = newEventData;
        }, 
        load: function(){}
      }
    });
  }));
  
  var displayTracker, eventName, eventData;
  beforeEach(function(){
    eventName = undefined;
    eventData = undefined;
    inject(function($injector){
      displayTracker = $injector.get('displayTracker');
    });
  });

  it('should exist',function(){
    expect(displayTracker).to.be.truely;
    expect(displayTracker).to.be.a('function');
  });
  
  it('should call segment analytics service',function(){
    displayTracker('Display Updated', 'displayId', 'displayName', 'downloadType');

    expect(eventName).to.equal('Display Updated');
    expect(eventData).to.deep.equal({displayId: 'displayId', displayName: 'displayName', companyId: 'companyId', downloadType: 'downloadType'});
  });

  it('should not call segment w/ blank event',function(){
    displayTracker();

    expect(eventName).to.not.be.ok;
    expect(eventData).to.not.be.ok;
  });


});
