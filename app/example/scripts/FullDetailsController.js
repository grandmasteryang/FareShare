angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.userId = localStorage.objectId;
    $scope.userdata = null;
    $scope.joinedTaxiIds = [];

    function initialize() {
      var mapOptions = {
        center: { lat: -34.397, lng: 150.644},
        zoom: 8
      };
      var map = new google.maps.Map(document.getElementById('map-canvas'),
          mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.joinedTaxiIds = $scope.userdata['joinedTaxis'];
          $scope.joinedBool = ($scope.joinedTaxiIds.indexOf($scope.taxidata['id']) >= 0);
      }); 
    });

    Usertable.find($scope.userId).then( function (user) {
      $scope.userdata = user;
      $scope.joinedTaxiIds = user['joinedTaxis'];
      $scope.joinedBool = ($scope.joinedTaxiIds.indexOf($scope.taxidata['id']) >= 0);
    });

    var _refreshViewData = function () {
      Taxidata.find($scope.dataId).then( function (taxidata) {
        Usertable.find($scope.userId).then( function (user) {
          $scope.$apply( function () {
            $scope.userdata = user;
            $scope.taxidata = taxidata;
            $scope.joinedTaxiIds = user['joinedTaxis'];
            $scope.joinedBool = ($scope.joinedTaxiIds.indexOf($scope.taxidata['id']) >= 0);

            //alert("Finished updating");

        
           });
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
        if(!$scope.taxidata['passengerList']){
          $scope.taxidata['passengerList'] = Array($scope.userdata['firstName'] + " " + $scope.userdata['lastName']);
        } else{
          $scope.taxidata['passengerList'] = Array($scope.userdata['firstName'] + " " + $scope.userdata['lastName']).concat($scope.taxidata['passengerList']);
        }
        
        $scope.taxidata.save();

        // update the information for this user
        if(!$scope.userdata['joinedTaxis']){
          $scope.userdata['joinedTaxis'] = Array($scope.taxidata['id']);
        } else{
          $scope.joinedTaxiIds.push($scope.taxidata['id']);
          $scope.userdata['joinedTaxis'] = $scope.joinedTaxiIds;
        }
        
        $scope.userdata.save();

        alert("Taxi joined!");

        if($scope.taxidata['remainingSeats']!=0){
          $scope.joinedBool = false;
        }
        
          supersonic.ui.layers.pop();

          supersonic.ui.tabs.select(2);

        
        // navigate to a new page
        
    
    };

    $scope.clickLeave = function() {
        
        // update the taxi to reflect that we left
        $scope.taxidata['remainingSeats']++;
        var tmpArr = $scope.taxidata['passengerList'];
        var index = tmpArr.indexOf($scope.userdata['firstName'] + " " + $scope.userdata['lastName']);
        tmpArr.splice(index, 1);
        $scope.taxidata['passengerList'] = tmpArr;

        $scope.taxidata.save();

        // update the information for this user to reflect that he left
        tmpArr = $scope.userdata['joinedTaxis'];
        index = tmpArr.indexOf($scope.taxidata['id']);
        tmpArr.splice(index, 1);
  
        $scope.userdata['joinedTaxis'] = tmpArr;
        $scope.userdata.save();

        alert("You left the Taxi.");
        supersonic.ui.layers.pop();
        supersonic.ui.tabs.select(0);
    
    };
  

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId && ($scope.userdata != null) ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });
  });

