/**
 *
 * OrderService Model-as-a-Service
 *
 * REST methods return Angular Promises
 * @typedef {angular.Promise} HttpPromise
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 *
 */
angular.module('httpModelAsAServiceApp').service('OrderService', function ($http) {
  'use strict';
  var OrderService = {};

  /**
   Create a new Order with <attributes>
   @param {*} attributes
   @return {HttpPromise}
   */
  OrderService.create = function (attributes) {
    // TODO: create via $http
    return $http.post('/api/orders', attributes);
  };

  /**
   * Show Order by <id>
   * @param id
   * @returns {HttpPromise}
   */
  OrderService.show = function (id) {
    console.log(id);
    // TODO: show via $http
  };

  /**
   * Update Order by <id> with new <attributes>
   * @param id
   * @param {*} attributes
   * @returns {HttpPromise}
   */
  OrderService.update = function (id, attributes) {
    console.log(id,attributes);
    // TODO: update via $http
  };

  /**
   * Destroy Order by <id>
   * @param id
   * @returns {HttpPromise}
   */
  OrderService.destroy = function (id) {
    console.log(id);
    // TODO: destroy via $http
  };

  /**
   * Fetch the list of orders from the server
   * @returns {HttpPromise}
   */
  OrderService.list = function () {
    // TODO: list via $http
    return $http.get();
  };

  return OrderService;
});
