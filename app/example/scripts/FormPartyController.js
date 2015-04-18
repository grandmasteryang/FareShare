angular
  .module('example')
  .controller("FormPartyController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = {};

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
      
      if (!$scope.taxidata['departDate'] || !$scope.taxidata['departTime'] 
          || !$scope.taxidata['deptAddr'] || !$scope.taxidata['destAddr']){
        alert("Please fill in all fields.")
      } else
      {
         $scope.taxidata['departDate'] = String($scope.taxidata['departDate'].getMonth() + 1) + "/"
       + String($scope.taxidata['departDate'].getDate()) + "/" 
       + String($scope.taxidata['departDate'].getFullYear());

        $scope.taxidata['departTime'] = String($scope.taxidata['departTime'].getHours()) + ":"
          + String($scope.taxidata['departTime'].getMinutes());

        $scope.taxidata['notes'] = document.getElementById("notes").value;  

         
   

        $scope.showSpinner = true;
        newtaxidata = new Taxidata($scope.taxidata);

        
        newtaxidata.save().then( function () {
          supersonic.ui.tabs.select(0);
          document.getElementById("newTaxiForm").reset();
        });

        $scope.showSpinner = false;
      }

     
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });