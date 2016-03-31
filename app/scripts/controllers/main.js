'use strict';

/**
 * @ngdoc function
 * @name vijayGitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vijayGitApp
 */
angular.module('vijayGitApp')
  .controller('MainCtrl', function ($scope) {

        $scope.processing= function(){
            $scope.upload($scope.file);
        };


  });
