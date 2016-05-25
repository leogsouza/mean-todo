var appController = angular.module('todoController', []);

// inject the Todo service factory into our controller
appController.controller('mainController', ['$scope', '$http', 'Todos',
function ($scope, $http, Todos) {
  $scope.formData = {};

  // when landing on the page, get all todo and show them
  // use the service to get all todos
  Todos.get()
    .success(function (data) {
      $scope.todos = data;
    });

  // CREATE
  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {

    // validate the formData to make sure that something is there
    // if form is empty, nothing will happen
    // people can't just hold enter to keep adding the same to-do anymore
    if (!$.isEmptyObject($scope.formData)) {

      // call the create function from our service (returns a promise object)
      Todos.create($scope.formData)
        .success(function (data) {
          $scope.formData = {};
          $scope.todos = data;
        });
    }
  };

  // DELETE
  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    Todos.delete(id)
      .success(function (data) {
        $scope.todos = data;
      });
  };

}]);
