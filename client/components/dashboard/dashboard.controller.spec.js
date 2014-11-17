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
describe('Controller: ThingDashboardCtrl', function () {
  'use strict';
  var ThingDashboardCtrl
    , scope
    , $httpBackend
    ;

  // load the main module
  beforeEach(module('httpModelAsAServiceApp'));

  // inject backend
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    ThingDashboardCtrl = $controller('ThingDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should have nothing going on, but the rent.', function () {
    expect(scope).toBeDefined();
  });

});
