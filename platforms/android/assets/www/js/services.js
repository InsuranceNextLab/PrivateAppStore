angular.module('starter.services', [])
	.factory("iOSApps", function ($firebaseArray) {
		var itemsRef = new Firebase("https://leappdistribution.firebaseio.com/iosApps");
		return $firebaseArray(itemsRef);
	}).factory("AndroidApps", function ($firebaseArray) {
		var itemsRef = new Firebase("https://leappdistribution.firebaseio.com/androidApps");
		return $firebaseArray(itemsRef);
	}).factory("WebApps", function ($firebaseArray) {
		var itemsRef = new Firebase("https://leappdistribution.firebaseio.com/webApps");
		return $firebaseArray(itemsRef);
	}).factory("Auth", ["$firebaseAuth",
  		function ($firebaseAuth) {
			var ref = new Firebase("https://leappdistribution.firebaseio.com");
			return $firebaseAuth(ref);
  		}
	]);