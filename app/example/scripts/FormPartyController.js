angular
  .module('example')
  .controller("FormPartyController", function ($scope, Taxidata, supersonic) {
    $scope.taxidata = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newtaxidata = new Taxidata($scope.taxidata);
      newtaxidata.save().then( function () {
  			
  			alert("Form Submitted! New Taxi Created.");
  			supersonic.ui.tabs.select(0);

      	});
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });