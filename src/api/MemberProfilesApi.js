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
import {ApiClient} from "../ApiClient";
import {InlineResponse2008} from '../model/InlineResponse2008';
import {InlineResponse2009} from '../model/InlineResponse2009';
import {InlineResponse400} from '../model/InlineResponse400';
import {InlineResponse401} from '../model/InlineResponse401';
import {InlineResponse404} from '../model/InlineResponse404';
import {InlineResponse4093} from '../model/InlineResponse4093';
import {MemberIdProfileBody} from '../model/MemberIdProfileBody';

/**
* MemberProfiles service.
* @module api/MemberProfilesApi
* @version 0.1.0
*/
export class MemberProfilesApi {

    /**
    * Constructs a new MemberProfilesApi. 
    * @alias module:api/MemberProfilesApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the memberProfileDocsCreate operation.
     * @callback moduleapi/MemberProfilesApi~memberProfileDocsCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2008{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create new member profile doc
     * Upload new profile document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.
     * @param {String} memberId member id
     * @param {module:model/String} profileDocKey profile doc key
     * @param {Object} opts Optional parameters
     * @param {String} opts.docName 
     * @param {Blob} opts.docFile 
     * @param {module:api/MemberProfilesApi~memberProfileDocsCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    memberProfileDocsCreate(memberId, profileDocKey, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsCreate");
      }
      // verify the required parameter 'profileDocKey' is set
      if (profileDocKey === undefined || profileDocKey === null) {
        throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsCreate");
      }

      let pathParams = {
        'memberId': memberId,'profileDocKey': profileDocKey
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        'docName': opts['docName'],'docFile': opts['docFile']
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2008;

      return this.apiClient.callApi(
        '/members/{memberId}/profile/docs/{profileDocKey}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the memberProfileDocsDeleteOne operation.
     * @callback moduleapi/MemberProfilesApi~memberProfileDocsDeleteOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2009{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete existing member profile doc
     * Delete document owned by member profile. This operation is restricted to auth user with memberId and elevated roles.
     * @param {String} memberId member id
     * @param {module:model/String} profileDocKey profile doc key
     * @param {String} fileName member id
     * @param {module:api/MemberProfilesApi~memberProfileDocsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    memberProfileDocsDeleteOne(memberId, profileDocKey, fileName, callback) {
      
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsDeleteOne");
      }
      // verify the required parameter 'profileDocKey' is set
      if (profileDocKey === undefined || profileDocKey === null) {
        throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsDeleteOne");
      }
      // verify the required parameter 'fileName' is set
      if (fileName === undefined || fileName === null) {
        throw new Error("Missing the required parameter 'fileName' when calling memberProfileDocsDeleteOne");
      }

      let pathParams = {
        'memberId': memberId,'profileDocKey': profileDocKey
      };
      let queryParams = {
        'fileName': fileName
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2009;

      return this.apiClient.callApi(
        '/members/{memberId}/profile/docs/{profileDocKey}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the memberProfileDocsNameUpdateOne operation.
     * @callback moduleapi/MemberProfilesApi~memberProfileDocsNameUpdateOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2008{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update existing member profile doc name
     * Update name of profile document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.
     * @param {String} memberId member id
     * @param {module:model/String} profileDocKey profile doc key
     * @param {Object} opts Optional parameters
     * @param {String} opts.docName 
     * @param {module:api/MemberProfilesApi~memberProfileDocsNameUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    memberProfileDocsNameUpdateOne(memberId, profileDocKey, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsNameUpdateOne");
      }
      // verify the required parameter 'profileDocKey' is set
      if (profileDocKey === undefined || profileDocKey === null) {
        throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsNameUpdateOne");
      }

      let pathParams = {
        'memberId': memberId,'profileDocKey': profileDocKey
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        'docName': opts['docName']
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2008;

      return this.apiClient.callApi(
        '/members/{memberId}/profile/docs/{profileDocKey}/name', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the memberProfileDocsUpdateOne operation.
     * @callback moduleapi/MemberProfilesApi~memberProfileDocsUpdateOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2008{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update member profile doc
     * Upload new document for member profile, overwriting existing doc.  This operation is restricted to memberId and elevated roles.
     * @param {String} memberId member id
     * @param {module:model/String} profileDocKey profile doc key
     * @param {Object} opts Optional parameters
     * @param {String} opts.docName 
     * @param {Blob} opts.docFile 
     * @param {module:api/MemberProfilesApi~memberProfileDocsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    memberProfileDocsUpdateOne(memberId, profileDocKey, opts, callback) {
      opts = opts || {};
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberProfileDocsUpdateOne");
      }
      // verify the required parameter 'profileDocKey' is set
      if (profileDocKey === undefined || profileDocKey === null) {
        throw new Error("Missing the required parameter 'profileDocKey' when calling memberProfileDocsUpdateOne");
      }

      let pathParams = {
        'memberId': memberId,'profileDocKey': profileDocKey
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        'docName': opts['docName'],'docFile': opts['docFile']
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2008;

      return this.apiClient.callApi(
        '/members/{memberId}/profile/docs/{profileDocKey}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the memberProfileGet operation.
     * @callback moduleapi/MemberProfilesApi~memberProfileGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2008{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get member profile
     * Read member profile.  This operation is restricted to auth user&#x27;s memberId unless role is elevated.
     * @param {String} memberId member id
     * @param {module:api/MemberProfilesApi~memberProfileGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    memberProfileGet(memberId, callback) {
      
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberProfileGet");
      }

      let pathParams = {
        'memberId': memberId
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2008;

      return this.apiClient.callApi(
        '/members/{memberId}/profile', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the memberProfileUpdate operation.
     * @callback moduleapi/MemberProfilesApi~memberProfileUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2008{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update member profile
     * Update existing member profile
     * @param {String} memberId member id
     * @param {Object} opts Optional parameters
     * @param {module:model/MemberIdProfileBody} opts.body 
     * @param {module:api/MemberProfilesApi~memberProfileUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    memberProfileUpdate(memberId, opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberProfileUpdate");
      }

      let pathParams = {
        'memberId': memberId
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse2008;

      return this.apiClient.callApi(
        '/members/{memberId}/profile', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}