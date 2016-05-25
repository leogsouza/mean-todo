var appTodo = angular.module('appTodo', []);

appTodo.controller('mainController', function ($scope, $http) {
  $scope.formData = {};

  $http.get('/api/todos')
    .success(function (data) {
      $scope.todos = data;
    })
    .error(function (data) {
      console.log('Error on get todos', data);
    });

  $scope.createTodo = function () {

    $http.post('/api/todos', $scope.formData)
        .success(function (data) {
          $scope.formData = {};
          $scope.todos = data;
        })
        .error(function (data) {
          console.log('Error on save todo', data);
        });
  };

  $scope.deleteTodo = function (id) {
    $http.delete('/api/todos/' + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log('Error on delete todo', data);
      });
  };

});
