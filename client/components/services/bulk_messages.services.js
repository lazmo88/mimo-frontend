'use strict';

var app = angular.module('myApp.bulk_messages.services', ['ngResource',]);

app.factory('BulkMessage', ['$resource', 'API_END_POINT',
  function($resource, API_END_POINT){
    return $resource(API_END_POINT + '/locations/:location_id/bulk_messages/:message_id',
      {
        person_id: '@person_id',
        location_id: '@location_id',
        q: '@q',
        message_id: '@message_id'
      },
      {
      create: {
        method: 'POST',
        isArray: false,
        dataType: 'json'
      },
      index: {
        method: 'GET',
        isArray: false,
        dataType: 'json'
      },
      show: {
        method: 'GET',
        isArray: false,
        dataType: 'json'
      },
    });
  }]);
