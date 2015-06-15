(function (angular) {
  'use strict';

  angular
    .module('app')
    .controller('Search', SearchController);

  function SearchController($scope, $http) {

    $scope.query = '';
    $scope.releases = [];
    $scope.findByTitle = findByTitle;

    function findByTitle(query) {
      $http
        .get('http://musicbrainz.org/ws/2/release?query=' + query + '&limit=100&fmt=json')
        .then(function (result) {
          $scope.releases = distinct(result.data.releases, function (release) { return release['artist-credit'][0].artist.name + '|' + release.title; });
        })
        .catch(console.error.bind(console));
    }

    function distinct(items, keyGenerator) {
      var map = items.reduce(function (prev, current) {
        var key = keyGenerator(current);
        if (!(key in prev)) prev[key] = current;
        return prev;
      }, Object.create(null));
      return Object.keys(map).map(function (key) {
        return map[key];
      });
    }

  }

})(window.angular);
