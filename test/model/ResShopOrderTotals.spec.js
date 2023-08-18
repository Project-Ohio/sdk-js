/*
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * OpenAPI spec version: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.46
 *
 * Do not edit the class manually.
 *
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.MyOhioAssemblycomPublicApi);
  }
}(this, function(expect, MyOhioAssemblycomPublicApi) {
  'use strict';

  var instance;

  describe('(package)', function() {
    describe('ResShopOrderTotals', function() {
      beforeEach(function() {
        instance = new MyOhioAssemblycomPublicApi.ResShopOrderTotals();
      });

      it('should create an instance of ResShopOrderTotals', function() {
        // TODO: update the code to test ResShopOrderTotals
        expect(instance).to.be.a(MyOhioAssemblycomPublicApi.ResShopOrderTotals);
      });

      it('should have the property items (base name: "items")', function() {
        // TODO: update the code to test the property items
        expect(instance).to.have.property('items');
        // expect(instance.items).to.be(expectedValueLiteral);
      });

      it('should have the property credits (base name: "credits")', function() {
        // TODO: update the code to test the property credits
        expect(instance).to.have.property('credits');
        // expect(instance.credits).to.be(expectedValueLiteral);
      });

      it('should have the property net (base name: "net")', function() {
        // TODO: update the code to test the property net
        expect(instance).to.have.property('net');
        // expect(instance.net).to.be(expectedValueLiteral);
      });

    });
  });

}));
