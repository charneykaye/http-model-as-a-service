/**
 * Populate DB with sample data on server start;
 * If we're in DB seeding mode, do it forever.
 * To disable, edit config/environment/index.js, and set `seedDB: false`
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

var async = require('async')
  , chance = require('chance')
  , moment = require('moment')
  , Order = require('../api/order/order.model')
  , REPEAT_INTERVAL_MS = 10000
  , ORDER_EXPIRE_SECONDS = 3600 * 24
  , GENERATE_RECORDS_COUNT = 10;

/**
 * Generate a random
 * @returns {*}
 */
function generate_random_data() {
  var d = new chance();
  return {
    name: d.word(),
    info: d.paragraph(),
    amount: d.integer()
  };
}

/**
 * @returns {Long|Timestamp} before which records expire
 */
function records_expire_before() {
  return moment().subtract('seconds', ORDER_EXPIRE_SECONDS);
}

/**
 * @param {Function} done callback
 */
function destroy_expired_records(done) {
  Order.find({})
    .where('created_at').lt(records_expire_before())
    .remove(done);
}

/**
 * @param {Function} done callback
 */
function generate_records(done) {
  Order.count({}, function (err, count) {
    if (count < GENERATE_RECORDS_COUNT) {
      Order.create(generate_random_data(), done);
    } else {
      done();
    }
  });
}

/**
 * Run the seed generation phase
 * @param {Function} done callback
 */
function run_seed_generation(done) {
  async.series([
      destroy_expired_records,
      generate_records
    ],
    done);
}

/**
 * Run the seed generation every X milliseconds
 * @type {*|Object|number}
 */
var repeat = setInterval(run_seed_generation, REPEAT_INTERVAL_MS);
