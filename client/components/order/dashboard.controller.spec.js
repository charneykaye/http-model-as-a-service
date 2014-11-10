'use strict';

describe('Controller: OrderDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('httpModelAsAServiceApp'));

  var OrderDashboardCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/orders')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    OrderDashboardCtrl = $controller('OrderDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of orders to the scope', function () {
    $httpBackend.flush();
    expect(scope.list_of_orders.length).toBe(4);
  });
});
