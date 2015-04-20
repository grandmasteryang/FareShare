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
    $scope.myfilter = function(element){
      var DateString = String($scope.query.departDate.getMonth() + 1) + "/"
          + String($scope.query.departDate.getDate()) + "/" 
          + String($scope.query.departDate.getFullYear());
      var TimeString = String($scope.query.departTime.getHours()) + ":"
          + String($scope.query.departTime.getMinutes());
      return(
        ((element['deptAddr'].indexOf($scope.query.deptAddr))>=0)&&(element['destAddr'].indexOf($scope.query.destAddr)>=0)
        &&(element['departDate'] == DateString)&&(element['departTime'] == TimeString)
        );
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