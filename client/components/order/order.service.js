/**
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 *
 * Simple AngularJS Example Project to demo the philosophy behind contemporary
 * front-end construction, specifically separating out concerns of a "model",
 * relying for our data models entirely on a JSON API.
 *
 * @typedef {angular.service} OrderService
 *
 * OrderService Model-as-a-Service
 *
 * REST methods return Angular Promises
 * @typedef {angular.promise} HttpPromise
 *
 */
angular.module('httpModelAsAServiceApp').service('OrderService', function ($http, $q) {
  'use strict';

  /**
   * Order Model
   * @typedef {*} Order
   * @property {String} name
   * @property {String} info
   * @property {Number} amount
   * @property {Number} purchase_number
   * @property {Date} created_at
   */

  /**
   * Order Service
   * @typedef {angular.service} OrderService
   */
  var OrderService = {};

  /**
   * Fetch the list of orders via the API.
   * @returns {HttpPromise}
   */
  OrderService.list = function () {
    return $http.get('/api/orders');
  };

  /**
   * Create an Order <record> via the API.
   * @param {*} record cannot have an <_id>
   * @return {HttpPromise|Promise}
   */
  OrderService.create = function (record) {
    if (!('_id' in record)) {
      return $http.post('/api/orders', record);
    } else {
      return $q.reject();
    }
  };

  /**
   * Show Order by <_id> from the API.
   * @param _id
   * @returns {HttpPromise}
   */
  OrderService.show = function (_id) {
    return $http.get('/api/orders/' + _id.toString());
  };

  /**
   * Update an Order <record> via the API.
   * @param {*} record must have an <_id>
   * @returns {HttpPromise|Promise}
   */
  OrderService.update = function (record) {
    if (typeof '_id' in record && record._id) {
      var data = record;
      delete data._id;
      return $http.post('/api/orders/' + record._id, data);
    } else {
      return $q.reject();
    }
  };

  /**
   * Destroy an Order by <_id> via the API.
   * @param _id
   * @returns {HttpPromise}
   */
  OrderService.destroy = function (_id) {
    return $http.delete('/api/orders/' + _id);
  };

  // export
  return OrderService;
});
