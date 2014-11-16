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
 * @typedef {angular.service} OrderService
 */
angular.module('httpModelAsAServiceApp').service('OrderService', function ($http,$q) {
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
   * Create an Order <record>
   * @param {*} record
   * @return {HttpPromise|Promise}
   */
  OrderService.create = function (record) {
    if (typeof '_id' in record) {
      return $q.reject();
    }
    return $http.post('/api/orders', record);
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
   * @param {*} record
   * @returns {HttpPromise|Promise}
   */
  OrderService.update = function (record) {
    if (typeof '_id' in record && record._id) {
      var data = record;
      delete data['_id'];
      return $http.post('/api/orders/' + record._id, data);
    } else {
      return $q.reject();
    }
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
