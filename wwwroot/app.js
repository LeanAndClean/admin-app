(function (angular) {
  'use strict';

  angular
    .module('app', ['ngRoute'])
    .config(config)
    .constant('DB_HOST', window.appSettings.dbHost)
    .constant('COVER_SERVICE', window.appSettings.coverService);

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

})(window.angular);
