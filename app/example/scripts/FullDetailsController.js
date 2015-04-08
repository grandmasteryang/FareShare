angular
  .module('example')
  .controller('FullDetailsController', function($rootScope, $scope, supersonic) {
    //$scope.navbarTitle = "Full Details";
    $scope.myCow = $rootScope.cow;
    $scope.joinButton = "Join Taxi";
    $scope.clickJoin = function() {
    	$scope.joinButton = "Leave Taxi";
    	//$location.path("getting-started");
    };
  });
