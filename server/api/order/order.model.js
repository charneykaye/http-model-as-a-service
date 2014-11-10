/**
 * Order Model
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var orderSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('order', orderSchema);
