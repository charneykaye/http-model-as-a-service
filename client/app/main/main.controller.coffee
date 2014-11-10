###
Using $http Model-as-a-Service in AngularJS
@author Nick Kaye <nick.c.kaye@gmail.com>
@repository https://github.com/outrightmental/meks
###

'use strict'

angular.module 'httpModelAsAServiceApp'
.controller 'MainCtrl', ($scope, $http) ->
  $scope.awesomeorders = []

  $http.get('/api/orders').success (awesomeorders) ->
    $scope.awesomeorders = awesomeorders

  $scope.addorder = ->
    return if $scope.neworder is ''
    $http.post '/api/orders',
      name: $scope.neworder

    $scope.neworder = ''

  $scope.deleteorder = (order) ->
    $http.delete '/api/orders/' + order._id
