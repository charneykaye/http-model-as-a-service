###
Using $http Model-as-a-Service in AngularJS
@author Nick Kaye <nick.c.kaye@gmail.com>
@repository https://github.com/outrightmental/meks
###

'use strict'

angular.module 'httpModelAsAServiceApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true
