angular
  .module('example')
  .controller('GettingStartedController', function($rootScope, $scope, supersonic) {
    //$scope.navbarTitle = "FareShare";
    $rootScope.cow = "Northwestern";
      $scope.seat1=3;
      $scope.seat2=2;
      $scope.seat3=4;
      $scope.seat4=1;
      $scope.join1=function()
      {
          if($scope.seat1>0)
            $scope.seat1--;
      }
      $scope.join2=function()
      {
          if($scope.seat2>0)
            $scope.seat2--;
      }
      $scope.join3=function()
      {
          if($scope.seat3>0)
            $scope.seat3--;
      }
      $scope.join4=function()
      {
          if($scope.seat4>0)
            $scope.seat4--
      }
  });
