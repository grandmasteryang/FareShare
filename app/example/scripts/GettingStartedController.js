angular
  .module('example')
  .controller("GettingStartedController", function ($scope, Taxidata, supersonic) {
    $scope.taxidatas = null;
   

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;  
    	});	
    });

    $scope.updateSeats = function(taxidata) {
      if (taxidata['remainingSeats'] == 0) {
        alert("No available seats!")
      }
    	else {
    		taxidata['remainingSeats']--;
    		taxidata.save();
    	}
    };

  });