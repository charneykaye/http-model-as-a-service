/**
 * Main application file
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express')
  , mongoose = require('mongoose')
  , autoIncrement = require('mongoose-auto-increment')
  , config = require('./config/environment')
  , connection = mongoose.connect(config.mongo.uri, config.mongo.options)
  , app = express()
  , server = require('http').createServer(app);
autoIncrement.initialize(connection);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;

// If we're in DB seeding mode, do it forever
if (config.seedDB) {
  require('./config/seed');
}
