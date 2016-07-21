var app = angular.module('tardyTrackerApp', ['ui.router']);

app.factory('classes', ['$http', function($http) {
	var o = {
		classes: []
	};
	 o.getAll = function() {
	    return $http.get('/classes').success(function(data){
	      angular.copy(data, o.classes);
	    });
	  };

	 o.get = function(id) {
	 	return $http.get('/classes/' + id).then(function(res){
	 		return res.data;
	 	});
	 };

	 o.create = function(newClass) {
	  return $http.post('/classes', newClass).success(function(data){
	    o.classes.push(data);
	  });
	};


	/*o.addNewStudent = function(id, students) {
		return $http.post('/classes/' + id + '/students', students);
	};*/
	return o;
}]);

app.controller('MainCtrl', [
'$scope',
'classes',
function($scope, classes){
  $scope.classes = classes.classes;

	$scope.addClass = function() {
		if(!$scope.className || $scope.className === '') { return; };
			classes.create({
				classPeriod: $scope.className,
				// students: [
				// 	{name: "Alexa", tardies: 0},
				// 	{name: "Albie", tardies: 3}
				// ]
			});
		$scope.className = '';
	};

}]);

app.controller('ClassesCtrl', [
'$scope',
'$stateParams',
'classes',
'classInfo',
function($scope, $stateParams, classes, classInfo){
	$scope.class = classInfo;

	$scope.addStudent = function(){
		if($scope.studentName === '') {
			return};

		$scope.class.students.push({
			name: $scope.studentName,
			tardies:0
		});
		// classes.addNewStudent(classes._id, {
		// 	studentName: $scope.studentName,
		// 	tardies: 0,
		// }).success(function(student) {
		// 	$scope.class.students.push(student)
		// });
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
      controller: 'MainCtrl',
      resolve: {
      	classesPromise: ['classes', function(classes){
      		return classes.getAll();
      	}]
      }
    })

    .state('classes', {
	  url: '/classes/{id}',
	  templateUrl: '/classes.html',
	  controller: 'ClassesCtrl',
	  resolve: {
	    classInfo: ['$stateParams', 'classes', function($stateParams, classes) {
	      return classes.get($stateParams.id);
	    }]
	  }
	});

  $urlRouterProvider.otherwise('home');
}]);