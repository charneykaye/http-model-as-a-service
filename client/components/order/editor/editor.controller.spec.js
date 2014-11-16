/**
 *
 * Using $http Model-as-a-Service in AngularJS
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 * @repository https://github.com/nickckaye/http-model-as-a-service
 *
 * Simple AngularJS Example Project to demo the philosophy behind contemporary
 * front-end construction, specifically separating out concerns of a "model",
 * relying for our data models entirely on a JSON API.
 *
 * Client Tests implement Karma + Jasmine
 */
describe('Controller: OrderEditorCtrl', function () {
  'use strict';
  var OrderEditorCtrl
    , scope
    , $httpBackend
    ;

  // load the main module
  beforeEach(module('httpModelAsAServiceApp'));

  // inject backend
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/orders')
      .respond(test_order_index);
    scope = $rootScope.$new();
    OrderEditorCtrl = $controller('OrderEditorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of orders to the scope', function () {
    $httpBackend.flush();
    expect(scope.list_of_orders.length).toBe(test_order_index.length);
  });

  it('should create a new order', function () {
    $httpBackend.flush();
    $httpBackend.expectPOST('/api/orders', test_new_order)
      .respond(test_new_order);
    $httpBackend.expectGET('/api/orders')
      .respond(test_order_index);
    scope.create(test_new_order);
    $httpBackend.flush();
  });

});

/**
 * Test data
 * @type {*}
 */
var test_order_one = {
    "purchase_number": 100,
    "created_at": "2014-11-15T23:58:48.333Z",
    "name": "ovni",
    "info": "Bip ukwemati lunda hoc gobohla fa wepwaw lesegihes bu ca uvirah zukamzo ditto god kuji in ute ah. Lom buovobo duvic pucule hovihiw to acbu rujacac ugilibep pu mufofel owa. Merup vile ibe vuwi kozu pitiwa otohihu vuedzac ipi jedbi ses di gur. Ve ojciji sawso mulutfo came ki faf nuvbilu tec zecaca wapra tekuin ewwiem fasaac wesseobi ecu sifep. Piba nunkal nuthoze huc izkulno ko ho hel gilse nazwoena rugoha titehvu omojav jogmuvowa deurhun. Ji telofubow ewe no wuto hekur sepuz laj no ultoonu wav kun ne enocomug nok noperij.",
    "amount": 24,
    "_id": "5467e8b88a4f0313533ef420",
    "__v": 0
  }
  , test_order_two = {
    "purchase_number": 101,
    "created_at": "2014-11-15T23:58:58.358Z",
    "name": "fi",
    "info": "Vamgiud jokra ahkudwu jicavu tez on cak ji ziccepnar ma obdo wuk erwabus zow ohupu. Tuadipo wo ah jus okweko vugiwon wihufuce ti demacoj salla zu afkiwove wubdak uk cozubu ko buto. Afotuspol zu al vehfaim olmitec ajsiczu ket ojiaf vavta pub jisior pucecek gecfuf mod nucrew. Bo otlo iwevud ikaob bofciaju gajawwu be pazaz mig ga imo usi wufwor tatefa nessuj jijlipot. Co gas gij diutjo civ zetlaeze looje cej zov segder wivi ufmemza kecesnes gawul jibcu ojuiw voketofi.",
    "amount": 125,
    "_id": "5467e8c28a4f0313533ef421",
    "__v": 0
  }
  , test_order_three = {
    "purchase_number": 102,
    "created_at": "2014-11-15T23:59:08.355Z",
    "name": "visow",
    "info": "Ov bueka woaf sasjo ov cul dojnamdoh nuil ilwikzos raite zubatfe mu dugij. Awututmer wow omesa hianuwi vupwa irapowi hicwobi suko hipot ma rumulamu uw. Ehemug eha vecwok degmobsav ni hun ohhuglaj ag edge fenah hotnudef gupnar ra jewopzi mil. Hojtal manwivmig vodpad pepemuh izejale car vuftahkob cebudel ce wijimuw ohofusur kaccoze wuhbob udeicvus. Doof geufmu ubicun husija nose wuvu aj esedoheki wevizki fufumi misva pupjalud dagvu uvo az.",
    "amount": 159,
    "_id": "5467e8cc8a4f0313533ef422",
    "__v": 0
  }
  , test_new_order = {
    "purchase_number": 109,
    "created_at": "2014-11-15T23:59:08.359Z",
    "name": "fjjwoe",
    "info": "Nuil ilwikzos raite zubatfe mu dugij ov bueka woaf sasjo ov cul dojnamdoh. Nicwobi suko hipot ma rumulamu uw. Ehemug eha vecwok degmobsav ni hun ohhuglaj ag edge fenah hotnudef gupnar ra jewopzi mil. Hojtal manwivmig vodpad pepemuh izejale car vuftahkob cebudel ce wijimuw ohofusur kaccoze wuvu aj esedoheki wevizki fufumi misva pupjalud dagvu uvo az wuhbob udeicvus. Doof geufmu ubicun husija nose.",
    "amount": 23,
    "_id": "563786c48aef0d31c53ef422",
    "__v": 0
  }
  , test_order_index = [
    test_order_one,
    test_order_two,
    test_order_three
  ]
  ;

