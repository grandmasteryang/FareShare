angular
  .module('taxidatatwo')
  .controller("EditController", function ($scope, Taxidatatwo, supersonic) {
    $scope.taxidatatwo = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Taxidatatwo.find(steroids.view.params.id).then( function (taxidatatwo) {
      $scope.$apply(function() {
        $scope.taxidatatwo = taxidatatwo;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.taxidatatwo.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
