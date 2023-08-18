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
    instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
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

  describe('ResShopOrder', function() {
    it('should create an instance of ResShopOrder', function() {
      // uncomment below and update the code to test ResShopOrder
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be.a(MyOhioAssemblyComPublicApi.ResShopOrder);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property deletedAt (base name: "deletedAt")', function() {
      // uncomment below and update the code to test the property deletedAt
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property number (base name: "number")', function() {
      // uncomment below and update the code to test the property number
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property items (base name: "items")', function() {
      // uncomment below and update the code to test the property items
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property amountCredit (base name: "amountCredit")', function() {
      // uncomment below and update the code to test the property amountCredit
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property totals (base name: "totals")', function() {
      // uncomment below and update the code to test the property totals
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property payment (base name: "payment")', function() {
      // uncomment below and update the code to test the property payment
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

    it('should have the property notes (base name: "notes")', function() {
      // uncomment below and update the code to test the property notes
      //var instance = new MyOhioAssemblyComPublicApi.ResShopOrder();
      //expect(instance).to.be();
    });

  });

}));
