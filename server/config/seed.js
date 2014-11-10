/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 */

'use strict';

var order = require('../api/order/order.model');

order.find({}).remove(function () {
  order.create({
    name: 'Development Tools',
    purchase_number: 1,
    info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.',
    amount: 10249
  }, {
    name: 'Server and Client integration',
    purchase_number: 2,
    info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
    amount: 293
  }, {
    name: 'Smart Build System',
    purchase_number: 3,
    info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html',
    amount: 2884872
  }, {
    name: 'Modular Structure',
    purchase_number: 4,
    info: 'Best practice client and server structures allow for more code reusability and maximum scalability',
    amount: 12832
  }, {
    name: 'Optimized Build',
    purchase_number: 5,
    info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.',
    amount: 128
  }, {
    name: 'Deployment Ready',
    purchase_number: 6,
    info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators',
    amount: 65
  });
});
