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
         if ($scope.userdata['firstName']) {
          localStorage.removeItem("username2");
          localStorage.removeItem("firstName");
          localStorage.removeItem("objectId");
          //localStorage.removeItem("password");
          localStorage.firstName=$scope.userdata['firstName'];
          localStorage.username2=$scope.userdata['userName'];
          //localStorage.password=$scope.userdata['userPassword'];
          for (i = 0; i < $scope.userdatas.length; i++){
            if ($scope.userdatas[i].userName == $scope.userdata['userName'] && $scope.userdatas[i].userPassword == $scope.userdata['userPassword']) {
              localStorage.objectId=$scope.userdatas[i].id;
              //alert(localStorage.objectId);
              break;
            }
          }
          document.getElementById("signup-firstname").value = "";
          document.getElementById("signup-lastname").value = "";
          document.getElementById("signup-username").value = "";
          document.getElementById("signup-password").value = "";
          $scope.$apply( function () {
            $scope.showSpinner = false;
          });
          supersonic.ui.initialView.dismiss();
         }        
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
            $scope.showSpinner = true;
          }
          else {
            document.getElementById("signup-username").value = "";
            alert("Username already exists.");
          }
        }
      }


    };
  });