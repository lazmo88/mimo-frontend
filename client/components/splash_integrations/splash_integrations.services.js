'use strict';

var app = angular.module('myApp.splash_integrations.services', ['ngResource',]);

app.factory('SplashIntegration', ['$resource', '$localStorage', 'API_END_POINT',
  function($resource, $localStorage, API_END_POINT){
    return $resource(API_END_POINT + '/locations/:location_id/splash_integrations/:id',
      {
        location_id: '@location_id',
        id: '@id',
        splash_integration: '@splash_integration'
      },
      {
      query: {
        method: 'GET',
        isArray: false,
        dataType: 'json',
        params: {
        }
      },
      create: {
        method: 'POST',
        isArray: false,
        params: {
          location_id: '@location_id',
          splash_integration: '@splash_integration'
        }
      },
      update: {
        method: 'PATCH',
        isArray: false,
        params: {
          location_id: '@location_id',
          id: '@id',
          splash_integration: '@splash_integration'
        }
      },
      destroy: {
        method: 'DELETE',
        isArray: false
      },
      integration_action: {
        method: 'GET',
        isArray: true,
        dataType: 'json',
        params: {
          action: '@action'
        }
      }
    });
  }]);
