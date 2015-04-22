angular
  .module('example')
  .controller("GettingStartedController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.taxidatas = null;


    Taxidata.all().whenChanged( function (taxidatas) {
        $scope.$apply( function () {
          $scope.taxidatas = taxidatas;  
    	});	
    });

    $scope.refreshTaxis = function() {
      location.reload();
    };

    $scope.logOut = function() {
      supersonic.ui.initialView.show();
    };
    document.getElementById("user-info").innerHTML = "User: " + localStorage.username2 ;
    supersonic.data.channel('public_announcements').subscribe( function(message) {
        $scope.username=message;
    });

    $scope.myfilter = function(element){
      var newString = String($scope.query.departDate.getMonth() + 1) + "/"
          + String($scope.query.departDate.getDate()) + "/" 
          + String($scope.query.departDate.getFullYear());


      return(
        ((element['deptAddr'].indexOf($scope.query.deptAddr))>=0)&&(element['destAddr'].indexOf($scope.query.destAddr)>=0)&&
        (element['departDate'] == newString));
    }
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
    //   if (taxidata['remainingSeats'] == 0) {
    //     alert("No available seats!")
    //   }
    // 	else {
    // 		taxidata['remainingSeats']--;
    // 		taxidata.save();
    // 	}
    // };

  });