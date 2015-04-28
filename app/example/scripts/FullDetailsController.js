angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.joinedTaxiIds = [];
    $scope.userId = localStorage.objectId;

    Usertable.find($scope.userId).then( function (user) {
      $scope.joinedTaxiIds = user['joinedTaxis'];
    });

    var _refreshViewData = function () {
      Taxidata.find($scope.dataId).then( function (taxidata) {
        $scope.$apply( function () {
          $scope.taxidata = taxidata;
          $scope.showSpinner = false;
        });
      });
    }

    document.getElementById("user-info").innerHTML = "User: " + localStorage.username2 ;
    $scope.joinButton = "Join Taxi";

    $scope.clickJoin = function(taxidata) {

      if (taxidata['remainingSeats'] == 0 && $scope.joinButton == "Join Taxi"){
        alert("No available seats!");
      }    
      else if ($scope.joinButton == "Join Taxi") {
        $scope.joinButton = "Leave Taxi";
          taxidata['remainingSeats']--;
          taxidata['passengerList']= Array(localStorage.firstName).concat(taxidata['passengerList']);
          $scope.joinedTaxiIds.push(taxidata['id']);
          taxidata.save();
          alert($scope.joinedTaxiIds[0]);
          alert("Taxi Joined!");
          supersonic.ui.tabs.select(2);
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

