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
            filterDept = new google.maps.LatLng($scope.departureInput.lat(), $scope.departureInput.lng());
            //computeDistance returns distance in meters, divide by 1609 to change to miles
            $scope.distanceDept = google.maps.geometry.spherical.computeDistanceBetween(filterDept, dbDept)/1609.34;
      });
    };

    //google geolocation for destination
    $scope.destClick = function() {
      $scope.destInput = document.getElementById("destination");
      var autocompleteDest = new google.maps.places.Autocomplete($scope.destInput); 
      google.maps.event.addListener(autocompleteDest, 'place_changed', function() {
            $scope.destInput=autocompleteDest.getPlace().geometry.location;
            filterDest = new google.maps.LatLng($scope.destInput.lat(), $scope.destInput.lng());
            //computeDistance returns distance in meters, divide by 1609 to change to miles
            $scope.distanceDest = google.maps.geometry.spherical.computeDistanceBetween(filterDest, dbDest)/1609.34;
      });
    };

    $scope.myfilter = function(element){

      var DateString = "";
      var TimeString = "";

      
      if ($scope.departureInput && $scope.destInput)
      {
        DateString = String($scope.departDate.getMonth() + 1) + "/"
          + String($scope.departDate.getDate()) + "/" 
          + String($scope.departDate.getFullYear());
      }
      
      if ($scope.departTime)
      {
        TimeString = String($scope.departTime.getHours()) + ":"
          + String($scope.departTime.getMinutes()); 
      }
      
      var deptBool = (element['deptAddr'].indexOf($scope.deptAddr)>=0);
      var destBool = (element['destAddr'].indexOf($scope.destAddr)>=0);
      var dateBool = (element['departDate'] == DateString);
      //take out
      var timeBool = (element['departTime'] == TimeString);
      

      deptBool = deptBool || (!$scope.deptAddr);
      destBool = destBool || (!$scope.destAddr);
      dateBool = dateBool || (!$scope.departDate);
      //take out
      timeBool = timeBool || (!$scope.departTime);
      

      // var timeINT1 = element['departTime'].split(":");
      // var timeINT2 = $scope.departTime.split(":");
      // var timeint1 = parseInt(timeINT1[0]) + (60 * parseInt(timeINT1[1]));
      // var timeint2 = parseInt(timeINT2[0]) + (60 * parseInt(timeINT2[1]));

      // if(Math.abs（timeint1 - timeint2）<= 60){
      //   var timeBool = true;
      // }
      // else{
      //   timeBool = false;
      // }

      dbDept = new google.maps.LatLng(element['deptObj'].k, element['deptObj'].D);
      dbDest = new google.maps.LatLng(element['destObj'].k, element['destObj'].D);
      

      var withinDept = true;
      var withinDest = true;

      //if departure location and filter is within
      if ($scope.distanceDept > 5) {
        withinDept = false;
      }
      //if destination location and filter is within
      if ($scope.distanceDest > 5) {
        withinDest = false;
      }

      return (timeBool && dateBool && withinDept && withinDest);
    }; 

    $scope.refreshTaxis = function() {
      location.reload();
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
    // $scope.updateSeats = function(taxidata) {
    //   alert(taxidata['destObj'].k);
    // };
  });