'use strict';

/**
 * @ngdoc overview
 * @name vijayGitApp
 * @description
 * # vijayGitApp
 *
 * Main module of the application.
 */
angular
  .module('vijayGitApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
