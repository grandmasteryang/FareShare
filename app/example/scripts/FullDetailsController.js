angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, Usertable, supersonic, $http) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;
    $scope.userId = localStorage.objectId;
    $scope.userdata = null;
    $scope.joinedTaxiIds = [];

    Taxidata.all().whenChanged( function (taxidatas) {
    $scope.$apply( function () {
      $scope.joinedTaxiIds = $scope.userdata['joinedTaxis'];
      $scope.joinedBool = ($scope.joinedTaxiIds.indexOf($scope.taxidata['id']) >= 0);
      }); 
    });

    Usertable.all().whenChanged( function (userdatas) {
      Usertable.find($scope.userId).then( function (user) {
        $scope.userdata = user;
        $scope.joinedTaxiIds = user['joinedTaxis'];
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

            var mapOptions = {
                center: { lat: 42.055984, lng: -87.675171},
                zoom: 12
              };
            var map = new google.maps.Map(document.getElementById('map-canvas'),
                   mapOptions);
            var deptMarker = new google.maps.Marker({
              position: { lat: $scope.taxidata['deptObj'].A, lng: $scope.taxidata['deptObj'].F},
              map: map
            });
            var destMarker = new google.maps.Marker({
              position: { lat: $scope.taxidata['destObj'].A, lng: $scope.taxidata['destObj'].F},
              map: map
            });

            var markerList = new Array(deptMarker.position, destMarker.position);
            var bounds = new google.maps.LatLngBounds();

            for (var i=0, LtLgLen = markerList.length; i<LtLgLen; i++) {
                bounds.extend(markerList[i]);
            }

            map.fitBounds(bounds);
            google.maps.event.trigger(map,'resize');

            var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            var directionsService = new google.maps.DirectionsService();

            function calcRoute() {
              var request = {
                  origin:deptMarker.position,
                  destination:destMarker.position,
                  travelMode: google.maps.TravelMode.DRIVING
              };
              directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                }
              });
            }

            calcRoute();
            directionsDisplay.setMap(map);

            //Time parsing
            $scope.time = taxidata['departTime'];
            if ($scope.time.charAt($scope.time.length-2) ==":" && $scope.time.charAt($scope.time.length-1) != 0) {
              $scope.time = $scope.time.substring(0, $scope.time.length-1) + "0" + 
              $scope.time.charAt($scope.time.length-1);
            }

            if ($scope.time.charAt($scope.time.length-2) == ":") {
              $scope.time += "0";
            }

            if ($scope.time.length == 4) {
              if ($scope.time.charAt(0) == 0) {
                $scope.time = "12" + ":" + $scope.time.charAt(2) + $scope.time.charAt(3);
              } 
              $scope.time += "AM";
            }

            else if ($scope.time.length == 5) {
              var hour = (Number($scope.time.charAt(0))*10) + (Number($scope.time.charAt(1)));
              if (hour > 12) {
                hour -= 12;
                $scope.time = hour.toString() + ":" + $scope.time.charAt(3) + $scope.time.charAt(4)
                + "PM";
              }
              else if (hour == 10 || hour == 11) {
                $scope.time += "AM";
              }
              else if (hour == 12) {
                $scope.time += "PM";
              }
            }
           });
        });
      });
    }

    $scope.joinButton = "Join Taxi";

    $scope.clickJoin = function() {
        // update the information for this taxi
        // this includes adding this user and updating the number of remaining seats
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

        alert("Taxi joined!\nPlease allow a few seconds to update.");

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
        window.confirm("Are you sure you want to leave?");
        alert("You left the Taxi.\nPlease allow a few seconds to update.");
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
