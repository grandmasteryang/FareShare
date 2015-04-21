angular
  .module('example')
  .controller("GettingStartedController", function ($scope, Taxidata, supersonic) {
    $scope.taxidatas = null;
   

    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;  
    	});	
    });

    $scope.refreshTaxis = function() {
      location.reload();
    };

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

    $scope.myfilter = function(element){
      
      var DateString = "";
      var TimeString = "";

      
      if ($scope.departDate)
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
      var timeBool = (element['departTime'] == TimeString);

      deptBool = deptBool || (!$scope.deptAddr);
      destBool = destBool || (!$scope.destAddr);
      dateBool = dateBool || (!$scope.departDate);
      timeBool = timeBool || (!$scope.departTime);
      

      return (timeBool && dateBool && deptBool && destBool);//&&timeBool);
    }
  

  });