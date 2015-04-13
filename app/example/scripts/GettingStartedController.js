angular
  .module('example')
  .controller("GettingStartedController", function ($scope, Taxidata, supersonic) {
    $scope.taxidatas = null;
   

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;
        
        });
    });
  });