/**
 *
 * Simple AngularJS Example Project to demo the philosophy behind contemporary
 * front-end construction, specifically separating out concerns of a "model"
 * entirely, relying for our data models entirely on a JSON API.
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */
angular.module('httpModelAsAServiceApp')
  .controller('OrderDashboardCtrl', function ($scope, $http, OrderService) {
    'use strict';
    /** @property {Object} */
    $scope.current_order = {};
    /** @property {Array} */
    $scope.list_of_orders = [];

    /**
     * Refresh the list of Orders
     */
    $scope.refresh = function () {
      $scope.list_of_orders = null;
      OrderService.list()
        .success(function (records) {
          $scope.list_of_orders = records;
        })
        .error(function () {
          console.log('Failed to load Orders from API.');
        });
    };

    /**
     * Create a new order
     * @param {*} attributes
     */
    $scope.create = function (attributes) {
      if (typeof attributes === 'object') {

      } else {
        $scope.current_order = {
          _id: null
        };
      }
    };

    /**
     * Show one order
     * @param {String} id
     */
    $scope.show = function (id) {
      $scope.current_order = null;
      OrderService.show(id)
        .success(function (record) {
          $scope.current_order = record;
        })
        .error(function () {
          console.log('Failed to load Orders from API.');
        });
    };

    /*
     $http.get('/api/things').success(function (awesomeThings) {
     $scope.awesomeThings = awesomeThings;
     });

     $scope.addThing = function () {
     if ($scope.newThing === '') {
     return;
     }
     $http.post('/api/things', {name: $scope.newThing});
     $scope.newThing = '';
     };

     $scope.deleteThing = function (thing) {
     $http.delete('/api/things/' + thing._id);
     };
     */

    // Refresh now
    $scope.refresh();

  });
