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
    describe('ShopItemType', function() {
      beforeEach(function() {
        instance = MyOhioAssemblycomPublicApi.ShopItemType;
      });

      it('should create an instance of ShopItemType', function() {
        // TODO: update the code to test ShopItemType
        expect(instance).to.be.a('object');
      });

      it('should have the property CREDENTIAL_CARD', function() {
        expect(instance).to.have.property('CREDENTIAL_CARD');
        expect(instance.CREDENTIAL_CARD).to.be("CREDENTIAL_CARD");
      });

      it('should have the property PUBLISHING_FEE', function() {
        expect(instance).to.have.property('PUBLISHING_FEE');
        expect(instance.PUBLISHING_FEE).to.be("PUBLISHING_FEE");
      });

      it('should have the property RECORDING_FEE', function() {
        expect(instance).to.have.property('RECORDING_FEE');
        expect(instance.RECORDING_FEE).to.be("RECORDING_FEE");
      });

      it('should have the property DOCUMENT_GENERATOR', function() {
        expect(instance).to.have.property('DOCUMENT_GENERATOR');
        expect(instance.DOCUMENT_GENERATOR).to.be("DOCUMENT_GENERATOR");
      });

      it('should have the property TRAINING_COURSES', function() {
        expect(instance).to.have.property('TRAINING_COURSES');
        expect(instance.TRAINING_COURSES).to.be("TRAINING_COURSES");
      });

      it('should have the property BACKGROUND_CHECK', function() {
        expect(instance).to.have.property('BACKGROUND_CHECK');
        expect(instance.BACKGROUND_CHECK).to.be("BACKGROUND_CHECK");
      });

      it('should have the property DONATE_STATE_ASSEMBLY', function() {
        expect(instance).to.have.property('DONATE_STATE_ASSEMBLY');
        expect(instance.DONATE_STATE_ASSEMBLY).to.be("DONATE_STATE_ASSEMBLY");
      });

      it('should have the property DONATE_COUNTY_ASSEMBLY', function() {
        expect(instance).to.have.property('DONATE_COUNTY_ASSEMBLY');
        expect(instance.DONATE_COUNTY_ASSEMBLY).to.be("DONATE_COUNTY_ASSEMBLY");
      });

      it('should have the property DONATE_CONTINENTAL_MARSHALS', function() {
        expect(instance).to.have.property('DONATE_CONTINENTAL_MARSHALS');
        expect(instance.DONATE_CONTINENTAL_MARSHALS).to.be("DONATE_CONTINENTAL_MARSHALS");
      });

      it('should have the property DONATE_ANNA', function() {
        expect(instance).to.have.property('DONATE_ANNA');
        expect(instance.DONATE_ANNA).to.be("DONATE_ANNA");
      });

      it('should have the property DONATE_OTHER', function() {
        expect(instance).to.have.property('DONATE_OTHER');
        expect(instance.DONATE_OTHER).to.be("DONATE_OTHER");
      });

      it('should have the property OTHER', function() {
        expect(instance).to.have.property('OTHER');
        expect(instance.OTHER).to.be("OTHER");
      });

    });
  });

}));
