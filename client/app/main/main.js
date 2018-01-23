'use strict';

var app = angular.module('myApp', [
  'ngStorage',
  'ngRoute',
  'ngCookies',
  'ngMessages',
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ngAnimate',
  'angularPayments',
  'angularMoment',
  'ngMaterial',
  'md.data.table',
  'luegg.directives',
  'minicolors',
  'pusher-angular',
  'config',
  'gettext',
  'moment-picker',
  'color.picker'
]);

app.config(function($provide) {
    $provide.decorator('ColorPickerOptions', function($delegate) {
        var options = angular.copy($delegate);
        options.required = true;
        options.format = 'rgb';
        return options;
    });
});


app.config(['$compileProvider', 'DEBUG', function ($compileProvider,DEBUG) {
  $compileProvider.debugInfoEnabled(DEBUG);
}]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(['$mdThemingProvider', 'THEMES', function($mdThemingProvider, THEMES) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('pink');
}]);

app.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

  $httpProvider.interceptors.push('httpRequestInterceptor');

  $httpProvider.defaults.headers.common['Accept'] = 'application/json';

  function loginRequired ($location, $q, AccessToken, $rootScope) {
    var deferred = $q.defer();
    if (! AccessToken.get() ) {
      var logoutEvent = 'logout';
      var logoutArgs = ['arg'];
      $rootScope.$broadcast(logoutEvent, logoutArgs);
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }
  loginRequired.$inject = ['$location', '$q', 'AccessToken', '$rootScope' ];

  var loggedIn = function($location, $q, AccessToken) {
    var deferred = $q.defer();
    if (AccessToken.get() === undefined) {
      deferred.resolve();
    } else {
      $location.path('/');
      deferred.reject();
    }
    return deferred.promise;
  };

  $routeProvider.
    when('/', {
      // templateUrl: 'components/locations/index/list.html',
      // templateUrl: 'components/locations/index/index.html',
      templateUrl: 'components/home/hello.html',
      controller: 'HomeCtrl'
    }).
    when('/404', {
      templateUrl: 'components/home/404.html',
    }).
    when('/login', {
      controller: 'AuthenticationsController',
      templateUrl: 'components/home/hello.html',
    }).
    when('/register', {
      templateUrl: 'components/registrations/index.html',
      resolve: { loggedIn: loggedIn }
    }).
    when('/create', {
      templateUrl: 'components/registrations/create.html',
      resolve: { loggedIn: loggedIn }
    }).
    when('/success', {
      templateUrl: 'components/registrations/success.html',
    }).
    when('/create/:id', {
      templateUrl: 'components/registrations/flow.html',
      resolve: { loggedIn: loggedIn }
    }).
    when('/new-location', {
      templateUrl: 'components/locations/new/index.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/locations/:id', {
      redirectTo: '/:id'
    }).
    when('/:id', {
      templateUrl: 'components/locations/people/index.html',
      resolve: { loginRequired: loginRequired },
      controller: 'LocationsCtrl as lc'
    }).
    when('/:id/guide', {
      templateUrl: 'components/locations/welcome/index.html',
      resolve: { loginRequired: loginRequired },
      controller: 'LocationsCtrl as lc'
    }).
    when('/:id/integration', {
      templateUrl: 'components/locations/new/integration.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/unifi/auth', {
      templateUrl: 'components/locations/new/unifi_auth.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/unifi/setup', {
      templateUrl: 'components/locations/new/unifi_setup.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/vsz/auth', {
      templateUrl: 'components/locations/new/vsz_auth.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/vsz/setup', {
      templateUrl: 'components/locations/new/vsz_setup.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/meraki/auth', {
      templateUrl: 'components/locations/new/meraki_auth.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/meraki/setup', {
      templateUrl: 'components/locations/new/meraki_setup.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/integration/completed', {
      templateUrl: 'components/locations/new/integration_complete.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/devices', {
      templateUrl: 'components/locations/show/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired },
      reloadOnSearch: false
    }).
    // when('/:id/map', {
    //   templateUrl: 'components/locations/show/map.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired },
    // }).
    // when('/:id/clients', {
    //   templateUrl: 'components/locations/clients/index.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/:id/clients/:client_id', {
    //   templateUrl: 'components/locations/clients/show.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    //   reloadOnSearch: false,
    // }).
    // when('/locations/:id/clients/:client_id/codes', {
    //   templateUrl: 'components/locations/clients/codes.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/locations/:id/clients/:client_id/codes/:username', {
    //   templateUrl: 'components/locations/clients/show_code.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/locations/:id/clients/:client_id/codes/:username/sessions', {
    //   templateUrl: 'components/locations/clients/sessions.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/locations/:id/clients/:client_id/orders/:order_id', {
    //   templateUrl: 'components/locations/clients/show_order.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/locations/:id/clients/:client_id/social/:social_id', {
    //   templateUrl: 'components/locations/clients/social.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/locations/:id/clients/:client_id/sessions', {
    //   templateUrl: 'components/locations/clients/sessions.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    // when('/locations/:id/group_policies', {
    //   templateUrl: 'components/views/group_policies/index.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    // when('/locations/:id/group_policies/:group_policy_id', {
    //   templateUrl: 'components/views/group_policies/show.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    // when('/locations/:id/group_policies/:group_policy_id/clients', {
    //   templateUrl: 'components/views/group_policies/clients.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    when('/:id/campaigns', {
      templateUrl: 'components/campaigns/index/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/campaigns/new', {
      templateUrl: 'components/campaigns/edit/edit.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/campaigns/guide', {
      templateUrl: 'components/campaigns/guide.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/campaigns/:campaign_id', {
      templateUrl: 'components/campaigns/edit/edit.html',
      resolve: { loginRequired: loginRequired },
      controller: 'LocationsCtrl as lc',
    }).
    // when('/:id/triggers/:trigger_id/trigger_history', {
    //   templateUrl: 'components/views/triggers/history/index.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    // when('/locations/:id/triggers/:trigger_id/trigger_history/:trigger_history_id', {
    //   templateUrl: 'components/views/triggers/history/show.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    when('/:id/users', {
      templateUrl: 'components/locations/users/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/settings', {
      templateUrl: 'components/locations/settings/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/settings/notifications', {
      templateUrl: 'components/locations/settings/notifications.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/settings/integration', {
      templateUrl: 'components/locations/settings/integration.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/settings/device_list', {
      templateUrl: 'components/locations/show/_index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    // when('/:id/settings/security', {
    //   templateUrl: 'components/locations/settings/security.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    when('/:id/settings/devices', {
      templateUrl: 'components/locations/settings/devices.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/settings/splash', {
      templateUrl: 'components/locations/settings/splash.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/settings/analytics', {
      templateUrl: 'components/locations/settings/analytics.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/versions', {
      templateUrl: 'components/locations/versions/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    // when('/:id/logs', {
    //   templateUrl: 'components/locations/logging/index.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    // when('/locations/:id/networks', {
    //   templateUrl: 'components/locations/networks/index.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    // when('/locations/:id/zones', {
    //   templateUrl: 'components/zones/index.html',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired },
    //   reloadOnSearch: false,
    // }).
    // when('/locations/:id/zones/:zone_id', {
    //   templateUrl: 'components/zones/show.html',
    //   // controller: 'ZonesCtrlShow',
    //   controller: 'LocationsCtrl as lc',
    //   resolve: { loginRequired: loginRequired }
    // }).
    // when('/locations/:id/networks/:network_id', {
    //   templateUrl: 'components/locations/networks/show.html',
    //   resolve: { loginRequired: loginRequired },
    //   controller: 'LocationsCtrl as lc',
    // }).
    when('/:id/splash_codes', {
      controller: 'LocationsCtrl as lc',
      templateUrl: 'components/splash_codes/index.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_codes/new', {
      templateUrl: 'components/splash_codes/new.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_codes/:splash_code_id', {
      controller: 'LocationsCtrl as lc',
      templateUrl: 'components/splash_codes/show.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_codes/:splash_code_id/sessions/:username', {
      controller: 'LocationsCtrl as lc',
      templateUrl: 'components/splash_codes/sessions.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_pages', {
      controller: 'LocationsCtrl as lc',
      templateUrl: 'components/splash_pages/index.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_pages/guide', {
      controller: 'LocationsCtrl as lc',
      templateUrl: 'components/splash_pages/guide.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_pages/:splash_page_id/design', {
      templateUrl: 'components/splash_pages/design.html',
      controller: 'SplashPagesDesignCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_pages/:splash_page_id/store', {
      templateUrl: 'components/splash_pages/store.html',
      reloadOnSearch: false,
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_pages/:splash_page_id/forms', {
      templateUrl: 'components/splash_pages/forms.html',
      reloadOnSearch: false,
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/splash_pages/:splash_page_id', {
      templateUrl: 'components/splash_pages/show.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    // when('/downloads', {
    //   templateUrl: 'components/downloads/index.html',
    //   resolve: { loginRequired: loginRequired },
    // }).
    // when('/locations/:id/boxes/new', {
    //   redirectTo: '/locations/:id/devices/new'
    // }).
    when('/:id/devices/new', {
      templateUrl: 'components/boxes/new/index.html',
      resolve: { loginRequired: loginRequired },
      controller: 'LocationsCtrl as lc',
    }).
    when('/:id/boxes/:box_id', {
      redirectTo: '/locations/:id/devices/:box_id',
    }).
    when('/:id/devices/:box_id', {
      templateUrl: 'components/boxes/show/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired },
      reloadOnSearch: false,
    }).
    when('/:id/boxes/:box_id/edit', {
      redirectTo: '/locations/:id/devices/:box_id/edit',
    }).
    when('/:id/devices/:box_id/edit', {
      templateUrl: 'components/boxes/edit/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/audit', {
      templateUrl: 'components/locations/audit/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/people', {
      templateUrl: 'components/locations/people/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/people/messages', {
      templateUrl: 'components/views/bulk_messages/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/people/message_activity', {
      templateUrl: 'components/views/bulk_message_activity/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/people/:person_id', {
      templateUrl: 'components/locations/people/show.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/people/:person_slug/messages', {
      templateUrl: 'components/views/bulk_messages/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/people/:person_slug/message_activity', {
      templateUrl: 'components/views/bulk_message_activity/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/me', {
      templateUrl: 'components/users/show/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/splash_views', {
      templateUrl: 'components/users/splash_views/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/billing', {
      templateUrl: 'components/users/billing/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/invoices', {
      templateUrl: 'components/users/invoices/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/me/inventory', {
      templateUrl: 'components/users/inventories/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/inventory', {
      templateUrl: 'components/users/inventories/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/invoices/:invoice_id', {
      templateUrl: 'components/users/invoices/show.html',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/invoices/:invoice_id/details', {
      templateUrl: 'components/users/invoices/details.html',
      // controller: 'InvoicesShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/me/integrations/:id', {
      templateUrl: 'components/users/integrations/setup.html',
      controller: 'UsersIntegrationsController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/me/integrations', {
      templateUrl: 'components/users/integrations/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/alerts', {
      templateUrl: 'components/users/alerts/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/integrations', {
      templateUrl: 'components/users/integrations/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/users', {
      templateUrl: 'components/users/users/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/usage', {
      templateUrl: 'components/users/usage/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/history', {
      templateUrl: 'components/users/history/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/users/:id/quotas', {
      templateUrl: 'components/users/quotas/index.html',
      controller: 'UsersShowController',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/vouchers', {
      templateUrl: 'components/vouchers/index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired },
      // reloadOnSearch: false
    }).
    when('/:id/vouchers/new', {
      templateUrl: 'components/vouchers/new.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/vouchers/:voucher_id/edit', {
      templateUrl: 'components/vouchers/edit.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/vouchers/:voucher_id', {
      templateUrl: 'components/vouchers/show.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/vouchers/:voucher_id/codes', {
      templateUrl: 'components/codes/vouchers_index.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    when('/:id/vouchers/:voucher_id/codes/:username', {
      templateUrl: 'components/codes/voucher_sessions.html',
      controller: 'LocationsCtrl as lc',
      resolve: { loginRequired: loginRequired }
    }).
    otherwise({
      templateUrl: 'components/home/404.html',
      controller: function(menu) {
        menu.isOpenLeft = false;
        menu.isOpen = false;
      }
      // redirectTo: '/404'
    });
    $locationProvider.html5Mode(false);
}]);

app.factory('httpRequestInterceptor', ['$q', 'AccessToken', '$rootScope', 'API_URL',
  function($q, AccessToken, $rootScope, API_URL) {
    var apiRegExp = new RegExp(API_URL + '\\S+', 'i');
    return {
      request: function(config){
        var token = AccessToken.get();
        if ((token) && (apiRegExp.test(config.url))) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      response: function(response){
        // Not sure, don't like rootScope!
        $rootScope.notFound = undefined;

        if (response.status === 401) {
        }
        else if (response.status === 500) {
        }
        return response || $q.when(response);
      },
      responseError: function(rejection) {

        if (rejection.status === 401) {
          var logoutEvent = 'logout';
          var logoutArgs = ['arg'];
          $rootScope.$broadcast(logoutEvent, logoutArgs);
        }
        else if (rejection.status === 404) {
          $rootScope.notFound = true;
        }
        // else if (rejection.status === 404) {
        //   $location.path('/404').search({ct: 'does-not-compute'});
        // }
        return $q.reject(rejection);
      }
    };
  }
]);
