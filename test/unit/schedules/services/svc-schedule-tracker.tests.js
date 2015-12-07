'use strict';
describe('service: schedule tracker:', function() {
  beforeEach(module('risevision.schedules.services'));

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
  
  var scheduleTracker, eventName, eventData;
  beforeEach(function(){
    eventName = undefined;
    eventData = undefined;
    inject(function($injector){
      scheduleTracker = $injector.get('scheduleTracker');
    });
  });

  it('should exist',function(){
    expect(scheduleTracker).to.be.truely;
    expect(scheduleTracker).to.be.a('function');
  });
  
  it('should call segment analytics service',function(){
    scheduleTracker('Schedule Updated', 'scheduleId', 'scheduleName');

    expect(eventName).to.equal('Schedule Updated');
    expect(eventData).to.deep.equal({scheduleId: 'scheduleId', scheduleName: 'scheduleName', companyId: 'companyId'});
  });

  it('should not call segment w/ blank event',function(){
    scheduleTracker();

    expect(eventName).to.not.be.ok;
    expect(eventData).to.not.be.ok;
  });


});
