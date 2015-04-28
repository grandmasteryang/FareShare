angular
  .module('example')
  .controller("MyTaxiController", function ($scope, Taxidata, Usertable, supersonic) {

  	$scope.taxidatas = null;
  	$scope.userRow = null;
  	$scope.userId = localStorage.objectId;
    $scope.joinedTaxiIds = [];
    $scope.createdTaxiIds = [];
    $scope.joinedTaxis = [];
    $scope.createdTaxis = [];

    Usertable.find($scope.userId).then( function (user) {
      $scope.$apply( function () {
      
      $scope.joinedTaxiIds = user['joinedTaxis'];
      $scope.createdTaxiIds = user['createdTaxis'];

      $scope.joinedTaxis = [];
      $scope.createdTaxis = [];



      for(var i = 0; i<$scope.joinedTaxiIds.length; i++){
        Taxidata.find($scope.joinedTaxiIds[i]).then( function (taxi) {
          $scope.$apply( function () {
            $scope.joinedTaxis.push(taxi);
            }); 
        });
      }

      for(var i = 0; i<$scope.createdTaxiIds.length; i++){
        Taxidata.find($scope.createdTaxiIds[i]).then( function (taxi) {
          $scope.$apply( function () {
            $scope.createdTaxis.push(taxi);
            }); 
        });
      }


      });
    });

   // var joinedQuery = {"objectId": $scope.joinedTaxis[0]}

   
    


   // Taxidata.findall({joinedQuery: JSON.stringify(joinedQuery)}).then(
   //   function(taxis) {
   //     $scope.$apply( function () {
   //     $scope.taxidatas = taxis;
   //     });
   //   });



    /*

    $scope.test = function() {
	    for (var i = 0; i < $scope.userdatas.length; i++) {
	    	if ($scope.userdatas[i].id === $scope.objectId) {
	    		$scope.userRow = $scope.userdatas[i];
	    		break;
	    	}
	    }
	    alert($scope.userRow.id);
    } */
    
  });