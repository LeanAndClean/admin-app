(function (angular, appSettings) {
  'use strict';

  angular
    .module('app', ['ngRoute', 'lcSDK'])
    .config(config)
    .constant('DISCOVERY_SERVERS', [appSettings['DiscoveryServer1'], appSettings['DiscoveryServer2']]);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'list.tpl.html',
        controller: 'List'
      })
      .when('/search', {
        templateUrl: 'search.tpl.html',
        controller: 'Search'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }

})(window.angular, window.appSettings);
