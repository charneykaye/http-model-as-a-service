/**
 *
 * Simple AngularJS Example Project to demo the philosophy behind contemporary
 * front-end construction, specifically separating out concerns of a "model"
 * entirely, relying for our data models entirely on a JSON API.
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 * @typedef {angular.controller} OrderDashboardCtrl
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
     * Create an order
     * @param {*} attributes
     */
    $scope.create = function (attributes) {
      if (typeof attributes === 'object') {
        OrderService.create(attributes)
          .success(function (record) {
            $scope.current_order = record;
            // TODO: Flash message says "successfully created order"
            console.log('successfully created order');
            $scope.refresh();
          })
          .error(function () {
            // TODO: Flash message says "failed to create order"
            console.log('failed to create order');
          });
      } else {
        $scope.current_order = {
          _id: null
        };
      }
    };

    /**
     * Create an order
     * @param {*} record
     */
    $scope.update = function (record) {
      OrderService.update(record)
        .success(function () {
          // TODO: Flash message says "successfully updated order"
          console.log('successfully updated order');
          $scope.refresh();
        })
        .error(function () {
          // TODO: Flash message says "failed to update order"
          console.log('failed to update order');
        });
    };

    /**
     * Save the current_order
     */
    $scope.save = function () {
      if ('_id' in $scope.current_order && $scope.current_order._id) {
        $scope.update($scope.current_order);
      } else {
        $scope.create($scope.current_order);
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

    // Begin by refreshing list, and show the Create Order form.
    $scope.refresh();
    $scope.create();

  });
