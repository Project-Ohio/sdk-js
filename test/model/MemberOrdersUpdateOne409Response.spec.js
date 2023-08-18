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
    instance = new MyOhioAssemblyComPublicApi.MemberOrdersUpdateOne409Response();
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

  describe('MemberOrdersUpdateOne409Response', function() {
    it('should create an instance of MemberOrdersUpdateOne409Response', function() {
      // uncomment below and update the code to test MemberOrdersUpdateOne409Response
      //var instance = new MyOhioAssemblyComPublicApi.MemberOrdersUpdateOne409Response();
      //expect(instance).to.be.a(MyOhioAssemblyComPublicApi.MemberOrdersUpdateOne409Response);
    });

    it('should have the property err (base name: "err")', function() {
      // uncomment below and update the code to test the property err
      //var instance = new MyOhioAssemblyComPublicApi.MemberOrdersUpdateOne409Response();
      //expect(instance).to.be();
    });

    it('should have the property errCode (base name: "errCode")', function() {
      // uncomment below and update the code to test the property errCode
      //var instance = new MyOhioAssemblyComPublicApi.MemberOrdersUpdateOne409Response();
      //expect(instance).to.be();
    });

  });

}));
