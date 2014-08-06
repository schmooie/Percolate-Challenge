var app = angular.module('percolate', []);

app.controller('MainCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.submitted = false;
    $scope.user = {};
    $scope.emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $scope.submitForm = function(isValid) {
      $scope.submitted = true;
      if (isValid) {
        $http.post('/request-demo', $scope.user)
          .success(function(data) {
            console.log(data);
          });
      } else {
        console.log('Bad credentials!');
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

        elem.on('focus', function() {
          elem.removeClass('bad-credentials');
        });

        elem.on('blur', function() {
          console.log(elem[0].value);
          if (attr.hasOwnProperty('emailInput')) {
            console.log('Email good?', scope.emailRegExp.test(elem[0].value));
            if (!(scope.emailRegExp.test(elem[0].value))) {
              elem.addClass('bad-credentials');
            }
          } else if (attr.hasOwnProperty('firstNameInput')) {
            if (!(/.+/gi.test(elem[0].value))) {
              elem.addClass('bad-credentials');
            }
          } else if (attr.hasOwnProperty('lastNameInput')) {
            if (!(/.+/gi.test(elem[0].value))) {
              elem.addClass('bad-credentials');
            }
          }
        });
      }
    };
  }
]);