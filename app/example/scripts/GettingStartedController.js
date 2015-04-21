angular
  .module('example')
  .controller("GettingStartedController", function ($scope, Taxidata, supersonic) {
    $scope.taxidatas = null;

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;  
    	});	
    });

    //google geolocation for departure
    $scope.departClick = function() {
      $scope.departureInput = document.getElementById("departureLocation");
      var autocompleteDep = new google.maps.places.Autocomplete($scope.departureInput); 
      google.maps.event.addListener(autocompleteDep, 'place_changed', function() {
            $scope.departureInput=autocompleteDep.getPlace().geometry.location;
      });
    };

    //google geolocation for destination
    $scope.destClick = function() {
      $scope.destInput = document.getElementById("destination");
      var autocompleteDest = new google.maps.places.Autocomplete($scope.destInput); 
      google.maps.event.addListener(autocompleteDest, 'place_changed', function() {
            $scope.destInput=autocompleteDest.getPlace().geometry.location;
      });
    };

    $scope.myfilter = function(element){
      var DateString = String($scope.query.departDate.getMonth() + 1) + "/"
          + String($scope.query.departDate.getDate()) + "/" 
          + String($scope.query.departDate.getFullYear());
      var TimeString = String($scope.query.departTime.getHours()) + ":"
          + String($scope.query.departTime.getMinutes());

      var filterDept = new google.maps.LatLng($scope.departureInput.lat(), $scope.departureInput.lng());
      var filterDest = new google.maps.LatLng($scope.destInput.lat(), $scope.destInput.lng());
      var dbDept = new google.maps.LatLng(element['deptObj'].D, element['deptObj'].k);
      var dbDest = new google.maps.LatLng(element['destObj'].D, element['destObj'].k);
      $scope.distanceDept = google.maps.geometry.spherical.computeDistanceBetween(filterDept, dbDept);
      $scope.distanceDest = google.maps.geometry.spherical.computeDistanceBetween(filterDest, dbDest);

      return(
        ((element['deptAddr'].indexOf($scope.query.deptAddr))>=0)&&(element['destAddr'].indexOf($scope.query.destAddr)>=0)
        &&(element['departDate'] == DateString)&&(element['departTime'] == TimeString)
        );
    }; 

    $scope.refreshTaxis = function() {
      //location.reload();
      alert($scope.distanceDept);
      //alert("HI");
    };

    //$scope.query = function(){
    
    //$scope.query.date=String($scope.query.date.getMonth() + 1) + "/"
    //   + String($scope.query.date.getDate()) + "/" 
    //   + String($scope.query.date.getFullYear());
    
    // } 
//    $scope.queryDate={};
//    $scope.filterByDate = function(taxidata){
//        return $scope.queryDate[taxidata.departDate];
//    }
    $scope.updateSeats = function(taxidata) {
      alert(taxidata['destObj'].k);
    };

  });