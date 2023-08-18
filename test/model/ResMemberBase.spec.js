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
    instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
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

  describe('ResMemberBase', function() {
    it('should create an instance of ResMemberBase', function() {
      // uncomment below and update the code to test ResMemberBase
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be.a(MyOhioAssemblyComPublicApi.ResMemberBase);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

    it('should have the property role (base name: "role")', function() {
      // uncomment below and update the code to test the property role
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

    it('should have the property coordinator (base name: "coordinator")', function() {
      // uncomment below and update the code to test the property coordinator
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

    it('should have the property recordingSecretary (base name: "recordingSecretary")', function() {
      // uncomment below and update the code to test the property recordingSecretary
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

    it('should have the property nationality (base name: "nationality")', function() {
      // uncomment below and update the code to test the property nationality
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

    it('should have the property profile (base name: "profile")', function() {
      // uncomment below and update the code to test the property profile
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberBase();
      //expect(instance).to.be();
    });

  });

}));
