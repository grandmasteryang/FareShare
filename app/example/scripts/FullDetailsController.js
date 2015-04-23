angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, Usertable, supersonic) {
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
      if (taxidata['remainingSeats'] == 0 && $scope.joinButton == "Join Taxi"){
        alert("No available seats!");
      }    
      else if ($scope.joinButton == "Join Taxi") {
        $scope.joinButton = "Leave Taxi";
          taxidata['remainingSeats']--;
          //taxidata.save();
          taxidata['passengerList']= Array(prompt("Please enter your name")).concat(taxidata['passengerList']);
          taxidata.save();
          //alert("disp_prompt()")
      }
      else if ($scope.joinButton == "Leave Taxi") {
        $scope.joinButton = "Join Taxi";
          taxidata['remainingSeats']++;
          taxidata.save();
          alert("You left the Taxi.");
      }
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

