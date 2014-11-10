/**
 * Order Model
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */
'use strict';
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/**
 * @typedef {*} Order
 * @property {String} name
 * @property {String} info
 * @property {Number} purchase_number
 * @property {Number} amount
 * @property {Date} created_at
 */
var orderSchema = new Schema({
  name: String,
  info: String,
  purchase_number: Number,
  amount: Number,
  created_at: Date
});

/**
 * Pre-save behavior
 */
orderSchema.pre("save", function (next) {
  if (typeof this.name === 'string') {
    // TODO: sanitize string
  } else {
    return next(new Error("Name must be text."));
  }
  if (typeof this.info === 'string') {
    // TODO: sanitize string
  } else {
    return next(new Error("Info must be text."));
  }
  if (typeof this.amount !== 'number') {
    return next(new Error("Amount must be a number."));
  }
  this.created_at = Date.now();
  // TODO: increment this purchase number globally
  this.purchase_number = Number();
  next();
});

/**
 * Export Mongoose model
 */
module.exports = mongoose.model('order', orderSchema);
