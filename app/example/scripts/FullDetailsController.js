angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.userId = localStorage.objectId;
    $scope.userdata = null;
    $scope.joinedTaxiIds = [];
    $scope.joinedBool = false;

    Usertable.find($scope.userId).then( function (user) {
      $scope.userdata = user;
      $scope.joinedTaxiIds = user['joinedTaxis'];
    });

    var _refreshViewData = function () {
      Taxidata.find($scope.dataId).then( function (taxidata) {
        $scope.$apply( function () {
          $scope.taxidata = taxidata;
          $scope.showSpinner = false;
          $scope.joinedBool = ($scope.joinedTaxiIds.indexOf($scope.taxidata['id']) >= 0);

        });
      });
    }

    

    //document.getElementById("user-info").innerHTML = "User: " + localStorage.username2 ;
    $scope.joinButton = "Join Taxi";

    $scope.clickJoin = function() {
        // update the information for this taxi
        // this includes adding this user and updating the number of remaining seats
        //$scope.joinButton = "Leave Taxi";
        $scope.taxidata['remainingSeats']--;
        $scope.taxidata['passengerList'] = Array($scope.userdata['firstName']).concat($scope.taxidata['passengerList']);
        $scope.taxidata.save();

        // update the information for this user
        $scope.joinedTaxiIds.push($scope.taxidata['id']);
        $scope.userdata['joinedTaxis'] = $scope.joinedTaxiIds;
        $scope.userdata.save();

        // navigate to a new page
        supersonic.ui.tabs.select(0);
    
    };

    $scope.clickLeave = function() {
        
        // update the taxi to reflect that we left
        $scope.taxidata['remainingSeats']++;
        var tmpArr = $scope.taxidata['passengerList'];
        var index = tmpArr.indexOf($scope.userdata['firstName']);
        alert(index);
        if(tmpArr.length == 1){
          tmpArr = [];
        } else{
          tmpArr.splice(index, 1);
        }    
        
        $scope.taxidata['passengerList'] = tmpArr;

        //$scope.taxidata.save();

        // update the information for this user to reflect that he left
        tmpArr = $scope.userdata['joinedTaxis'];
        index = tmpArr.indexOf($scope.taxidata['id']);
        alert(index);
        if(tmpArr.length == 1){
          tmpArr = [];
        } else{
          tmpArr.splice(index, 1);
        }
        $scope.userdata['joinedTaxis'] = tmpArr;
        //$scope.userdata.save();


        // navigate to a new page
        supersonic.ui.tabs.select(0);
    
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

