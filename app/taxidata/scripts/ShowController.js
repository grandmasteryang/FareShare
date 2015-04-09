angular
  .module('taxidata')
  .controller("ShowController", function ($scope, Taxidata, supersonic) {
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

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.taxidata.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });