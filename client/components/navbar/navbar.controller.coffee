###
Using $http Model-as-a-Service in AngularJS
@author Nick Kaye <nick.c.kaye@gmail.com>
@repository https://github.com/nickckaye/http-model-as-a-service
###

'use strict'

angular.module 'httpModelAsAServiceApp'
.controller 'NavbarCtrl', ($scope, $location) ->
  $scope.menu = [
    title: 'Home'
    link: '/'
  ]
  $scope.isCollapsed = true

  $scope.isActive = (route) ->
    route is $location.path()
