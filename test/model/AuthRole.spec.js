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
    describe('AuthRole', function() {
      beforeEach(function() {
        instance = MyOhioAssemblycomPublicApi.AuthRole;
      });

      it('should create an instance of AuthRole', function() {
        // TODO: update the code to test AuthRole
        expect(instance).to.be.a('object');
      });

      it('should have the property MEMBER', function() {
        expect(instance).to.have.property('MEMBER');
        expect(instance.MEMBER).to.be("MEMBER");
      });

      it('should have the property MEMBER_ADMIN', function() {
        expect(instance).to.have.property('MEMBER_ADMIN');
        expect(instance.MEMBER_ADMIN).to.be("MEMBER_ADMIN");
      });

      it('should have the property ADMIN', function() {
        expect(instance).to.have.property('ADMIN');
        expect(instance.ADMIN).to.be("ADMIN");
      });

    });
  });

}));