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
 * Orders Editor U.I. is a Finite State Machine (FSM) using Machina.
 *
 * @typedef {angular.controller} OrderEditorCtrl
 */
angular.module('httpModelAsAServiceApp')
  .controller('OrderEditorCtrl', function ($scope /* , $http, OrderService */) {
    'use strict';
    /* global machina */
    var machine_states = {}
      , machine_events = {}
      , loading_id = null
    // states
      , STATE_OFFLINE = 'offline'
      , STATE_NEW = 'create'
      , STATE_LOADING = 'loading'
      , STATE_SHOW = 'show'
      , STATE_SAVING = 'saving'
      , STATE_CREATING = 'creating'
      , STATE_ERROR = 'error'
    // events
      , EVENT_LOAD = 'load'
      , EVENT_CREATE = 'create'
      , EVENT_SAVE = 'save'
      ;

    /** @property {Object} */
    $scope.current_order = {};

    /**
     * Editor "Offline" State
     */
    machine_states[STATE_OFFLINE] = {
      start: function () {
        this.transition(STATE_NEW);
      }
    };

    /**
     * Editor "New" State
     */
    machine_states[STATE_NEW] = {
      save: function () {
        this.transition(STATE_CREATING);
      }
    };

    /**
     * Editor "Creating" State
     */
    machine_states[STATE_CREATING] = {
      _onEnter: function () {
        // TODO: implement OrderService to create $scope.current_order
      },

      success: function () {
        this.transition(STATE_SHOW);
        // TODO: display flash message "order created"
      },

      error: function () {
        this.transition(STATE_NEW);
        // TODO: display errors on input form fields
        // TODO: display flash message "order failed to load"
      }
    };

    /**
     * Editor "Loading" State
     */
    machine_states[STATE_LOADING] = {
      _onEnter: function () {
        // TODO: implement OrderService to load loading_id
      },

      success: function () {
        this.transition(STATE_SHOW);
        // TODO: display flash message "loaded order"
      },

      error: function () {
        this.transition(STATE_ERROR);
        // TODO: display flash message "order failed to load"
      },

      onExit: function () {
        loading_id = null;
      }

    };

    /**
     * Editor "Show" State
     */
    machine_states[STATE_SHOW] = {
      _onEnter: function () {
      }
    };

    /**
     * Editor "Saving" State
     */
    machine_states[STATE_SAVING] = {
      _onEnter: function () {
        // TODO: implement OrderService to save the existing record
      },

      success: function () {
        this.transition(STATE_SHOW);
      },

      error: function () {
        this.transition(STATE_SHOW);
        // TODO: display errors on input form fields
        // TODO: display flash message "order failed to save"
      }
    };

    /**
     * Load an order
     * @param id
     */
    machine_events[EVENT_LOAD] = function (id) {
      loading_id = id;
      this.transition(STATE_LOADING);
      // TODO: cutoff any HTTP requests in-progress.
    };

    /**
     * Under the hood, it's Finite State Machine (FSM) using Machina.
     * @typedef {machina.Fsm} orderFsm
     */
    $scope.machine = new machina.Fsm({
      initialize: function () {
        // do stuff here if you want to perform more setup work
        // this executes prior to any state transitions or handler invocations
      },
      initialState: 'offline',
      states: machine_states,
      eventListeners: machine_events
    });

    /**
     * Load an <prder>
     * @param id
     */
    $scope.load = function (id) {
      $scope.machine.handle(EVENT_LOAD, id);
    };

    /**
     * Create a new <order>
     */
    $scope.create = function () {
      $scope.machine.handle(EVENT_CREATE);
    };

    /**
     * Save the current <order>
     */
    $scope.save = function () {
      $scope.machine.handle(EVENT_SAVE);
    };

  });
