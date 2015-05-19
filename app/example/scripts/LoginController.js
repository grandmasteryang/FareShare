angular
  .module('example')
  .controller("LoginController", function ($scope, Taxidata, Usertable, supersonic) {
    $scope.logg = true;
    $scope.hello = "Taxi";
    $scope.userdata = {};
    $scope.userdatas = null;    
    //$scope.users = null;

    
    Usertable.all().whenChanged( function (userdatas) {
         $scope.userdatas = userdatas;         
    });

    $scope.loginButton = "Log In";
    $scope.clickLogin = function() {
      var flag = false;
      $scope.username = document.getElementById('login-username').value;
      $scope.password = document.getElementById('login-password').value;
    
      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].userName == $scope.username && $scope.userdatas[i].userPassword == $scope.password){           
          flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          localStorage.firstName=$scope.userdatas[i].firstName;
          localStorage.objectId=$scope.userdatas[i].id;

          supersonic.ui.initialView.dismiss();
          //window.open("getting-started.html")
          break;
        }          
      }

      if (flag == false){
        alert("Invalid username or password.");
      }
    };
    
    $scope.signupButton = "Sign Up";
    $scope.clickSignup = function() {
      if ($scope.signupButton == "Sign Up"){
        var flag = false;
        $scope.userdata['firstName'] = document.getElementById('signup-firstname').value;
        $scope.userdata['lastName'] = document.getElementById('signup-lastname').value;
        $scope.userdata['userName'] = document.getElementById('signup-username').value;
        $scope.userdata['userPassword'] = document.getElementById('signup-password').value;
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.userdata['userName']  ==  $scope.userdatas[i].userName ){           
            flag = true;
            break;
          }          
        }
        if ($scope.userdata['firstName'] == "" || $scope.userdata['lastName'] == "" || $scope.userdata['userName'] == "" || $scope.userdata['userPassword'] == ""){
          alert("Please fill in all fields.");
        } else {
          if (flag == false){
            newuserdata = new Usertable($scope.userdata);
            newuserdata.save();

            localStorage.firstName=$scope.userdata['firstName'];
            localStorage.username2=$scope.userdata['userName'];

            supersonic.ui.initialView.dismiss();
          }
          else {
            alert("Username already exists.");
          }
        }
        document.getElementById("signup-firstname").value = "";
        document.getElementById("signup-lastname").value = "";
        document.getElementById("signup-username").value = "";
        document.getElementById("signup-password").value = "";
      }


    };




    /*
    var usert = supersonic.data.model('userTable');
    var query = {"lastName": "Diaz"};
    usert.findAll({query: JSON.stringify(query)}).then(function(users){
      $scope.$apply( function () {
        $scope.users = users;
        supersonic.logger.log(users);
      });
    });
    */

  });