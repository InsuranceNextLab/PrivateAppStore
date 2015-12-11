angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $rootScope) {
    //console.log('Login Controller Initialized');

    var ref = new Firebase($scope.firebaseUrl);
    var auth = $firebaseAuth(ref);
    $scope.signIn = function(user) {

      if (user && user.email && user.pwdForLogin) {
        $ionicLoading.show({
          template: 'Signing In...'
        });
        auth.$authWithPassword({
          email: user.email,
          password: user.pwdForLogin
        }).then(function(authData) {
          console.log("Logged in as:" + authData.uid);
          ref.child("users").child(authData.uid).once('value', function(snapshot) {
            var val = snapshot.val();
            // To Update AngularJS $scope either use $apply or $timeout
            $scope.$apply(function() {
              console.log(val.displayName);
              if (val.displayName == "Muthu") {
                $rootScope.offline = true;
              }
              $rootScope.displayName = val;
            });
          });
          $ionicLoading.hide();
          $state.go('tab.home');
        }).catch(function(error) {
          alert("Authentication failed:" + error.message);
          $ionicLoading.hide();
        });
      } else
        alert("Please enter email and password both");
    }
  })
  .controller('HomeCtrl', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading) {
    var ref = new Firebase($scope.firebaseUrl);
    var auth = $firebaseAuth(ref);
    $ionicModal.fromTemplateUrl('templates/signup.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.createUser = function(user) {
      console.log("Create User Function called");
      if (user && user.email && user.password && user.displayname) {
        $ionicLoading.show({
          template: 'Signing Up...'
        });

        auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function(userData) {
          alert("User created successfully!");
          ref.child("users").child(userData.uid).set({
            email: user.email,
            displayName: user.displayname
          });
          $ionicLoading.hide();
          $scope.modal.hide();
        }).catch(function(error) {
          alert("Error: " + error);
          $ionicLoading.hide();
        });
      } else
        alert("Please fill all details");
    }


  })

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })
  .controller('TabsController', function($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading) {

  })

.controller('iOSAppsCtrl', function($scope, fireBaseData, addApps) {
  $scope.apps = fireBaseData.refIOS();
  $scope.ios = {
    test : "selected"
  }
  addApps.Adddetails($scope);
})

.controller('AndroidAppsCtrl', function($scope, fireBaseData, addApps) {
  $scope.apps = fireBaseData.refAndroid();
  $scope.android = {
    test : "selected"
  }
   addApps.Adddetails($scope);
})

.controller('WebAppsCtrl', function($scope, fireBaseData, addApps) {
  $scope.apps = fireBaseData.refWebs();
  $scope.webs = {
    test : "selected"
  }
  addApps.Adddetails($scope);
})
.controller('WearAppsCtrl', function($scope, fireBaseData, addApps) {
  $scope.apps = fireBaseData.refWear();
  $scope.wear = {
    test : "selected"
  }
  addApps.Adddetails($scope);
});
