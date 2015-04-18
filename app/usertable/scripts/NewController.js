angular
  .module('usertable')
  .controller("NewController", function ($scope, Usertable, supersonic) {
    $scope.usertable = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newusertable = new Usertable($scope.usertable);
      newusertable.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });