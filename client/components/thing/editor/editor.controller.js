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

    /** @type {*} replaced by the form(name='thing_form') */
    $scope.thing_form = {};

    /**
     * We are using a simple JavaScript implementation of a
     * Finite State Machine (FSM) using a library called Machina
     * in thing to build a "View-Machine" (type of View-Controller).
     */
    /* global machina */
    var _machine = {}
    // states
      , STATE_OFFLINE = 'offline'
      , STATE_LOADING = 'loading'
      , STATE_SAVING = 'saving'
      , STATE_CREATING = 'creating'
      , STATE_DESTROYING = 'destroying'
      , STATE_EDIT_NEW = 'edit_new'
      , STATE_EDIT_EXISTING = 'edit_existing'
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
          STATE_EDIT_NEW,
          STATE_EDIT_EXISTING
        ]
      ;

    /**
     * Editor "Offline" State
     */
    _machine[STATE_OFFLINE] = {
      _onEnter: function () {
        $rootScope.$broadcast('thing_editor_offline');
        $scope.loading_id = null;
        $scope.current_thing = {};
      }
    };

    /**
     * Editor "Edit New" State
     */
    _machine[STATE_EDIT_NEW] = {
      _onEnter: function () {
        $scope.loading_id = null;
        $scope.current_thing = {};
        $scope.thing_form.$setPristine();
      }
    };
    _machine[STATE_EDIT_NEW][EVENT_SAVE] = function () {
      if ($scope.thing_form.$invalid) {
        return false;
      }
      this.transition(STATE_CREATING);
    };
    _machine[STATE_EDIT_NEW][EVENT_CANCEL] = function () {
      // TODO: confirm before discarding new record
      this.transition(STATE_OFFLINE);
    };

    /**
     * Editor "Creating" State
     */
    _machine[STATE_CREATING] = {
      _onEnter: function () {
        ThingService.create($scope.current_thing)
          .success(function (record) {
            $scope.current_thing = record;
            $rootScope.$broadcast('thing_editor_created', $scope.current_thing);
            $scope.machine.transition(STATE_EDIT_EXISTING);
            // TODO: display flash message "created thing"
          })
          .error(function () {
            $scope.machine.transition(STATE_EDIT_NEW);
            // TODO: display flash message "failed to create thing"
          });
      }
    };

    /**
     * Editor "Loading" State
     */
    _machine[STATE_LOADING] = {
      _onEnter: function () {
        ThingService.show($scope.loading_id)
          .success(function (record) {
            $scope.current_thing = record;
            // TODO: display flash message "loaded thing"
            $scope.machine.transition(STATE_EDIT_EXISTING);
          })
          .error(function () {
            // TODO: display flash message "failed to load thing"
            $scope.machine.transition(STATE_ERRORED);
          });
      },
      onExit: function () {
        $scope.loading_id = null;
      }
    };

    /**
     * Editor "Edit Existing" State
     */
    _machine[STATE_EDIT_EXISTING] = {
      _onEnter: function () {
        $scope.thing_form.$setPristine();
      }
    };
    _machine[STATE_EDIT_EXISTING][EVENT_SAVE] = function () {
      // TODO: validate data before transition!!
      this.transition(STATE_SAVING);
    };
    _machine[STATE_EDIT_EXISTING][EVENT_CANCEL] = function () {
      // TODO: confirm before discarding changes
      this.transition(STATE_OFFLINE);
    };
    _machine[STATE_EDIT_EXISTING][EVENT_DESTROY] = function () {
      this.transition(STATE_DESTROYING);
    };

    /**
     * Editor "Saving" State
     */
    _machine[STATE_SAVING] = {
      _onEnter: function () {
        ThingService.update($scope.current_thing)
          .success(function (record) {
            $scope.current_thing = record;
            $rootScope.$broadcast('thing_editor_updated', $scope.current_thing);
            $scope.machine.transition(STATE_OFFLINE);
            // TODO: display flash message "updated thing"
          })
          .error(function () {
            $scope.machine.transition(STATE_EDIT_EXISTING);
            // TODO: display flash message "failed to create thing"
          });
      }
    };

    /**
     * Editor "Destroying" State
     */
    _machine[STATE_DESTROYING] = {
      _onEnter: function () {
        var _id = $scope.current_thing._id;
        ThingService.destroy(_id)
          .success(function () {
            $rootScope.$broadcast('thing_editor_destroyed', _id);
            $scope.machine.transition(STATE_OFFLINE);
            // TODO: display flash message "destroyed thing"
          })
          .error(function () {
            $scope.machine.transition(STATE_ERRORED);
            // TODO: display flash message "failed to destroyed thing"
          });
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
      $scope.machine.transition(STATE_EDIT_NEW);
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

    /**
     * Return whether the current thing is an existing record
     */
    $scope.is_existing = function () {
      return '_id' in $scope.current_thing && $scope.current_thing._id;
    };

    /**
     * Return whether the current thing is an existing record
     */
    $scope.is_new = function () {
      return !$scope.is_existing();
    };

  });
