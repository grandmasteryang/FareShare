angular
  .module('taxidatatwo')
  .controller("IndexController", function ($scope, Taxidatatwo, supersonic) {
    $scope.taxidatatwos = null;
    $scope.showSpinner = true;

    Taxidatatwo.all().whenChanged( function (taxidatatwos) {
        $scope.$apply( function () {
          $scope.taxidatatwos = taxidatatwos;
          $scope.showSpinner = false;
        });
    });
  });