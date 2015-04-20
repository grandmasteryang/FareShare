angular
  .module('example')
  .controller("LoginController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.logg = true;
    $scope.hello = "Taxi";
    $scope.userdata = {};
    $scope.userdatas = null;

    $scope.loginButton = "Login";
    $scope.clickJoin = function(taxidata) {
      $scope.username = document.getElementById('username').value;
      $scope.password = document.getElementById('password').value;
      $scope.loginButton = "wahaha";
      //var query = { "userName": "pudding" };
    };
    /*
    Usertable.find('JAirU9e11W').then( function (userdata) {
      $scope.$apply( function () {
        $scope.userdata = userdata;
      });
    });*/
    var query = { "userName": "pudding" };
    Usertable.findAll({query: JSON.stringify(query)}).then( function (userdatas) {
      
        $scope.userdatas = userdatas;
      
    });
  
    

    /*Usertablge.all().whenChanged( function (userdatas) {
        $scope.$apply( function () {
          $scope.userdatas = userdatas;  
        }); 
    });*/


  });