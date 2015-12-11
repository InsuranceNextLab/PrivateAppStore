angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats) {
	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	$scope.chats = Chats.all();
	$scope.remove = function (chat) {
		Chats.remove(chat);
	};
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('HomeCtrl', function ($scope) {

})

.controller('iOSAppsCtrl', function ($scope, iOSApps) {
	$scope.apps = iOSApps;
})

.controller('AndroidAppsCtrl', function ($scope, AndroidApps) {
	$scope.apps = AndroidApps;
})

.controller('WebAppsCtrl', function ($scope, WebApps) {
	$scope.apps = WebApps;
});