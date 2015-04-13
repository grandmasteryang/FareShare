angular
  .module('taxidatatwo')
  .controller("ShowController", function ($scope, Taxidatatwo, supersonic) {
    $scope.taxidatatwo = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Taxidatatwo.find($scope.dataId).then( function (taxidatatwo) {
        $scope.$apply( function () {
          $scope.taxidatatwo = taxidatatwo;
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
      $scope.taxidatatwo.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });