angular
  .module('example')
  .controller("MyTaxiController", function ($scope, Taxidata, Usertable, supersonic) {
  	$scope.userdatas = null;
  	$scope.taxidatas = null;
  	$scope.userRow = null;
  	$scope.objectId = localStorage.objectId;

  	Usertable.all().whenChanged( function (userdatas) {
         $scope.userdatas = userdatas;         
    });

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;  
    	});	
    });

    $scope.test = function() {
	    for (var i = 0; i < $scope.userdatas.length; i++) {
	    	if ($scope.userdatas[i].id === $scope.objectId) {
	    		$scope.userRow = $scope.userdatas[i];
	    		break;
	    	}
	    }
	    alert($scope.userRow.id);
    }
  });