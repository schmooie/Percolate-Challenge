angular.module('percolate', [])
	.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
		$scope.user = {};
		$scope.submitForm = function () {
			console.log($scope.user);
			$http.post('/request-demo', $scope.user)
				.success(function(data) {
					console.log(data);
				});
		};
	}]);