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
    describe('ResPublicCredentialCard', function() {
      beforeEach(function() {
        instance = new MyOhioAssemblycomPublicApi.ResPublicCredentialCard();
      });

      it('should create an instance of ResPublicCredentialCard', function() {
        // TODO: update the code to test ResPublicCredentialCard
        expect(instance).to.be.a(MyOhioAssemblycomPublicApi.ResPublicCredentialCard);
      });

      it('should have the property masterRecordNumber (base name: "masterRecordNumber")', function() {
        // TODO: update the code to test the property masterRecordNumber
        expect(instance).to.have.property('masterRecordNumber');
        // expect(instance.masterRecordNumber).to.be(expectedValueLiteral);
      });

      it('should have the property expirationDate (base name: "expirationDate")', function() {
        // TODO: update the code to test the property expirationDate
        expect(instance).to.have.property('expirationDate');
        // expect(instance.expirationDate).to.be(expectedValueLiteral);
      });

      it('should have the property updatedAt (base name: "updatedAt")', function() {
        // TODO: update the code to test the property updatedAt
        expect(instance).to.have.property('updatedAt');
        // expect(instance.updatedAt).to.be(expectedValueLiteral);
      });

      it('should have the property memberProfile (base name: "memberProfile")', function() {
        // TODO: update the code to test the property memberProfile
        expect(instance).to.have.property('memberProfile');
        // expect(instance.memberProfile).to.be(expectedValueLiteral);
      });

      it('should have the property memberDocs (base name: "memberDocs")', function() {
        // TODO: update the code to test the property memberDocs
        expect(instance).to.have.property('memberDocs');
        // expect(instance.memberDocs).to.be(expectedValueLiteral);
      });

    });
  });

}));
