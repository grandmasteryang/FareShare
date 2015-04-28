angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.userId = localStorage.objectId;
    $scope.userdata = null;
    $scope.joinedTaxiIds = [];



    Usertable.find($scope.userId).then( function (user) {
      $scope.userdata = user;
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

      if ($scope.joinButton == "Join Taxi") {

        // update the information for this taxi
        // this includes adding this user and updating the number of remaining seats
        //$scope.joinButton = "Leave Taxi";
        taxidata['remainingSeats']--;
        taxidata['passengerList'] = Array($scope.userdata['firstName']).concat(taxidata['passengerList']);
        taxidata.save();

        // update the information for this user
        $scope.joinedTaxiIds.push(taxidata['id']);
        $scope.userdata['joinedTaxis'] = $scope.joinedTaxiIds;
        $scope.userdata.save();

        // navigate to a new page
        
        supersonic.ui.tabs.select(0);
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

