(function (angular) {
  'use strict';

  angular
    .module('app')
    .directive('releaseInfo', releaseInfoDirective);

  function releaseInfoDirective ($http, lcServiceClient, DISCOVERY_SERVERS) {
    var http = lcServiceClient({ discoveryServers: DISCOVERY_SERVERS });

    return {
      restrict: 'E',
      scope: {
        release: '='
      },
      templateUrl: 'release-info.tpl.html',
      link: function ($scope) {
        $scope.price = 0;
        $scope.addProduct = function () {
          var price = Number($scope.price);
          if (isNaN(price) || price <= 0) {
            alert('Bitte geben Sie einen korrekten Preis an.');
            return;
          }
          http
            .post('couchdb', '/products', {
              mbid: $scope.release.id,
              title: $scope.release.title,
              artist: $scope.release['artist-credit'][0].artist.name,
              price: price
            })
            .then(function () {
              alert('Produkt wurde hinzugefügt');
            })
            .catch(function (err) {
              alert(err);
            });
        };
        http
          .get('cover-service', '/images/' + $scope.release.id)
          .then(function (result) {
            $scope.cover = result.data[0];
          })
          .catch(console.error.bind(console));
      }
    };
  }

})(window.angular);
