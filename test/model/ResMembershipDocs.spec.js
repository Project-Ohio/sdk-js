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
    describe('ResMembershipDocs', function() {
      beforeEach(function() {
        instance = new MyOhioAssemblycomPublicApi.ResMembershipDocs();
      });

      it('should create an instance of ResMembershipDocs', function() {
        // TODO: update the code to test ResMembershipDocs
        expect(instance).to.be.a(MyOhioAssemblycomPublicApi.ResMembershipDocs);
      });

      it('should have the property declarationAmericans (base name: "declarationAmericans")', function() {
        // TODO: update the code to test the property declarationAmericans
        expect(instance).to.have.property('declarationAmericans');
        // expect(instance.declarationAmericans).to.be(expectedValueLiteral);
      });

      it('should have the property declarationImmigrants (base name: "declarationImmigrants")', function() {
        // TODO: update the code to test the property declarationImmigrants
        expect(instance).to.have.property('declarationImmigrants');
        // expect(instance.declarationImmigrants).to.be(expectedValueLiteral);
      });

      it('should have the property declarationFederalPersons (base name: "declarationFederalPersons")', function() {
        // TODO: update the code to test the property declarationFederalPersons
        expect(instance).to.have.property('declarationFederalPersons');
        // expect(instance.declarationFederalPersons).to.be(expectedValueLiteral);
      });

      it('should have the property declarationPoliticalStatus (base name: "declarationPoliticalStatus")', function() {
        // TODO: update the code to test the property declarationPoliticalStatus
        expect(instance).to.have.property('declarationPoliticalStatus');
        // expect(instance.declarationPoliticalStatus).to.be(expectedValueLiteral);
      });

      it('should have the property birthRecord (base name: "birthRecord")', function() {
        // TODO: update the code to test the property birthRecord
        expect(instance).to.have.property('birthRecord');
        // expect(instance.birthRecord).to.be(expectedValueLiteral);
      });

      it('should have the property witnessTestimony1 (base name: "witnessTestimony1")', function() {
        // TODO: update the code to test the property witnessTestimony1
        expect(instance).to.have.property('witnessTestimony1');
        // expect(instance.witnessTestimony1).to.be(expectedValueLiteral);
      });

      it('should have the property witnessTestimony2 (base name: "witnessTestimony2")', function() {
        // TODO: update the code to test the property witnessTestimony2
        expect(instance).to.have.property('witnessTestimony2');
        // expect(instance.witnessTestimony2).to.be(expectedValueLiteral);
      });

      it('should have the property voterCancellation (base name: "voterCancellation")', function() {
        // TODO: update the code to test the property voterCancellation
        expect(instance).to.have.property('voterCancellation');
        // expect(instance.voterCancellation).to.be(expectedValueLiteral);
      });

      it('should have the property revocationTaxes1 (base name: "revocationTaxes1")', function() {
        // TODO: update the code to test the property revocationTaxes1
        expect(instance).to.have.property('revocationTaxes1');
        // expect(instance.revocationTaxes1).to.be(expectedValueLiteral);
      });

      it('should have the property revocationTaxes2 (base name: "revocationTaxes2")', function() {
        // TODO: update the code to test the property revocationTaxes2
        expect(instance).to.have.property('revocationTaxes2');
        // expect(instance.revocationTaxes2).to.be(expectedValueLiteral);
      });

      it('should have the property deedReconveyance (base name: "deedReconveyance")', function() {
        // TODO: update the code to test the property deedReconveyance
        expect(instance).to.have.property('deedReconveyance');
        // expect(instance.deedReconveyance).to.be(expectedValueLiteral);
      });

      it('should have the property certAssumedName (base name: "certAssumedName")', function() {
        // TODO: update the code to test the property certAssumedName
        expect(instance).to.have.property('certAssumedName');
        // expect(instance.certAssumedName).to.be(expectedValueLiteral);
      });

      it('should have the property actExpatriation1 (base name: "actExpatriation1")', function() {
        // TODO: update the code to test the property actExpatriation1
        expect(instance).to.have.property('actExpatriation1');
        // expect(instance.actExpatriation1).to.be(expectedValueLiteral);
      });

      it('should have the property actExpatriation2 (base name: "actExpatriation2")', function() {
        // TODO: update the code to test the property actExpatriation2
        expect(instance).to.have.property('actExpatriation2');
        // expect(instance.actExpatriation2).to.be(expectedValueLiteral);
      });

      it('should have the property actExpatriation3 (base name: "actExpatriation3")', function() {
        // TODO: update the code to test the property actExpatriation3
        expect(instance).to.have.property('actExpatriation3');
        // expect(instance.actExpatriation3).to.be(expectedValueLiteral);
      });

      it('should have the property cancellationPowerAttorney (base name: "cancellationPowerAttorney")', function() {
        // TODO: update the code to test the property cancellationPowerAttorney
        expect(instance).to.have.property('cancellationPowerAttorney');
        // expect(instance.cancellationPowerAttorney).to.be(expectedValueLiteral);
      });

      it('should have the property foreignSovereignImmunitiesAct (base name: "foreignSovereignImmunitiesAct")', function() {
        // TODO: update the code to test the property foreignSovereignImmunitiesAct
        expect(instance).to.have.property('foreignSovereignImmunitiesAct');
        // expect(instance.foreignSovereignImmunitiesAct).to.be(expectedValueLiteral);
      });

      it('should have the property dnaParamountClaim (base name: "dnaParamountClaim")', function() {
        // TODO: update the code to test the property dnaParamountClaim
        expect(instance).to.have.property('dnaParamountClaim');
        // expect(instance.dnaParamountClaim).to.be(expectedValueLiteral);
      });

      it('should have the property militarySeverance (base name: "militarySeverance")', function() {
        // TODO: update the code to test the property militarySeverance
        expect(instance).to.have.property('militarySeverance');
        // expect(instance.militarySeverance).to.be(expectedValueLiteral);
      });

      it('should have the property commonCarryDeclaration (base name: "commonCarryDeclaration")', function() {
        // TODO: update the code to test the property commonCarryDeclaration
        expect(instance).to.have.property('commonCarryDeclaration');
        // expect(instance.commonCarryDeclaration).to.be(expectedValueLiteral);
      });

      it('should have the property feeSchedule (base name: "feeSchedule")', function() {
        // TODO: update the code to test the property feeSchedule
        expect(instance).to.have.property('feeSchedule');
        // expect(instance.feeSchedule).to.be(expectedValueLiteral);
      });

      it('should have the property lineageTreaty (base name: "lineageTreaty")', function() {
        // TODO: update the code to test the property lineageTreaty
        expect(instance).to.have.property('lineageTreaty');
        // expect(instance.lineageTreaty).to.be(expectedValueLiteral);
      });

      it('should have the property marriageRecord (base name: "marriageRecord")', function() {
        // TODO: update the code to test the property marriageRecord
        expect(instance).to.have.property('marriageRecord');
        // expect(instance.marriageRecord).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed1 (base name: "babyDeed1")', function() {
        // TODO: update the code to test the property babyDeed1
        expect(instance).to.have.property('babyDeed1');
        // expect(instance.babyDeed1).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed2 (base name: "babyDeed2")', function() {
        // TODO: update the code to test the property babyDeed2
        expect(instance).to.have.property('babyDeed2');
        // expect(instance.babyDeed2).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed3 (base name: "babyDeed3")', function() {
        // TODO: update the code to test the property babyDeed3
        expect(instance).to.have.property('babyDeed3');
        // expect(instance.babyDeed3).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed4 (base name: "babyDeed4")', function() {
        // TODO: update the code to test the property babyDeed4
        expect(instance).to.have.property('babyDeed4');
        // expect(instance.babyDeed4).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed5 (base name: "babyDeed5")', function() {
        // TODO: update the code to test the property babyDeed5
        expect(instance).to.have.property('babyDeed5');
        // expect(instance.babyDeed5).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed6 (base name: "babyDeed6")', function() {
        // TODO: update the code to test the property babyDeed6
        expect(instance).to.have.property('babyDeed6');
        // expect(instance.babyDeed6).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed7 (base name: "babyDeed7")', function() {
        // TODO: update the code to test the property babyDeed7
        expect(instance).to.have.property('babyDeed7');
        // expect(instance.babyDeed7).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed8 (base name: "babyDeed8")', function() {
        // TODO: update the code to test the property babyDeed8
        expect(instance).to.have.property('babyDeed8');
        // expect(instance.babyDeed8).to.be(expectedValueLiteral);
      });

      it('should have the property babyDeed9 (base name: "babyDeed9")', function() {
        // TODO: update the code to test the property babyDeed9
        expect(instance).to.have.property('babyDeed9');
        // expect(instance.babyDeed9).to.be(expectedValueLiteral);
      });

      it('should have the property deathRecord (base name: "deathRecord")', function() {
        // TODO: update the code to test the property deathRecord
        expect(instance).to.have.property('deathRecord');
        // expect(instance.deathRecord).to.be(expectedValueLiteral);
      });

      it('should have the property privateBusinessDocs (base name: "privateBusinessDocs")', function() {
        // TODO: update the code to test the property privateBusinessDocs
        expect(instance).to.have.property('privateBusinessDocs');
        // expect(instance.privateBusinessDocs).to.be(expectedValueLiteral);
      });

      it('should have the property otherDocs (base name: "otherDocs")', function() {
        // TODO: update the code to test the property otherDocs
        expect(instance).to.have.property('otherDocs');
        // expect(instance.otherDocs).to.be(expectedValueLiteral);
      });

      it('should have the property miscNoticesDocs (base name: "miscNoticesDocs")', function() {
        // TODO: update the code to test the property miscNoticesDocs
        expect(instance).to.have.property('miscNoticesDocs');
        // expect(instance.miscNoticesDocs).to.be(expectedValueLiteral);
      });

      it('should have the property landPatent1 (base name: "landPatent1")', function() {
        // TODO: update the code to test the property landPatent1
        expect(instance).to.have.property('landPatent1');
        // expect(instance.landPatent1).to.be(expectedValueLiteral);
      });

      it('should have the property landPatent2 (base name: "landPatent2")', function() {
        // TODO: update the code to test the property landPatent2
        expect(instance).to.have.property('landPatent2');
        // expect(instance.landPatent2).to.be(expectedValueLiteral);
      });

      it('should have the property landPatent3 (base name: "landPatent3")', function() {
        // TODO: update the code to test the property landPatent3
        expect(instance).to.have.property('landPatent3');
        // expect(instance.landPatent3).to.be(expectedValueLiteral);
      });

      it('should have the property landPatent4 (base name: "landPatent4")', function() {
        // TODO: update the code to test the property landPatent4
        expect(instance).to.have.property('landPatent4');
        // expect(instance.landPatent4).to.be(expectedValueLiteral);
      });

      it('should have the property landPatent5 (base name: "landPatent5")', function() {
        // TODO: update the code to test the property landPatent5
        expect(instance).to.have.property('landPatent5');
        // expect(instance.landPatent5).to.be(expectedValueLiteral);
      });

      it('should have the property territorialGovtDocs (base name: "territorialGovtDocs")', function() {
        // TODO: update the code to test the property territorialGovtDocs
        expect(instance).to.have.property('territorialGovtDocs');
        // expect(instance.territorialGovtDocs).to.be(expectedValueLiteral);
      });

      it('should have the property municipalGovtDocs (base name: "municipalGovtDocs")', function() {
        // TODO: update the code to test the property municipalGovtDocs
        expect(instance).to.have.property('municipalGovtDocs');
        // expect(instance.municipalGovtDocs).to.be(expectedValueLiteral);
      });

      it('should have the property commercialEntityDocs (base name: "commercialEntityDocs")', function() {
        // TODO: update the code to test the property commercialEntityDocs
        expect(instance).to.have.property('commercialEntityDocs');
        // expect(instance.commercialEntityDocs).to.be(expectedValueLiteral);
      });

      it('should have the property commonLawWill (base name: "commonLawWill")', function() {
        // TODO: update the code to test the property commonLawWill
        expect(instance).to.have.property('commonLawWill');
        // expect(instance.commonLawWill).to.be(expectedValueLiteral);
      });

    });
  });

}));
