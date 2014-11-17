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
 * @typedef {angular.service} ThingService
 *
 * ThingService Model-as-a-Service
 *
 * REST methods return Angular Promises
 * @typedef {angular.promise} HttpPromise
 *
 */
angular.module('httpModelAsAServiceApp').service('ThingService', function ($http, $q) {
  'use strict';

  /**
   * Thing Model
   * @typedef {*} Thing
   * @property {String} name
   * @property {String} info
   * @property {Number} amount
   * @property {Number} purchase_number
   * @property {Date} created_at
   */

  /**
   * Thing Service
   * @typedef {angular.service} ThingService
   */
  var ThingService = {};

  /**
   * Fetch the list of things via the API.
   * @returns {HttpPromise}
   */
  ThingService.list = function () {
    return $http.get('/api/things');
  };

  /**
   * Create an Thing <record> via the API.
   * @param {*} record cannot have an <_id>
   * @return {HttpPromise|Promise}
   */
  ThingService.create = function (record) {
    if (!('_id' in record)) {
      return $http.post('/api/things', record);
    } else {
      return $q.reject();
    }
  };

  /**
   * Show Thing by <_id> from the API.
   * @param _id
   * @returns {HttpPromise}
   */
  ThingService.show = function (_id) {
    return $http.get('/api/things/' + _id.toString());
  };

  /**
   * Update an Thing <record> via the API.
   * @param {*} record must have an <_id>
   * @returns {HttpPromise|Promise}
   */
  ThingService.update = function (record) {
    if (typeof '_id' in record && record._id) {
      var data = record;
      delete data._id;
      return $http.post('/api/things/' + record._id, data);
    } else {
      return $q.reject();
    }
  };

  /**
   * Destroy an Thing by <_id> via the API.
   * @param _id
   * @returns {HttpPromise}
   */
  ThingService.destroy = function (_id) {
    return $http.delete('/api/things/' + _id);
  };

  // export
  return ThingService;
});
