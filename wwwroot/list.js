(function (angular) {
  'use strict';

  angular
    .module('app')
    .controller('List', ListController);

  function ListController($scope, $http, lcServiceClient, DISCOVERY_SERVERS) {
    var http = lcServiceClient({ discoveryServers: DISCOVERY_SERVERS });

    $scope.products = [];
    $scope.deleteProduct = deleteProduct;

    init();

    function init() {
      http
        .get('couchdb', '/products/_all_docs?include_docs=true')
        .then(function (result) {
          $scope.products = result.data.rows.map(function (row) { return row.doc; });
        })
        .catch(console.error.bind(console));
    }

    function deleteProduct(product) {
      http
        .del('couchdb', '/products/' + product._id + '?rev=' + product._rev)
        .then(function () {
          var index = $scope.products.indexOf(product);
          $scope.products.splice(index, 1);
        })
        .catch(console.error.bind(console));
    }

  }

})(window.angular);
