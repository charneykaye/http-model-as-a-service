/**
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/httpmodelasaservice-dev'
  },

  seedDB: true
};
