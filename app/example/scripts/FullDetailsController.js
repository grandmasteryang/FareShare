angular
  .module('example')
  .controller("FullDetailsController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Taxidata.find($scope.dataId).then( function (taxidata) {
        $scope.$apply( function () {
          $scope.taxidata = taxidata;
          $scope.showSpinner = false;
        });
      });
    }

    $scope.joinButton = "Join Taxi";
    $scope.clickJoin = function() {
      $scope.joinButton = "Leave Taxi";
      //$location.path("getting-started");
    };
  

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });
  });

