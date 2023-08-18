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
    describe('ResMemberProfile', function() {
      beforeEach(function() {
        instance = new MyOhioAssemblycomPublicApi.ResMemberProfile();
      });

      it('should create an instance of ResMemberProfile', function() {
        // TODO: update the code to test ResMemberProfile
        expect(instance).to.be.a(MyOhioAssemblycomPublicApi.ResMemberProfile);
      });

      it('should have the property firstName (base name: "firstName")', function() {
        // TODO: update the code to test the property firstName
        expect(instance).to.have.property('firstName');
        // expect(instance.firstName).to.be(expectedValueLiteral);
      });

      it('should have the property middleName (base name: "middleName")', function() {
        // TODO: update the code to test the property middleName
        expect(instance).to.have.property('middleName');
        // expect(instance.middleName).to.be(expectedValueLiteral);
      });

      it('should have the property lastName (base name: "lastName")', function() {
        // TODO: update the code to test the property lastName
        expect(instance).to.have.property('lastName');
        // expect(instance.lastName).to.be(expectedValueLiteral);
      });

      it('should have the property gender (base name: "gender")', function() {
        // TODO: update the code to test the property gender
        expect(instance).to.have.property('gender');
        // expect(instance.gender).to.be(expectedValueLiteral);
      });

      it('should have the property displayGender (base name: "displayGender")', function() {
        // TODO: update the code to test the property displayGender
        expect(instance).to.have.property('displayGender');
        // expect(instance.displayGender).to.be(expectedValueLiteral);
      });

      it('should have the property dob (base name: "dob")', function() {
        // TODO: update the code to test the property dob
        expect(instance).to.have.property('dob');
        // expect(instance.dob).to.be(expectedValueLiteral);
      });

      it('should have the property deceasedDate (base name: "deceasedDate")', function() {
        // TODO: update the code to test the property deceasedDate
        expect(instance).to.have.property('deceasedDate');
        // expect(instance.deceasedDate).to.be(expectedValueLiteral);
      });

      it('should have the property addrLine1 (base name: "addrLine1")', function() {
        // TODO: update the code to test the property addrLine1
        expect(instance).to.have.property('addrLine1');
        // expect(instance.addrLine1).to.be(expectedValueLiteral);
      });

      it('should have the property addrLine2 (base name: "addrLine2")', function() {
        // TODO: update the code to test the property addrLine2
        expect(instance).to.have.property('addrLine2');
        // expect(instance.addrLine2).to.be(expectedValueLiteral);
      });

      it('should have the property addrCity (base name: "addrCity")', function() {
        // TODO: update the code to test the property addrCity
        expect(instance).to.have.property('addrCity');
        // expect(instance.addrCity).to.be(expectedValueLiteral);
      });

      it('should have the property addrState (base name: "addrState")', function() {
        // TODO: update the code to test the property addrState
        expect(instance).to.have.property('addrState');
        // expect(instance.addrState).to.be(expectedValueLiteral);
      });

      it('should have the property addrZip (base name: "addrZip")', function() {
        // TODO: update the code to test the property addrZip
        expect(instance).to.have.property('addrZip');
        // expect(instance.addrZip).to.be(expectedValueLiteral);
      });

      it('should have the property addrCounty (base name: "addrCounty")', function() {
        // TODO: update the code to test the property addrCounty
        expect(instance).to.have.property('addrCounty');
        // expect(instance.addrCounty).to.be(expectedValueLiteral);
      });

      it('should have the property phone (base name: "phone")', function() {
        // TODO: update the code to test the property phone
        expect(instance).to.have.property('phone');
        // expect(instance.phone).to.be(expectedValueLiteral);
      });

      it('should have the property emailAlt (base name: "emailAlt")', function() {
        // TODO: update the code to test the property emailAlt
        expect(instance).to.have.property('emailAlt');
        // expect(instance.emailAlt).to.be(expectedValueLiteral);
      });

      it('should have the property isListedDirectory (base name: "isListedDirectory")', function() {
        // TODO: update the code to test the property isListedDirectory
        expect(instance).to.have.property('isListedDirectory');
        // expect(instance.isListedDirectory).to.be(expectedValueLiteral);
      });

      it('should have the property isDesignationAmish (base name: "isDesignationAmish")', function() {
        // TODO: update the code to test the property isDesignationAmish
        expect(instance).to.have.property('isDesignationAmish');
        // expect(instance.isDesignationAmish).to.be(expectedValueLiteral);
      });

      it('should have the property proLicense (base name: "proLicense")', function() {
        // TODO: update the code to test the property proLicense
        expect(instance).to.have.property('proLicense');
        // expect(instance.proLicense).to.be(expectedValueLiteral);
      });

      it('should have the property companyName (base name: "companyName")', function() {
        // TODO: update the code to test the property companyName
        expect(instance).to.have.property('companyName');
        // expect(instance.companyName).to.be(expectedValueLiteral);
      });

      it('should have the property interestsCommittee (base name: "interestsCommittee")', function() {
        // TODO: update the code to test the property interestsCommittee
        expect(instance).to.have.property('interestsCommittee');
        // expect(instance.interestsCommittee).to.be(expectedValueLiteral);
      });

      it('should have the property interestsIndividual (base name: "interestsIndividual")', function() {
        // TODO: update the code to test the property interestsIndividual
        expect(instance).to.have.property('interestsIndividual');
        // expect(instance.interestsIndividual).to.be(expectedValueLiteral);
      });

      it('should have the property interestsIndividualOther (base name: "interestsIndividualOther")', function() {
        // TODO: update the code to test the property interestsIndividualOther
        expect(instance).to.have.property('interestsIndividualOther');
        // expect(instance.interestsIndividualOther).to.be(expectedValueLiteral);
      });

      it('should have the property docs (base name: "docs")', function() {
        // TODO: update the code to test the property docs
        expect(instance).to.have.property('docs');
        // expect(instance.docs).to.be(expectedValueLiteral);
      });

    });
  });

}));
