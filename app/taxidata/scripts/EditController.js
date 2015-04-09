angular
  .module('taxidata')
  .controller("EditController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Taxidata.find(steroids.view.params.id).then( function (taxidata) {
      $scope.$apply(function() {
        $scope.taxidata = taxidata;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.taxidata.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
