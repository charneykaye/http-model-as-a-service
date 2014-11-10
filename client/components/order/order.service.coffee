###

Order Model-as-a-Service

Using $http Model-as-a-Service in AngularJS
@author Nick Kaye <nick.c.kaye@gmail.com>
@repository https://github.com/nickckaye/http-model-as-a-service

###
angular.module 'httpModelAsAServiceApp'
.service 'Order', ($http) ->
  'use strict'

  _orders = {}
  _ordersLoaded = false

  Order = {}

  ###
  Create a new Order
  @param {*} attributes
  @returns {HttpPromise}
  ###
  Order.create = (attributes) ->
    $http.post('/api/orders')

  ###
  Get Order by _id
  @param _id
  @returns {*}
  ###
  Order.show = (_id) ->
    (if (_id of _orders) then _orders[_id] else null)

  ###
  Get Order by _id
  @param _id
  @returns {*}
  ###
  Order.update = (_id) ->
    (if (_id of _orders) then _orders[_id] else null)

  ###
  Get Order by _id
  @param _id
  @returns {*}
  ###
  Order.delete = (_id) ->
    (if (_id of _orders) then _orders[_id] else null)

  ###
  Refresh the list of orders from the server
  ###
  Order.refresh = () ->
    $http.get()

  ###
  Store a order
  @param order {*}
  $rootScope.storeOrder = (order) ->
    _orders[order._id] = order  if order and "_id" of order
    return


  Store multiple orders
  @param orders Array
  $rootScope.storeOrders = (orders) ->
    if orders and orders.length
      i = 0

      while i < orders.length
        $rootScope.storeOrder orders[i]
        i++
    _ordersLoaded = true
    return


  Get Avatar URL for Order by _id
  @param _id
  @returns {*}
  Order.getOrderAvatarUrl = (_id) ->
    order = Order.getOrder(_id)
    (if (order and "photoUrl" of order) then order.photoUrl else "/images/default-avatar.png")
  ###

  ###
  Get Name for Order by _id
  @param _id
  @returns {*}
  ###
  Order.getOrderName = (_id) ->
    order = Order.getOrder(_id)
    (if (order and "name" of order) then order.name else "T.B.D.")


  ###
  Add
  @return bool
  ###
  Order.isReady = ->
    !!_ordersLoaded

  Order
