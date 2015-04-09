angular
  .module('taxidata')
  .controller("NewController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newtaxidata = new Taxidata($scope.taxidata);
      newtaxidata.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });