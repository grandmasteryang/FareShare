angular
  .module('taxidatatwo')
  .controller("NewController", function ($scope, Taxidatatwo, supersonic) {
    $scope.taxidatatwo = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newtaxidatatwo = new Taxidatatwo($scope.taxidatatwo);
      newtaxidatatwo.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });