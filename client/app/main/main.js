'use strict';

angular.module('httpModelAsAServiceApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'OrderDashboardCtrl'
      });
  });
