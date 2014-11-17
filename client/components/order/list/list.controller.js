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
    .controller('OrderListCtrl', function ($scope, $rootScope, OrderService) {
        'use strict';
        /* global machina */
        var machine_states = {}
        // states
            , STATE_OFFLINE = 'offline'
            , STATE_REFRESHING = 'refreshing'
            , STATE_DISPLAYED = 'displayed'
            , STATE_SELECTED = 'selected'
            , STATE_ERRORED = 'errored'
        // events
            , EVENT_REFRESH = 'refresh'
            , EVENT_SELECT = 'select'
            , EVENT_CREATE = 'create'
            ;
        /** @property {Array} */
        $scope.list_of_orders = [];
        /** @property {*|null} */
        $scope.selected_id = null;

        /**
         * List "Offline" State
         */
        machine_states[STATE_OFFLINE] = {
            _onEnter: function () {
                this.handle('start');
            },
            start: function () {
                this.transition(STATE_REFRESHING);
            }
        };

        /**
         * List "Refreshing" State
         */
        machine_states[STATE_REFRESHING] = {
            _onEnter: function () {
                OrderService.list()
                    .success(function (records) {
                        if (records.length) {
                            $scope.list_of_orders = records;
                            $scope.machine.transition(STATE_DISPLAYED);
                        } else {
                            $scope.list_of_orders = [];
                            $scope.machine.transition(STATE_SELECTED);
                        }
                    })
                    .error(function () {
                        this.transition(STATE_ERRORED);
                    });
            }
        };

        /**
         * List "Display" State
         */
        machine_states[STATE_DISPLAYED] = {
            _onEnter: function () {
                if ($scope.selected_id !== null) {
                    this.transition(STATE_SELECTED);
                }
            }
        };

        /**
         * List "Selected" State
         */
        machine_states[STATE_SELECTED] = {
            _onEnter: function () {
            }
        };

        /**
         * List "Errored" State
         */
        machine_states[STATE_ERRORED] = {
            _onEnter: function () {
            }
        };

        /**
         * Under the hood, it's Finite State Machine (FSM) using Machina.
         * @typedef {machina.Fsm} orderFsm
         */
        $scope.machine = new machina.Fsm({
            initialState: STATE_OFFLINE,
            states: machine_states
        });


        /**
         * Refresh the list of orders
         */
        $scope.machine.on(EVENT_REFRESH, function () {

            this.transition(STATE_REFRESHING);
        });

        /**
         * Select an order
         * @param _id
         */
        $scope.machine.on(EVENT_SELECT, function (_id) {
            $scope.selected_id = _id;
            $rootScope.$broadcast('dashboard_order_select', {_id: $scope.selected_id});
            this.transition(STATE_SELECTED);
        });

        /**
         * Select an order
         */
        $scope.machine.on(EVENT_CREATE, function () {
            $scope.selected_id = null;
            $rootScope.$broadcast('dashboard_order_create');
            this.transition(STATE_DISPLAYED);
        });

        /**
         * View-Machine Binding for "refresh()"
         */
        $scope.refresh = function () {
            $scope.machine.trigger(EVENT_REFRESH);
        };

        /**
         * View-Machine Binding for "create()"
         */
        $scope.create = function () {
            $scope.machine.trigger(EVENT_CREATE);
        };

        /**
         * View-Machine Binding for "select(_id)"
         * @param _id
         */
        $scope.select = function (_id) {
            $scope.machine.trigger(EVENT_SELECT, _id);
        };

    });
