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
 * Things Editor U.I. is a Finite State Machine (FSM) using Machina.
 *
 * @typedef {angular.controller} ThingEditorCtrl
 */
angular.module('httpModelAsAServiceApp')
  .controller('ThingEditorCtrl', function ($scope, $rootScope, ThingService) {
    'use strict';

    /** @type {Object} to hold current thing data-object */
    $scope.current_thing = {};

    /** @type {*|null} to hold current loading id */
    $scope.loading_id = null;

    /**
     * We are using a simple JavaScript implementation of a
     * Finite State Machine (FSM) using a library called Machina
     * in thing to build a "View-Machine" (type of View-Controller).
     */
    /* global machina */
    var _machine = {}
    // states
      , STATE_OFFLINE = 'offline'
      , STATE_NEW = 'create'
      , STATE_LOADING = 'loading'
      , STATE_DISPLAYED = 'displayed'
      , STATE_SAVING = 'saving'
      , STATE_CREATING = 'creating'
      , STATE_ERRORED = 'errored'
    // events
      , EVENT_LOAD = 'load'
      , EVENT_SAVE = 'save'
      , EVENT_CANCEL = 'cancel'
      , EVENT_DESTROY = 'destroy'
    // list of states where loading bar ought to be displayed
      , states_where_is_loading =
        [
          STATE_CREATING,
          STATE_LOADING,
          STATE_SAVING
        ]
    // list of states where input form ought to be displayed
      , states_where_is_form =
        [
          STATE_NEW,
          STATE_DISPLAYED
        ]
      ;

    /**
     * Editor "Offline" State
     */
    _machine[STATE_OFFLINE] = {
      _onEnter: function () {
        $scope.loading_id = null;
        $scope.current_thing = {};
      }
    };

    /**
     * Editor "New" State
     */
    _machine[STATE_NEW] = {
      _onEnter: function () {
        $scope.loading_id = null;
        $scope.current_thing = {};
      }
    };
    _machine[STATE_NEW][EVENT_SAVE] = function () {
      this.transition(STATE_CREATING);
    };
    _machine[STATE_NEW][EVENT_CANCEL] = function () {
      this.transition(STATE_OFFLINE);
    };

    /**
     * Editor "Creating" State
     */
    _machine[STATE_CREATING] = {
      _onEnter: function () {
        // TODO: implement ThingService to create $scope.current_thing
        // this.transition(STATE_DISPLAYED);
        // TODO: display flash message "thing created"
        // TODO: display errors on input form fields
        // TODO: display flash message "thing failed to load"
      }
    };

    /**
     * Editor "Loading" State
     */
    _machine[STATE_LOADING] = {
      _onEnter: function () {
        ThingService.show($scope.loading_id)
          .success(function(record){
            $scope.current_thing = record;
            // TODO: display flash message "loaded thing"
            $scope.machine.transition(STATE_DISPLAYED);
          })
          .error(function(){
            // TODO: display flash message "thing failed to load"
            $scope.machine.transition(STATE_ERRORED);
          });
      },
      onExit: function () {
        $scope.loading_id = null;
      }
    };

    /**
     * Editor "Show" State
     */
    _machine[STATE_DISPLAYED] = {
      _onEnter: function () {
      }
    };

    /**
     * Editor "Saving" State
     */
    _machine[STATE_SAVING] = {
      _onEnter: function () {
        // TODO: implement ThingService to save the existing record
        // TODO: display errors on input form fields
        // TODO: display flash message "thing failed to save"
      }
    };

    /**
     * Editor "Errored" State
     */
    _machine[STATE_ERRORED] = {
      _onEnter: function () {
        $scope.loading_id = null;
        $scope.current_thing = {};
      }
    };

    /**
     * Under the hood, it's Finite State Machine (FSM) using Machina.
     * @typedef {machina.Fsm} thingFsm
     */
    $scope.machine = new machina.Fsm({
      initialState: STATE_OFFLINE,
      states: _machine
    });

    /**
     * Load an thing
     * @param id
     */
    $scope.machine.on(EVENT_LOAD, function (_id) {
      $scope.loading_id = _id;
      this.transition(STATE_LOADING);
    });

    /**
     * View-Machine Bindings
     */
    $rootScope.$on('thing_list_select', function (event, _id) {
      $scope.machine.trigger(EVENT_LOAD, _id);
    });
    $rootScope.$on('thing_list_create', function () {
      $scope.machine.transition(STATE_NEW);
    });
    $scope.save = function () {
      $scope.machine.handle(EVENT_SAVE);
    };
    $scope.cancel = function () {
      $scope.machine.handle(EVENT_CANCEL);
    };
    $scope.destroy = function () {
      $scope.machine.handle(EVENT_DESTROY);
    };

    /**
     * Return if loading board ought to be displayed
     */
    $scope.is_loading = function () {
      return states_where_is_loading.indexOf($scope.machine.state) >= 0;
    };

    /**
     * Return whether the form ought to be displayed
     */
    $scope.is_form = function () {
      return states_where_is_form.indexOf($scope.machine.state) >= 0;
    };

  });
