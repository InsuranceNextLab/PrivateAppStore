angular.module('starter.services', [])
  .factory('fireBaseData', function($firebaseArray) {
    var ref = new Firebase("https://lnsappdistribution.firebaseio.com"),
      refAndroid = new Firebase("https://lnsappdistribution.firebaseio.com/Android"),
      refIOS = new Firebase("https://lnsappdistribution.firebaseio.com/IOS"),
      refWear = new Firebase("https://lnsappdistribution.firebaseio.com/Wear"),
      refWebs = new Firebase("https://lnsappdistribution.firebaseio.com/Web");
    return {
      refAllApps: function() {
        return $firebaseArray(ref);
      },
      refAndroid: function() {
        return $firebaseArray(refAndroid);
      },
      refIOS: function() {
        return $firebaseArray(refIOS);
      },
      refWebs: function() {
        return $firebaseArray(refWebs);
      },
      refWear: function() {
        return $firebaseArray(refWear);
      }
    }
  }).factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      var ref = new Firebase("https://leappdistribution.firebaseio.com");
      return $firebaseAuth(ref);
    }
  ])
  .factory("Auth", ["$firebaseAuth", "$rootScope",
    function($firebaseAuth, $rootScope) {
      var ref = new Firebase(firebaseUrl);
      return $firebaseAuth(ref);
    }
  ]).factory("addApps", function($firebaseArray, $ionicLoading, $ionicModal, $rootScope, $filter) {

    return {
      Adddetails: function($scope) {
         $scope.ddMMyyyy = $filter('date')(new Date(), 'dd-MM-yyyy');
        $ionicModal.fromTemplateUrl('templates/AddApp.html', {
          scope: $scope,
          focusFirstInput: true
        }).then(function(modal) {
           return  $scope.modal = modal;

        });
        $scope.changeItem = function(user) {
          platform_type = user.type;
          console.log(platform_type);
          var ref = new Firebase($scope.firebaseUrl + platform_type);
          $scope.appdetails = $firebaseArray(ref);
        }
        $scope.addApplication = function(user) {
          console.log("Create User Function called");
          if (user && user.appname && user.type && user.url) {
            $ionicLoading.show({
              template: 'Add Application ...'
            });
            $scope.appdetails.$add({
              app_name: user.appname,
              platform_type: user.type,
              app_url: user.url,
              app_desc: user.desc,
              created_date: $scope.ddMMyyyy,
              created_by: $rootScope.displayName
            });

            $ionicLoading.hide();
            $scope.modal.hide();

          } else {
            alert("Please fill all details");

          }
        }
      }
    }

  });
