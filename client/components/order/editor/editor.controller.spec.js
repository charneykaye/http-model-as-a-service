/**
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 *
 * Simple AngularJS Example Project to demo the philosophy behind contemporary
 * front-end construction, specifically separating out concerns of a "model",
 * relying for our data models entirely on a JSON API.
 */

/**
 * Test data
 * @type {*}
 */
var test_order = {
    "purchase_number": 100,
    "created_at": "2014-11-15T23:58:48.333Z",
    "name": "ovni",
    "info": "Bip ukwemati lunda hoc gobohla fa wepwaw lesegihes bu ca uvirah zukamzo ditto god kuji in ute ah. Lom buovobo duvic pucule hovihiw to acbu rujacac ugilibep pu mufofel owa. Merup vile ibe vuwi kozu pitiwa otohihu vuedzac ipi jedbi ses di gur. Ve ojciji sawso mulutfo came ki faf nuvbilu tec zecaca wapra tekuin ewwiem fasaac wesseobi ecu sifep. Piba nunkal nuthoze huc izkulno ko ho hel gilse nazwoena rugoha titehvu omojav jogmuvowa deurhun. Ji telofubow ewe no wuto hekur sepuz laj no ultoonu wav kun ne enocomug nok noperij.",
    "amount": 24,
    "_id": "5467e8b88a4f0313533ef420",
    "__v": 0
  }
  ;

/**
 * Client Tests implement Karma + Jasmine
 */
describe('Controller: OrderEditorCtrl', function () {
  'use strict';
  var OrderEditorCtrl
    , scope
    , mockOrderService
    ;

  // load the main module with a mocked Order Service
  beforeEach(module("httpModelAsAServiceApp", function ($provide) {
    mockOrderService = {
      create: function () {
        // something
      },
      show: function () {
        // something
      },
      update: function () {
        // something
      },
      destroy: function () {
        // something
      }
    };
    $provide.value("OrderService", mockOrderService);
  }));

  // inject controller
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OrderEditorCtrl = $controller('OrderEditorCtrl', {
      $scope: scope
    });
  }));

  it('should Create a new Order via the Service', function () {

  });

  it('should Show an Order via the Service', function () {

  });

  it('should Update an Order via the Service', function () {

  });

  it('should Delete an Order via the Service', function () {

  });

})
;