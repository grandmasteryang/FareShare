angular
  .module('example')
  .controller("FormPartyController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.taxidata = {};
    $scope.userId = localStorage.objectId;
    $scope.userdata = null;
    $scope.createdTaxiIds = [];
    $scope.joinedTaxiIds = [];

    // $scope.refreshTaxis = function() {
    //   alert($scope.taxidata);
    //   alert($scope.taxidata['departDate']);
    //   // alert(document.getElementById('myDate').value);
    //   // alert(document.getElementById('myTime').value);
    //   // alert(document.getElementById('departureLocation').value);
    //   // alert(document.getElementById('destination').value);
    // };

     Usertable.find($scope.userId).then( function (user) {
      $scope.userdata = user;
      $scope.createdTaxiIds = user['createdTaxis'];
      $scope.joinedTaxiIds = user['joinedTaxis'];
    });

    Usertable.all().whenChanged( function (userdatas) {
      $scope.$apply( function () {
        Usertable.find($scope.userId).then( function (user) {
          $scope.userdata = user;
          $scope.createdTaxiIds = user['createdTaxis'];
          $scope.joinedTaxiIds = user['joinedTaxis'];
        });
      });
    });
    //document.getElementById("user-info").innerHTML = "User: " + localStorage.username2;

    //google geolocation for departure
    $scope.departClick = function() {
      $scope.departureInput = document.getElementById("departureLocation");
      var autocompleteDep = new google.maps.places.Autocomplete($scope.departureInput); 
      google.maps.event.addListener(autocompleteDep, 'place_changed', function() {
            $scope.departureInput=autocompleteDep.getPlace().geometry.location;
      });
    }

    //google geolocation for destination
    $scope.destClick = function() {
      $scope.destInput = document.getElementById("destination");
      var autocompleteDest = new google.maps.places.Autocomplete($scope.destInput); 
      google.maps.event.addListener(autocompleteDest, 'place_changed', function() {
            $scope.destInput=autocompleteDest.getPlace().geometry.location;
      });
    }

    $scope.submitForm = function () {
      //store info in parse

      $scope.taxidata['maxPassengers'] = document.getElementById("maxPassengers").selectedIndex + 2;
      $scope.taxidata['remainingSeats'] = $scope.taxidata['maxPassengers'] - 1;
      $scope.taxidata['deptAddr'] = document.getElementById('departureLocation').value;
      $scope.taxidata['destAddr'] = document.getElementById('destination').value;
      $scope.taxidata['deptObj'] = $scope.departureInput;
      $scope.taxidata['destObj'] = $scope.destInput;
      
      if (!document.getElementById('myDate').value || !document.getElementById('myTime').value
          || !document.getElementById('departureLocation').value || !document.getElementById('destination').value){
        alert("Please fill in all fields.")
      } else
      {
         $scope.taxidata['departDate'] = String($scope.taxidata['departDate'].getMonth() + 1) + "/"
       + String($scope.taxidata['departDate'].getDate()) + "/" 
       + String($scope.taxidata['departDate'].getFullYear());
        $scope.taxidata['departTime'] = String($scope.taxidata['departTime'].getHours()) + ":"
          + String($scope.taxidata['departTime'].getMinutes());
         $scope.taxidata['notes'] = "";
         $scope.taxidata['notes'] = document.getElementById("notes").value;  
        if(!$scope.taxidata['passengerList']){
          $scope.taxidata['passengerList'] = Array($scope.userdata['firstName'] + " " + $scope.userdata['lastName']);
        } else{
          $scope.taxidata['passengerList'] = Array($scope.userdata['firstName'] + " " + $scope.userdata['lastName']).concat($scope.taxidata['passengerList']);
        }

        $scope.showSpinner = true;
        newtaxidata = new Taxidata($scope.taxidata);

        newtaxidata.save().then( function () {
          // update the information for this user

          if(!$scope.userdata['joinedTaxis']){
            $scope.userdata['joinedTaxis'] = Array(newtaxidata['id']);
          } else{
            $scope.joinedTaxiIds.push(newtaxidata['id']);
            $scope.userdata['joinedTaxis'] = $scope.joinedTaxiIds;
          }

          if(!$scope.userdata['createdTaxis']){
            $scope.userdata['createdTaxis'] = Array(newtaxidata['id']);
          } else {
            $scope.createdTaxiIds.push(newtaxidata['id']);
            $scope.userdata['createdTaxis'] = $scope.createdTaxiIds;
          }

          
          $scope.userdata.save();
          $scope.taxidata = {};
          alert("Taxi created! Please allow a few seconds to update.");

          supersonic.ui.tabs.select(2);
          document.getElementById("newTaxiForm").reset();
        });

        $scope.showSpinner = false;
      }

     
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });