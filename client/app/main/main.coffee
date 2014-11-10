###
Using $http Model-as-a-Service in AngularJS
@author Nick Kaye <nick.c.kaye@gmail.com>
@repository https://github.com/outrightmental/meks
###

'use strict'

angular.module 'httpModelAsAServiceApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'main',
    url: '/'
    templateUrl: 'app/main/main.html'
    controller: 'MainCtrl'
