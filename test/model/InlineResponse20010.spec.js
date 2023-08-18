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
    describe('InlineResponse20010', function() {
      beforeEach(function() {
        instance = new MyOhioAssemblycomPublicApi.InlineResponse20010();
      });

      it('should create an instance of InlineResponse20010', function() {
        // TODO: update the code to test InlineResponse20010
        expect(instance).to.be.a(MyOhioAssemblycomPublicApi.InlineResponse20010);
      });

      it('should have the property credentialCards (base name: "credentialCards")', function() {
        // TODO: update the code to test the property credentialCards
        expect(instance).to.have.property('credentialCards');
        // expect(instance.credentialCards).to.be(expectedValueLiteral);
      });

    });
  });

}));
