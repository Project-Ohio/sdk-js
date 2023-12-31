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
    instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
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

  describe('ResMemberFeesDonations', function() {
    it('should create an instance of ResMemberFeesDonations', function() {
      // uncomment below and update the code to test ResMemberFeesDonations
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be.a(MyOhioAssemblyComPublicApi.ResMemberFeesDonations);
    });

    it('should have the property credentialCardFee (base name: "credentialCardFee")', function() {
      // uncomment below and update the code to test the property credentialCardFee
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

    it('should have the property trainingCourseFee (base name: "trainingCourseFee")', function() {
      // uncomment below and update the code to test the property trainingCourseFee
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

    it('should have the property donationStateAssembly (base name: "donationStateAssembly")', function() {
      // uncomment below and update the code to test the property donationStateAssembly
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

    it('should have the property donationCountyAssembly (base name: "donationCountyAssembly")', function() {
      // uncomment below and update the code to test the property donationCountyAssembly
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

    it('should have the property donationStateChiefMarshal (base name: "donationStateChiefMarshal")', function() {
      // uncomment below and update the code to test the property donationStateChiefMarshal
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

    it('should have the property donationDesignatedRecipient (base name: "donationDesignatedRecipient")', function() {
      // uncomment below and update the code to test the property donationDesignatedRecipient
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

    it('should have the property donationDesignatedAmount (base name: "donationDesignatedAmount")', function() {
      // uncomment below and update the code to test the property donationDesignatedAmount
      //var instance = new MyOhioAssemblyComPublicApi.ResMemberFeesDonations();
      //expect(instance).to.be();
    });

  });

}));
