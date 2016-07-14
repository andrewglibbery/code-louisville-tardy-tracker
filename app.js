var app = angular.module('tardyTrackerApp', ['ui.router']);

app.factory('classes', [function() {
	var o = {
		classes: []
	};
	return o;
}]);

app.controller('MainCtrl', [
'$scope',
'classes',
function($scope, classes){
  $scope.classes = classes.classes;

	$scope.addClass = function() {
		if(!$scope.className || $scope.className === '') { return; };
			$scope.classes.push({
				classPeriod: $scope.className,
				students: [
					{name: "Alexa", tardies: 0},
					{name: "Albie", tardies: 3}
				]
			});
		$scope.className = '';
	};

}]);

app.controller('ClassesCtrl', [
'$scope',
'$stateParams',
'classes',
function($scope, $stateParams, classes){
	$scope.class = classes.classes[$stateParams.id];

	$scope.addStudent = function(){
		if($scope.studentName === '') {
			return
		};

		$scope.class.students.push({
			name: $scope.studentName,
			tardies: 0
		});
		$scope.studentName = '';
	};
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })

    .state('classes', {
	  url: '/classes/{id}',
	  templateUrl: '/classes.html',
	  controller: 'ClassesCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);