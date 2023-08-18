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
    describe('ShopItemsBody', function() {
      beforeEach(function() {
        instance = new MyOhioAssemblycomPublicApi.ShopItemsBody();
      });

      it('should create an instance of ShopItemsBody', function() {
        // TODO: update the code to test ShopItemsBody
        expect(instance).to.be.a(MyOhioAssemblycomPublicApi.ShopItemsBody);
      });

      it('should have the property name (base name: "name")', function() {
        // TODO: update the code to test the property name
        expect(instance).to.have.property('name');
        // expect(instance.name).to.be(expectedValueLiteral);
      });

      it('should have the property type (base name: "type")', function() {
        // TODO: update the code to test the property type
        expect(instance).to.have.property('type');
        // expect(instance.type).to.be(expectedValueLiteral);
      });

      it('should have the property info (base name: "info")', function() {
        // TODO: update the code to test the property info
        expect(instance).to.have.property('info');
        // expect(instance.info).to.be(expectedValueLiteral);
      });

      it('should have the property amountFee (base name: "amountFee")', function() {
        // TODO: update the code to test the property amountFee
        expect(instance).to.have.property('amountFee');
        // expect(instance.amountFee).to.be(expectedValueLiteral);
      });

    });
  });

}));
