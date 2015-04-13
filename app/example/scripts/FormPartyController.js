angular
  .module('example')
  .controller("FormPartyController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = {};

    //google geolocation for departure
    $scope.departClick = function() {
      $scope.departureInput = document.getElementById("departureLocation");
      $scope.autocompleteDep = new google.maps.places.Autocomplete($scope.departureInput); 
      google.maps.event.addListener(autocompleteDep, 'place_changed', function() {
            $scope.departureInput=autocompleteDep.getPlace().geometry.location;
      });
    }

    //google geolocation for destination
    $scope.destClick = function() {
      $scope.destInput = document.getElementById("destination");
      $scope.autocompleteDest = new google.maps.places.Autocomplete($scope.destInput); 
      google.maps.event.addListener(autocompleteDest, 'place_changed', function() {
            $scope.destInput=autocompleteDest.getPlace().geometry.location;
      });
    }

    $scope.submitForm = function () {
      //store info in parse
      alert(document.getElementById("myTime").value);
      $scope.showSpinner = true;
      newtaxidata = new Taxidata($scope.taxidata);

      
      newtaxidata.save().then( function () {
        supersonic.ui.tabs.select(0);
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });