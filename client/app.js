var app = angular.module('percolate', []);

app.controller('MainCtrl', ['$scope', '$http', '$timeout',
  function($scope, $http, $timeout) {
    $scope.submitted = false;
    $scope.user = {};
    $scope.emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.sendingRequest = false;

    $scope.submitForm = function(isValid) {
    	$scope.sendingRequest = true;
      $scope.submitted = true;
      $scope.badRequest = false;
      $scope.demoRequestSuccess = false;
      if (isValid) {
        $http.post('/request-demo', $scope.user)
          .success(function(data) {
          	$scope.sendingRequest = false;
            $scope.demoRequestSuccess = true;
            $timeout(function() {
							$scope.user = {};
              $scope.demoRequestSuccess = false;
              $scope.submitted = false;
            }, 3000);
          })
          .error(function(data) {
          	$scope.sendingRequest = false;
          	$scope.badRequest = true;
          });
      } else {
      	$scope.sendingRequest = false;
      }
    };
  }
]);

app.directive('emailInput', [
  function() {
    return {
      restrict: 'A'
    };
  }
]);

app.directive('firstNameInput', [
  function() {
    return {
      restrict: 'A'
    };
  }
]);

app.directive('lastNameInput', [
  function() {
    return {
      restrict: 'A'
    };
  }
]);

app.directive('validateInput', [
  function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ctrl) {
      	// Don't want to irritate the user by validating their input as they're typing
        elem.on('focus', function() {
          elem.removeClass('bad-credentials');
        });

        // After a user has visited the input -- check its validity
        elem.on('blur', function() {
          if (attr.hasOwnProperty('emailInput')) {
          	// Invalid email
            if (!(scope.emailRegExp.test(elem[0].value))) {
              elem.addClass('bad-credentials');
              ctrl.$setValidity('invalid', false);
            } else {
              ctrl.$setValidity('invalid', true);
            }
          } else if (attr.hasOwnProperty('firstNameInput')) {
          	// Invalid first name
            if (!(/.+/gi.test(elem[0].value))) {
              elem.addClass('bad-credentials');
              ctrl.$setValidity('invalid', false);
            } else {
              ctrl.$setValidity('invalid', true);
            }
          } else if (attr.hasOwnProperty('lastNameInput')) {
          	// Invalid last name
            if (!(/.+/gi.test(elem[0].value))) {
              elem.addClass('bad-credentials');
              ctrl.$setValidity('invalid', false);
            } else {
              ctrl.$setValidity('invalid', true);
            }
          }
        });
      }
    };
  }
]);