/**
 * Order Model
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */
'use strict';
var mongoose = require('mongoose')
  , chance = require('chance')
  , Schema = mongoose.Schema
  , autoIncrement = require('mongoose-auto-increment');

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
  next();
});

/**
 * Auto-increment purchase_number
 */
orderSchema.plugin(autoIncrement.plugin, {
  model: 'order',
  field: 'purchase_number',
  startAt: 100
});

/**
 * Helper to create an instance with random values (for demo site in production)
 * @function Order.create_random
 * @param {Function} done callback
 */
orderSchema.statics.create_random = function (done) {
  mongoose.model('order').create(generate_random_data(), done);
};

/**
 * Helper to get an object of random data for all attributes
 * @returns {*}
 */
orderSchema.statics.get_random_attributes = generate_random_data;

/**
 * Export Mongoose model
 */
module.exports = mongoose.model('order', orderSchema);

/**
 * Generate random data for all attributes
 * @returns {*}
 */
function generate_random_data() {
  var c = new chance();
  return {
    name: c.word(),
    info: c.paragraph(),
    amount: c.integer({min: 1, max: 99999})
  };
}
