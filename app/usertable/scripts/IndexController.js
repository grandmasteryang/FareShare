angular
  .module('usertable')
  .controller("IndexController", function ($scope, Usertable, supersonic) {
    $scope.usertables = null;
    $scope.showSpinner = true;

    Usertable.all().whenChanged( function (usertables) {
        $scope.$apply( function () {
          $scope.usertables = usertables;
          $scope.showSpinner = false;
        });
    });
  });