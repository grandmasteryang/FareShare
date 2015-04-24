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

          supersonic.ui.initialView.dismiss();
          //window.open("getting-started.html")
          break;
        }          
      }

      if (flag == false){
        alert("Invalid username or password!");
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
        $scope.userdata['phoneNumber'] = document.getElementById('signup-phonenumber').value;
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.userdata['userName']  ==  $scope.userdatas[i].userName ){           
            flag = true;
            break;
          }          
        }
        if ($scope.userdata['firstName'] == "" || $scope.userdata['lastName'] == "" || $scope.userdata['userName'] == "" || $scope.userdata['userPassword'] == "" || $scope.userdata['phoneNumber'] == ""){
          alert("Please fill in all blank areas!");
        } else {
          if (flag == false){
            newuserdata = new Usertable($scope.userdata);
            newuserdata.save();

            localStorage.username2=$scope.userdata['userName'];

            alert("Successfully sign up!");
            supersonic.ui.initialView.dismiss();
          }
          else {
            alert("Same username existed!! Input a new one:)");
          }
        }
        document.getElementById("signup-firstname").value = "";
        document.getElementById("signup-lastname").value = "";
        document.getElementById("signup-username").value = "";
        document.getElementById("signup-password").value = "";
        document.getElementById("signup-phonenumber").value = "";
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