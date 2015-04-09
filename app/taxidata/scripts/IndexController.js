angular
  .module('taxidata')
  .controller("IndexController", function ($scope, Taxidata, supersonic) {
    $scope.taxidatas = null;
    $scope.showSpinner = true;

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;
          $scope.showSpinner = false;
        });
    });
  });