###*
* Using $http Model-as-a-Service in AngularJS
* @author Nick Kaye <nick.c.kaye@gmail.com>
* @repository https://github.com/nickckaye/http-model-as-a-service
 ###
angular.module 'httpModelAsAServiceApp'
.controller 'MainCtrl', ($scope, Order) ->
  'use strict'

  $scope.orders = Order.list

###
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
###
