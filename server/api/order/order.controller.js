/**
 * Order Controller
 *
 * Using Rails-like standard naming convention for endpoints.
 * GET     /orders              ->  index
 * POST    /orders              ->  create
 * GET     /orders/:id          ->  show
 * PUT     /orders/:id          ->  update
 * DELETE  /orders/:id          ->  destroy
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

var _ = require('lodash');
var order = require('./order.model');

// Get list of orders
exports.index = function (req, res) {
  order.find(function (err, orders) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, orders);
  });
};

// Get a single order
exports.show = function (req, res) {
  order.findById(req.params.id, function (err, order) {
    if (err) {
      return handleError(res, err);
    }
    if (!order) {
      return res.send(404);
    }
    return res.json(order);
  });
};

// Creates an order in the DB.
exports.create = function (req, res) {
  order.create(req.body, function (err, order) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, order);
  });
};

// Updates an existing order in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  order.findById(req.params.id, function (err, order) {
    if (err) {
      return handleError(res, err);
    }
    if (!order) {
      return res.send(404);
    }
    var updated = _.merge(order, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function (req, res) {
  order.findById(req.params.id, function (err, order) {
    if (err) {
      return handleError(res, err);
    }
    if (!order) {
      return res.send(404);
    }
    order.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
