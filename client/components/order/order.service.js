/**
 *
 * OrderService Model-as-a-Service
 *
 * REST methods return Angular Promises
 * @typedef {angular.promise} HttpPromise
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */
angular.module('httpModelAsAServiceApp').service('OrderService', function ($http) {
  'use strict';

  /**
   * Order Model
   * @typedef {*} Order
   * @property {String} name
   * @property {String} info
   * @property {Number} amount
   */

  /**
   * Order Service
   * @typedef {angular.service} OrderService
   */
  var OrderService = {};

  /**
   * Create an Order with <attributes>
   * @param {*} attributes
   * @return {HttpPromise}
   */
  OrderService.create = function (attributes) {
    return $http.post('/api/orders', attributes);
  };

  /**
   * Show Order by <_id>
   * @param _id
   * @returns {HttpPromise}
   */
  OrderService.show = function (_id) {
    return $http.get('/api/orders/' + _id);
  };

  /**
   * Update Order by <_id> with new <attributes>
   * @param _id
   * @param {*} attributes
   * @returns {HttpPromise}
   */
  OrderService.update = function (_id, attributes) {
    return $http.post('/api/orders/' + _id, attributes);
  };

  /**
   * Destroy Order by <_id>
   * @param _id
   * @returns {HttpPromise}
   */
  OrderService.destroy = function (_id) {
    return $http.delete('/api/orders/' + _id);
  };

  /**
   * Fetch the list of orders from the server
   * @returns {HttpPromise}
   */
  OrderService.list = function () {
    return $http.get('/api/orders');
  };

  return OrderService;
});
