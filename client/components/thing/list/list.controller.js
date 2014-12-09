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
 * Things List U.I. is a Finite State Machine (FSM) using Machina.
 *
 * @typedef {angular.controller} ThingListCtrl
 */
angular.module('httpModelAsAServiceApp')
  .controller('ThingListCtrl', function ($scope, $rootScope, ThingService) {
    'use strict';

    /**
     * @type {Array} to store thing data-objects to back the list.
     */
    $scope.list_of_things = [];

    /**
     * @type {*|null} <id> of the currently selected thing
     */
    $scope.selected_id = null;

    /**
     * We are using a simple JavaScript implementation of a
     * Finite State Machine (FSM) using a library called Machina
     * in thing to build a "View-Machine" (type of View-Controller).
     */
    /* global machina */
    var _machine = {}
    // states
      , STATE_REFRESHING = 'refreshing'
      , STATE_DISPLAYED = 'displayed'
      , STATE_SELECTED = 'selected'
      , STATE_ERRORED = 'errored'
    // events
      , EVENT_REFRESH = 'refresh'
      , EVENT_SELECT = 'select'
      , EVENT_CURRENT = 'select'
      , EVENT_DESELECT = 'deselect'
      , EVENT_CREATE = 'create'
      ;

    /**
     * List "Refreshing" State
     */
    _machine[STATE_REFRESHING] = {
      _onEnter: function () {
        ThingService.list()
          .success(function (records) {
            if (records && records.length) {
              $scope.list_of_things = records;
            } else {
              $scope.list_of_things = [];
            }
            $scope.machine.transition(STATE_DISPLAYED);
          })
          .error(function () {
            this.transition(STATE_ERRORED);
          });
      }
    };

    /**
     * List "Display" State
     */
    _machine[STATE_DISPLAYED] = {
      _onEnter: function () {
        if ($scope.selected_id !== null) {
          this.transition(STATE_SELECTED);
        }
      }
    };

    /**
     * List "Selected" State
     */
    _machine[STATE_SELECTED] = {
      _onEnter: function () {
      }
    };

    /**
     * List "Errored" State
     */
    _machine[STATE_ERRORED] = {
      _onEnter: function () {
      }
    };

    /**
     * Under the hood, it's Finite State Machine (FSM) using Machina.
     * @typedef {machina.Fsm} thingFsm
     */
    $scope.machine = new machina.Fsm({
      initialState: STATE_REFRESHING,
      states: _machine
    });


    /**
     * Refresh the list of things
     */
    $scope.machine.on(EVENT_REFRESH, function () {
      this.transition(STATE_REFRESHING);
    });

    /**
     * Select an thing
     * @param _id
     */
    $scope.machine.on(EVENT_SELECT, function (_id) {
      $scope.selected_id = _id;
      $rootScope.$broadcast('thing_list_select', $scope.selected_id);
      this.transition(STATE_SELECTED);
    });

    /**
     * Deselect anything
     */
    $scope.machine.on(EVENT_DESELECT, function () {
      $scope.selected_id = null;
      this.transition(STATE_DISPLAYED);
    });

    /**
     * Current thing is updated
     * @param _id
     */
    $scope.machine.on(EVENT_CURRENT, function (_id) {
      $scope.selected_id = _id;
      this.transition(STATE_SELECTED);
    });

    /**
     * Create a new thing
     */
    $scope.machine.on(EVENT_CREATE, function () {
      $rootScope.$broadcast('thing_list_create');
      this.handle(EVENT_DESELECT);
    });

    /**
     * View-Machine Bindings
     */
    $scope.refresh = function () {
      $scope.machine.trigger(EVENT_REFRESH);
    };
    $scope.create = function () {
      $scope.machine.trigger(EVENT_CREATE);
    };
    $scope.select = function (thing) {
      $scope.machine.trigger(EVENT_SELECT, thing._id);
    };
    $rootScope.$on('thing_editor_offline', function () {
      $scope.machine.trigger(EVENT_DESELECT);
    });
    $rootScope.$on('thing_editor_created', function (/* event, record */) {
      // TODO: before refresh, add this one created record to the list
      $scope.machine.trigger(EVENT_REFRESH);
    });
    $rootScope.$on('thing_editor_updated', function (/* event, record */) {
      // TODO: before refresh, refresh this one updated record in the list
      $scope.machine.trigger(EVENT_REFRESH);
    });
    $rootScope.$on('thing_editor_destroyed', function (/* event, _id */) {
      // TODO: before refresh, remove this one destroyed record to the list
      $scope.machine.trigger(EVENT_REFRESH);
    });

  });
