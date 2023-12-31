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
    instance = new MyOhioAssemblyComPublicApi.AuthApi();
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

  describe('AuthApi', function() {
    describe('authAccountPasswordResetCreate', function() {
      it('should call authAccountPasswordResetCreate successfully', function(done) {
        //uncomment below and update the code to test authAccountPasswordResetCreate
        //instance.authAccountPasswordResetCreate(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('authEmailUpdateRequest', function() {
      it('should call authEmailUpdateRequest successfully', function(done) {
        //uncomment below and update the code to test authEmailUpdateRequest
        //instance.authEmailUpdateRequest(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('authEmailUpdateVerify', function() {
      it('should call authEmailUpdateVerify successfully', function(done) {
        //uncomment below and update the code to test authEmailUpdateVerify
        //instance.authEmailUpdateVerify(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('authLoginCreate', function() {
      it('should call authLoginCreate successfully', function(done) {
        //uncomment below and update the code to test authLoginCreate
        //instance.authLoginCreate(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('authPasswordUpdate', function() {
      it('should call authPasswordUpdate successfully', function(done) {
        //uncomment below and update the code to test authPasswordUpdate
        //instance.authPasswordUpdate(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('authRefreshCreate', function() {
      it('should call authRefreshCreate successfully', function(done) {
        //uncomment below and update the code to test authRefreshCreate
        //instance.authRefreshCreate(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
