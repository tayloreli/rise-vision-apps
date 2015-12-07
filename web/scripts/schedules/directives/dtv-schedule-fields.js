'use strict';

angular.module('risevision.schedules.directives')
  .directive('scheduleFields', ['$modal', 'scheduleFactory', 'playlistFactory',
    'scheduleTracker',
    function ($modal, scheduleFactory, playlistFactory, scheduleTracker) {
      return {
        restrict: 'E',
        templateUrl: 'partials/schedules/schedule-fields.html',
        link: function ($scope) {
            $scope.previewUrl = scheduleFactory.getPreviewUrl();
            $scope.scheduleTracker = scheduleTracker;

            var openPlaylistModal = function (playlistItem) {
              $modal.open({
                templateUrl: 'partials/schedules/playlist-item.html',
                controller: 'playlistItemModal',
                size: 'md',
                resolve: {
                  playlistItem: function () {
                    return playlistItem;
                  }
                }
              });
            };

            $scope.addUrlItem = function () {
              scheduleTracker('Add URL Item to Schedule', scheduleFactory.schedule
                .id, scheduleFactory.schedule.name);
              openPlaylistModal(playlistFactory.getNewUrlItem());
            };

            $scope.addPresentationItem = function () {
              scheduleTracker('Add Presentation to Schedule',
                scheduleFactory.schedule.id, scheduleFactory.schedule.name
              );
              var modalInstance = $modal.open({
                templateUrl: 'presentation-selector/presentation-modal.html',
                controller: 'selectPresentationModal',
                resolve: {
                  playlistItem: playlistFactory.getNewPresentationItem
                }
              });

              modalInstance.result.then(function (presentationDetails) {
                var playlistItem = playlistFactory.getNewPresentationItem();
                playlistItem.objectReference = presentationDetails[0];
                playlistItem.name = presentationDetails[1];

                openPlaylistModal(playlistItem);
              });
            };

          } //link()
      };
    }
  ]);
