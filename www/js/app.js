// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var firebaseUrl = "https://inextappdistribution.firebaseio.com/";

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'firebase'])

.run(function($ionicPlatform, $rootScope, $location, Auth, $ionicLoading) {
  console.log("poda1");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    // To Resolve Bug
    ionic.Platform.fullScreen();

    $rootScope.firebaseUrl = firebaseUrl;
    $rootScope.displayName = null;
    $rootScope.offline = false;

    Auth.$onAuth(function(authData) {
      if (authData) {
        console.log(authData);
        console.log("Logged in as:", authData.uid);
        var ref = new Firebase(firebaseUrl);
        ref.child("users").child(authData.uid).once('value', function(snapshot) {
          var val = snapshot.val();
          $rootScope.displayName = val;
          if (val.displayName == "Muthu") {
            $rootScope.offline = true;
          }
        });
      } else {
        console.log("Logged out");
        $ionicLoading.hide();
        $location.path('/login');
      }
    });
    $rootScope.logout = function() {
      $rootScope.offline = false;
      console.log("Logging out from the app");
      $ionicLoading.show({
        template: 'Logging Out...'
      });
      Auth.$unauth();
    }


    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $location.path("/login");
      }
    });

  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

 $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0|itms-services|):/);

  $stateProvider

  // State to represent Login View
    .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl',
    resolve: {
      // controller will not be loaded until $waitForAuth resolves
      // Auth refers to our $firebaseAuth wrapper in the example above
      "currentAuth": ["Auth",
        function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$waitForAuth();
        }
      ]
    }
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'TabsController'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.ios', {
    url: '/ios',
    views: {
      'tab-ios': {
        templateUrl: 'templates/tab-ios.html',
        controller: 'iOSAppsCtrl'
      }
    }
  })

  .state('tab.android', {
    url: '/android',
    views: {
      'tab-android': {
        templateUrl: 'templates/tab-android.html',
        controller: 'AndroidAppsCtrl'
      }
    }
  })


  .state('tab.web', {
    url: '/web',
    views: {
      'tab-web': {
        templateUrl: 'templates/tab-web.html',
        controller: 'WebAppsCtrl'
      }
    }
  })

  .state('tab.web2', {
    url: '/web2',
    views: {
      'tab-web2': {
        templateUrl: 'templates/tab-web2.html',
        controller: 'WearAppsCtrl'
      }
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  //  $urlRouterProvider.otherwise('/tab/home');
  $urlRouterProvider.otherwise('/login');
});
