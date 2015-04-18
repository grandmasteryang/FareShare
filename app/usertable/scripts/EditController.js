angular
  .module('usertable')
  .controller("EditController", function ($scope, Usertable, supersonic) {
    $scope.usertable = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Usertable.find(steroids.view.params.id).then( function (usertable) {
      $scope.$apply(function() {
        $scope.usertable = usertable;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.usertable.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
