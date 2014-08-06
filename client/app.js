var app = angular.module('percolate', []);

app.controller('MainCtrl', ['$scope', '$http', 'Email',
  function($scope, $http, Email) {
    $scope.formInvalid = false;
    $scope.user = {};
    $scope.submitForm = function() {
    	// $scope.formInvalid = false;

      if ($scope.formInvalid === false) {
        $http.post('/request-demo', $scope.user)
          .success(function(data) {
            console.log(data);
          });
      } else {
        $scope.formInvalid = true;
        console.log('Bad!');
      }
    };
  }
]);

app.service('Email', [

  function() {
    return {
      validate: function(email) {
        var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validEmail.test(email);
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

app.directive('validateInput', ['Email',
  function(Email) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attr, ctrl) {
      	elem.on('focus', function() {
      		elem.removeClass('bad-credentials');
      	});

        elem.on('blur', function() {
        	console.log(elem[0].value);
          if (attr.hasOwnProperty('emailInput')) {
            if (!Email.validate(elem[0].value)) {
              elem.addClass('bad-credentials');
              ctrl.$setValidity('invalid', true);
              scope.formInvalid = true;
            } else {
            	ctrl.$setValidity('invalid', false);
            }
          } else if (attr.hasOwnProperty('firstNameInput')) {
            if (!(/.+/gi).test(elem[0].value)) {
              elem.addClass('bad-credentials');
              ctrl.$setValidity('invalid', true);
              scope.formInvalid = true;
            } else {
            	ctrl.$setValidity('invalid', false);
            }
          } else if (attr.hasOwnProperty('lastNameInput')) {
            if (!(/.+/gi).test(elem[0].value)) {
              elem.addClass('bad-credentials');
              ctrl.$setValidity('invalid', true);
              scope.formInvalid = true;
            } else {
            	ctrl.$setValidity('invalid', false);
            }
          }
        });
      }
    };
  }
]);