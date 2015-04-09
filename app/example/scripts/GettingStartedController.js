angular
  .module('example')
  .controller('GettingStartedController', function($rootScope, $scope, supersonic) {
    //$scope.navbarTitle = "FareShare";
    $rootScope.cow = "Northwestern";
      $scope.seat=3;
      $scope.join=function()
      {
          if($scope.seat>0)
            $scope.seat=$scope.seat-1;
      }
  });
