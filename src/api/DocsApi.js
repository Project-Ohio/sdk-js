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


import ApiClient from "../ApiClient";
import AuthEmailUpdateVerify404Response from '../model/AuthEmailUpdateVerify404Response';
import AuthLoginCreate400Response from '../model/AuthLoginCreate400Response';
import AuthLoginCreate401Response from '../model/AuthLoginCreate401Response';
import CredentialCardsGetOne200Response from '../model/CredentialCardsGetOne200Response';
import MemberDocsDeleteOne200Response from '../model/MemberDocsDeleteOne200Response';
import MemberDocsGet200Response from '../model/MemberDocsGet200Response';
import MemberDocsUpdateOne200Response from '../model/MemberDocsUpdateOne200Response';
import MemberProfileDocsUpdateOne409Response from '../model/MemberProfileDocsUpdateOne409Response';
import MembershipDocKey from '../model/MembershipDocKey';

/**
* Docs service.
* @module api/DocsApi
* @version 0.1.0
*/
export default class DocsApi {

    /**
    * Constructs a new DocsApi. 
    * @alias module:api/DocsApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the credentialCardsGetOne operation.
     * @callback module:api/DocsApi~credentialCardsGetOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CredentialCardsGetOne200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get public credential card
     * Get existing credential card unless expired or deleted.  This is a public operation.
     * @param {String} masterRecordNumber unique master record number for credential card
     * @param {module:api/DocsApi~credentialCardsGetOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CredentialCardsGetOne200Response}
     */
    credentialCardsGetOne(masterRecordNumber, callback) {
      let postBody = null;
      // verify the required parameter 'masterRecordNumber' is set
      if (masterRecordNumber === undefined || masterRecordNumber === null) {
        throw new Error("Missing the required parameter 'masterRecordNumber' when calling credentialCardsGetOne");
      }

      let pathParams = {
        'masterRecordNumber': masterRecordNumber
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = CredentialCardsGetOne200Response;
      return this.apiClient.callApi(
        '/credentialCards/{masterRecordNumber}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the memberDocsCreate operation.
     * @callback module:api/DocsApi~memberDocsCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MemberDocsUpdateOne200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create new member doc
     * Upload new document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.
     * @param {String} memberId member id
     * @param {module:model/MembershipDocKey} docKey member id
     * @param {String} docName 
     * @param {File} docFile 
     * @param {module:api/DocsApi~memberDocsCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MemberDocsUpdateOne200Response}
     */
    memberDocsCreate(memberId, docKey, docName, docFile, callback) {
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberDocsCreate");
      }
      // verify the required parameter 'docKey' is set
      if (docKey === undefined || docKey === null) {
        throw new Error("Missing the required parameter 'docKey' when calling memberDocsCreate");
      }
      // verify the required parameter 'docName' is set
      if (docName === undefined || docName === null) {
        throw new Error("Missing the required parameter 'docName' when calling memberDocsCreate");
      }
      // verify the required parameter 'docFile' is set
      if (docFile === undefined || docFile === null) {
        throw new Error("Missing the required parameter 'docFile' when calling memberDocsCreate");
      }

      let pathParams = {
        'memberId': memberId,
        'docKey': docKey
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'docName': docName,
        'docFile': docFile
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = MemberDocsUpdateOne200Response;
      return this.apiClient.callApi(
        '/members/{memberId}/docs/{docKey}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the memberDocsDeleteOne operation.
     * @callback module:api/DocsApi~memberDocsDeleteOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MemberDocsDeleteOne200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete existing member doc
     * Delete document owned by member. This operation is restricted to elevated roles.
     * @param {String} memberId member id
     * @param {module:model/MembershipDocKey} docKey member id
     * @param {module:api/DocsApi~memberDocsDeleteOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MemberDocsDeleteOne200Response}
     */
    memberDocsDeleteOne(memberId, docKey, callback) {
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberDocsDeleteOne");
      }
      // verify the required parameter 'docKey' is set
      if (docKey === undefined || docKey === null) {
        throw new Error("Missing the required parameter 'docKey' when calling memberDocsDeleteOne");
      }

      let pathParams = {
        'memberId': memberId,
        'docKey': docKey
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
      let returnType = MemberDocsDeleteOne200Response;
      return this.apiClient.callApi(
        '/members/{memberId}/docs/{docKey}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the memberDocsDownload operation.
     * @callback module:api/DocsApi~memberDocsDownloadCallback
     * @param {String} error Error message, if any.
     * @param {File} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Download one member doc
     * Returns file download.  This operation will check that memberdocId matches claim in signature JWT.
     * @param {String} memberDocId member doc id
     * @param {String} signature JWT signature
     * @param {module:api/DocsApi~memberDocsDownloadCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link File}
     */
    memberDocsDownload(memberDocId, signature, callback) {
      let postBody = null;
      // verify the required parameter 'memberDocId' is set
      if (memberDocId === undefined || memberDocId === null) {
        throw new Error("Missing the required parameter 'memberDocId' when calling memberDocsDownload");
      }
      // verify the required parameter 'signature' is set
      if (signature === undefined || signature === null) {
        throw new Error("Missing the required parameter 'signature' when calling memberDocsDownload");
      }

      let pathParams = {
        'memberDocId': memberDocId
      };
      let queryParams = {
        'signature': signature
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['image/png', 'application/pdf', 'application/json'];
      let returnType = File;
      return this.apiClient.callApi(
        '/memberDocs/{memberDocId}/download', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the memberDocsGet operation.
     * @callback module:api/DocsApi~memberDocsGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MemberDocsGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get member docs
     * Gets data on all member docs.  This operation is restricted to currently auth member's memberId unless role is elevated
     * @param {String} memberId member id
     * @param {module:api/DocsApi~memberDocsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MemberDocsGet200Response}
     */
    memberDocsGet(memberId, callback) {
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberDocsGet");
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
      let returnType = MemberDocsGet200Response;
      return this.apiClient.callApi(
        '/members/{memberId}/docs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the memberDocsNameUpdateOne operation.
     * @callback module:api/DocsApi~memberDocsNameUpdateOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MemberDocsUpdateOne200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update existing member doc name
     * Update name of document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.
     * @param {String} memberId member id
     * @param {module:model/MembershipDocKey} docKey member id
     * @param {String} docName 
     * @param {module:api/DocsApi~memberDocsNameUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MemberDocsUpdateOne200Response}
     */
    memberDocsNameUpdateOne(memberId, docKey, docName, callback) {
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberDocsNameUpdateOne");
      }
      // verify the required parameter 'docKey' is set
      if (docKey === undefined || docKey === null) {
        throw new Error("Missing the required parameter 'docKey' when calling memberDocsNameUpdateOne");
      }
      // verify the required parameter 'docName' is set
      if (docName === undefined || docName === null) {
        throw new Error("Missing the required parameter 'docName' when calling memberDocsNameUpdateOne");
      }

      let pathParams = {
        'memberId': memberId,
        'docKey': docKey
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'docName': docName
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = MemberDocsUpdateOne200Response;
      return this.apiClient.callApi(
        '/members/{memberId}/docs/{docKey}/name', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the memberDocsUpdateOne operation.
     * @callback module:api/DocsApi~memberDocsUpdateOneCallback
     * @param {String} error Error message, if any.
     * @param {module:model/MemberDocsUpdateOne200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update existing member doc
     * Upload new member document.  This operation will create a new document associated with docKey and original doc will be archived.  This operation is restricted to elevated roles.
     * @param {String} memberId member id
     * @param {module:model/MembershipDocKey} docKey member id
     * @param {String} docName 
     * @param {File} docFile 
     * @param {module:api/DocsApi~memberDocsUpdateOneCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/MemberDocsUpdateOne200Response}
     */
    memberDocsUpdateOne(memberId, docKey, docName, docFile, callback) {
      let postBody = null;
      // verify the required parameter 'memberId' is set
      if (memberId === undefined || memberId === null) {
        throw new Error("Missing the required parameter 'memberId' when calling memberDocsUpdateOne");
      }
      // verify the required parameter 'docKey' is set
      if (docKey === undefined || docKey === null) {
        throw new Error("Missing the required parameter 'docKey' when calling memberDocsUpdateOne");
      }
      // verify the required parameter 'docName' is set
      if (docName === undefined || docName === null) {
        throw new Error("Missing the required parameter 'docName' when calling memberDocsUpdateOne");
      }
      // verify the required parameter 'docFile' is set
      if (docFile === undefined || docFile === null) {
        throw new Error("Missing the required parameter 'docFile' when calling memberDocsUpdateOne");
      }

      let pathParams = {
        'memberId': memberId,
        'docKey': docKey
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'docName': docName,
        'docFile': docFile
      };

      let authNames = ['bearerTokenAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = MemberDocsUpdateOne200Response;
      return this.apiClient.callApi(
        '/members/{memberId}/docs/{docKey}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
