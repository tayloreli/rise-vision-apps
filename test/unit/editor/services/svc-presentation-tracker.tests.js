'use strict';
describe('service: presentation tracker:', function() {
  beforeEach(module('risevision.editor.services'));

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
  
  var presentationTracker, eventName, eventData;
  beforeEach(function(){
    eventName = undefined;
    eventData = undefined;
    inject(function($injector){
      presentationTracker = $injector.get('presentationTracker');
    });
  });

  it('should exist',function(){
    expect(presentationTracker).to.be.truely;
    expect(presentationTracker).to.be.a('function');
  });
  
  it('should call segment analytics service',function(){
    presentationTracker('Presentation Updated', 'presentationId', 'presentationName');

    expect(eventName).to.equal('Presentation Updated');
    expect(eventData).to.deep.equal({presentationId: 'presentationId', presentationName: 'presentationName', companyId: 'companyId'});
  });

  it('should not call segment w/ blank event',function(){
    presentationTracker();

    expect(eventName).to.not.be.ok;
    expect(eventData).to.not.be.ok;
  });


});
