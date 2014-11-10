###
Using $http Model-as-a-Service in AngularJS
@author Nick Kaye <nick.c.kaye@gmail.com>
@repository https://github.com/outrightmental/meks
###

'use strict'

describe 'Controller: MainCtrl', ->

  # load the controller's module
  beforeEach module 'httpModelAsAServiceApp'

  MainCtrl = undefined
  scope = undefined
  $httpBackend = undefined

  # Initialize the controller and a mock scope
  beforeEach inject (_$httpBackend_, $controller, $rootScope) ->
    $httpBackend = _$httpBackend_
    $httpBackend.expectGET('/api/orders').respond [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
      'Express'
    ]
    scope = $rootScope.$new()
    MainCtrl = $controller 'MainCtrl',
      $scope: scope

  it 'should attach a list of orders to the scope', ->
    $httpBackend.flush()
    expect(scope.awesomeorders.length).toBe 4
