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
    describe('MemberGender', function() {
      beforeEach(function() {
        instance = MyOhioAssemblycomPublicApi.MemberGender;
      });

      it('should create an instance of MemberGender', function() {
        // TODO: update the code to test MemberGender
        expect(instance).to.be.a('object');
      });

      it('should have the property MALE', function() {
        expect(instance).to.have.property('MALE');
        expect(instance.MALE).to.be("MALE");
      });

      it('should have the property FEMALE', function() {
        expect(instance).to.have.property('FEMALE');
        expect(instance.FEMALE).to.be("FEMALE");
      });

    });
  });

}));