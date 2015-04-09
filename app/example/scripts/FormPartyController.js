angular
  .module('example')
  .controller('FormPartyController', function($rootScope, $scope, supersonic) {
    //$scope.navbarTitle = "Form Party";
    $scope.myfunction = function() {
    	alert("Form Submitted! New Taxi Created.");
    }
  });
