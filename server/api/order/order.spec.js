/**
 * Order Spec Tests
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/orders', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/orders')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
