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
 * Orders List U.I. is a Finite State Machine (FSM) using Machina.
 *
 * @typedef {angular.controller} OrderListCtrl
 */
angular.module('httpModelAsAServiceApp')
  .controller('OrderListCtrl', function ($scope /* , $http, OrderService */) {
    'use strict';
    /* global machina */
    var machine_states = {}
      , machine_events = {}
    // states
      , STATE_OFFLINE = 'offline'
      , STATE_REFRESHING = 'refreshing'
      , STATE_DISPLAY = 'display'
      , STATE_ERROR = 'error'
    // events
      , EVENT_REFRESH = 'refresh'
      ;
    /** @property {Array} */
    $scope.list_of_orders = [];

    /**
     * List "Offline" State
     */
    machine_states[STATE_OFFLINE] = {
      start: function () {
        this.transition(STATE_REFRESHING);
      }
    };

    /**
     * List "Refreshing" State
     */
    machine_states[STATE_REFRESHING] = {
      _onEnter: function () {
      },

      success: function () {
        this.transition(STATE_DISPLAY);
      },

      error: function () {
        this.transition(STATE_ERROR);
      }
    };

    /**
     * List "Display" State
     */
    machine_states[STATE_DISPLAY] = {
      refresh: function () {
        this.transition(STATE_REFRESHING);
      }
    };

    /**
     * Load an order
     */
    machine_events[EVENT_REFRESH] = function () {
      this.transition(STATE_REFRESHING);
      // TODO: cutoff any HTTP requests in-progress.
    };

    /**
     * Under the hood, it's Finite State Machine (FSM) using Machina.
     * @typedef {machina.Fsm} orderFsm
     */
    $scope.machine = new machina.Fsm({
      initialState: 'offline',
      states: machine_states,
      eventListeners: machine_events
    });

    /**
     * Load an <prder>
     * @param id
     */
    $scope.refresh = function (id) {
      $scope.machine.handle(EVENT_REFRESH, id);
    };

    // Begin by refreshing list, and show the Create Order form.
    $scope.refresh();

  });
