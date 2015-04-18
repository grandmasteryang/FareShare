angular
  .module('usertable')
  .controller("ShowController", function ($scope, Usertable, supersonic) {
    $scope.usertable = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Usertable.find($scope.dataId).then( function (usertable) {
        $scope.$apply( function () {
          $scope.usertable = usertable;
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
      $scope.usertable.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });