angular
  .module('example')
  .controller("MyTaxiController", function ($scope, Taxidata, Usertable, supersonic) {
    
  	$scope.taxidatas = null;
  	$scope.userRow = null;
  	$scope.userId = localStorage.objectId;
    $scope.joinedTaxiIds = [];
    $scope.createdTaxiIds = [];
    $scope.joinedTaxis = [];
    $scope.createdTaxis = [];

    $scope.refreshTaxis = function() {
      location.reload();
    };
    
    Usertable.all().whenChanged( function (userdatas) {
            Usertable.find($scope.userId).then( function (user) {
                $scope.$apply( function () {
                
                $scope.joinedTaxiIds = user['joinedTaxis'];
                $scope.createdTaxiIds = user['createdTaxis'];

                if (!$scope.joinedTaxiIds)
                {
                  $scope.joinedTaxiIds = [];
                }
                if (!$scope.createdTaxiIds){
                  $scope.createdTaxiIds = [];
                }

                $scope.joinedTaxis = [];
                $scope.createdTaxis = [];


                for(var i = 0; i<$scope.createdTaxiIds.length; i++){
                  Taxidata.find($scope.createdTaxiIds[i]).then( function (taxi) {
                    $scope.$apply( function () {
                      $scope.createdTaxis.push(taxi);
                      }); 
                  });
                }

                for(var i = 0; i<$scope.joinedTaxiIds.length; i++){
                  Taxidata.find($scope.joinedTaxiIds[i]).then( function (taxi) {
                    $scope.$apply( function () {
                      if($scope.createdTaxiIds.indexOf(taxi['id']) < 0){
                           $scope.joinedTaxis.push(taxi);
                      }
                      }); 
                  });
                }


                });
            });  
    });

  $scope.myfilter = function(element){
      if (element['departTime'].charAt(element['departTime'].length-2) ==":" && element['departTime'].charAt(element['departTime'].length-1) != 0) {
        element['departTime'] = element['departTime'].substring(0, element['departTime'].length-1) + "0" + 
        element['departTime'].charAt(element['departTime'].length-1);
      }

      if (element['departTime'].charAt(element['departTime'].length-2) == ":") {
        element['departTime'] += "0";
      }

      if (element['departTime'].length == 4) {
        if (element['departTime'].charAt(0) == 0) {
          element['departTime'] = "12" + ":" + element['departTime'].charAt(2) + element['departTime'].charAt(3);
        } 
        element['departTime'] += "AM";
      }

      else if (element['departTime'].length == 5) {
        var hour = (Number(element['departTime'].charAt(0))*10) + (Number(element['departTime'].charAt(1)));
        if (hour > 12) {
          hour -= 12;
          element['departTime'] = hour.toString() + ":" + element['departTime'].charAt(3) + element['departTime'].charAt(4)
          + "PM";
        }
        else if (hour == 10 || hour == 11) {
          element['departTime'] += "AM";
        }
        else if (hour == 12) {
          element['departTime'] += "PM";
        }
      }

      return true;
    };


  });