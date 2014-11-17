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
  , moment = require('moment')
  , Thing = require('../api/thing/thing.model')
  , REPEAT_INTERVAL_MS = 10000
  , THING_EXPIRE_SECONDS = 3600
  , GENERATE_RECORDS_COUNT = 10
  , interval;

/**
 * @returns {Long|Timestamp} before which records expire
 */
function records_expire_before() {
  return moment().subtract(THING_EXPIRE_SECONDS, 'seconds');
}

/**
 * @param {Function} done callback
 */
function destroy_all_records(done) {
  Thing.find({})
    .remove(done);
}

/**
 * @param {Function} done callback
 */
function destroy_expired_records(done) {
  Thing.find({})
    .where('created_at').lt(records_expire_before())
    .remove(done);
}

/**
 * @param {Function} done callback
 */
function generate_records(done) {
  Thing.count({}, function (err, count) {
    if (count < GENERATE_RECORDS_COUNT) {
      Thing.create_random(done);
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
 * Begin seed generation
 */
function begin_seed_generation() {
  interval = setInterval(run_seed_generation, REPEAT_INTERVAL_MS);
}

/**
 * Run the seed generation every X milliseconds
 * @type {*|Object|number}
 */
destroy_all_records(function () {
  begin_seed_generation();
});
