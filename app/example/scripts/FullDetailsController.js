angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Taxidata.find($scope.dataId).then( function (taxidata) {
        $scope.$apply( function () {
          $scope.taxidata = taxidata;
          $scope.showSpinner = false;
        });
      });
    }

    $scope.joinButton = "Join Taxi";
    $scope.clickJoin = function(taxidata) {
      //$scope.joinButton = "Leave Taxi";  
      if (taxidata['remainingSeats'] == 0){
        alert("full!");
      }    
      else if ($scope.joinButton == "Join Taxi") {
        $scope.joinButton = "Leave Taxi";
          taxidata['remainingSeats']--;
          taxidata.save();
      }
      else if ($scope.joinButton == "Leave Taxi") {
        $scope.joinButton = "Join Taxi";
          taxidata['remainingSeats']++;
          taxidata.save();
      }
      //$location.path("getting-started");
    };
  

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });
  });

