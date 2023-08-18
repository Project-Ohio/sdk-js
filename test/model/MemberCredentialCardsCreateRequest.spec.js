/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.MyOhioAssemblyComPublicApi);
  }
}(this, function(expect, MyOhioAssemblyComPublicApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new MyOhioAssemblyComPublicApi.MemberCredentialCardsCreateRequest();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('MemberCredentialCardsCreateRequest', function() {
    it('should create an instance of MemberCredentialCardsCreateRequest', function() {
      // uncomment below and update the code to test MemberCredentialCardsCreateRequest
      //var instance = new MyOhioAssemblyComPublicApi.MemberCredentialCardsCreateRequest();
      //expect(instance).to.be.a(MyOhioAssemblyComPublicApi.MemberCredentialCardsCreateRequest);
    });

    it('should have the property purchaseItemId (base name: "purchaseItemId")', function() {
      // uncomment below and update the code to test the property purchaseItemId
      //var instance = new MyOhioAssemblyComPublicApi.MemberCredentialCardsCreateRequest();
      //expect(instance).to.be();
    });

  });

}));
