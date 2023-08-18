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
import {AuthEmailBody} from '../model/AuthEmailBody';
import {AuthLoginBody} from '../model/AuthLoginBody';
import {AuthPassBody} from '../model/AuthPassBody';
import {InlineResponse200} from '../model/InlineResponse200';
import {InlineResponse2001} from '../model/InlineResponse2001';
import {InlineResponse2002} from '../model/InlineResponse2002';
import {InlineResponse20026} from '../model/InlineResponse20026';
import {InlineResponse2003} from '../model/InlineResponse2003';
import {InlineResponse2004} from '../model/InlineResponse2004';
import {InlineResponse400} from '../model/InlineResponse400';
import {InlineResponse401} from '../model/InlineResponse401';
import {InlineResponse403} from '../model/InlineResponse403';
import {InlineResponse404} from '../model/InlineResponse404';
import {InlineResponse409} from '../model/InlineResponse409';
import {InlineResponse4091} from '../model/InlineResponse4091';

/**
* Auth service.
* @module api/AuthApi
* @version 0.1.0
*/
export class AuthApi {

    /**
    * Constructs a new AuthApi. 
    * @alias module:api/AuthApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the authAccountPasswordResetCreate operation.
     * @callback moduleapi/AuthApi~authAccountPasswordResetCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse20026{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Password reset account
     * Reset account password.  This operation is restricted to elevated roles unless auth user is also the user being reset.  This action will also cause an email to be sent to user with a temporary password which must be changed upon first logging in.
     * @param {String} accountId account id
     * @param {module:api/AuthApi~authAccountPasswordResetCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authAccountPasswordResetCreate(accountId, callback) {
      
      let postBody = null;
      // verify the required parameter 'accountId' is set
      if (accountId === undefined || accountId === null) {
        throw new Error("Missing the required parameter 'accountId' when calling authAccountPasswordResetCreate");
      }

      let pathParams = {
        'accountId': accountId
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
      let returnType = InlineResponse20026;

      return this.apiClient.callApi(
        '/accounts/{accountId}/pass/reset', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the authEmailUpdateRequest operation.
     * @callback moduleapi/AuthApi~authEmailUpdateRequestCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2003{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Email Update Request
     * Update user email request. Both email and email conf values should match.  Email must be different from current email.  This operation will result in a confirmation email being sent to the new email.  Only after client confirmation will the email change go into effect.
     * @param {Object} opts Optional parameters
     * @param {module:model/AuthEmailBody} opts.body The respective email and conf fields should match.
     * @param {module:api/AuthApi~authEmailUpdateRequestCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authEmailUpdateRequest(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
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
      let returnType = InlineResponse2003;

      return this.apiClient.callApi(
        '/auth/email', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the authEmailUpdateVerify operation.
     * @callback moduleapi/AuthApi~authEmailUpdateVerifyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2004{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Confirm account email
     * Confirms account email
     * @param {String} token JWT signature
     * @param {module:api/AuthApi~authEmailUpdateVerifyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authEmailUpdateVerify(token, callback) {
      
      let postBody = null;
      // verify the required parameter 'token' is set
      if (token === undefined || token === null) {
        throw new Error("Missing the required parameter 'token' when calling authEmailUpdateVerify");
      }

      let pathParams = {
        
      };
      let queryParams = {
        'token': token
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2004;

      return this.apiClient.callApi(
        '/auth/email/verify', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the authLoginCreate operation.
     * @callback moduleapi/AuthApi~authLoginCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse200{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Login
     * New login request all users.  This operation uses basic auth where the username is the account email and the password is the account password.  This operation will fail with 409 response if account role is elevated and the &#x27;elevatedPass&#x27; value is not provided.
     * @param {Object} opts Optional parameters
     * @param {module:model/AuthLoginBody} opts.body 
     * @param {module:api/AuthApi~authLoginCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authLoginCreate(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['basicEmailPassword'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = InlineResponse200;

      return this.apiClient.callApi(
        '/auth/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the authPasswordUpdate operation.
     * @callback moduleapi/AuthApi~authPasswordUpdateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2002{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Password Update
     * Update password for currently authenticated user.  Updated password cannot match current password.  Updated elevated password cannot match current elevated password.  This operation will not affect the open auth session.
     * @param {Object} opts Optional parameters
     * @param {module:model/AuthPassBody} opts.body The respective pass and conf fields should match if provided.  Only elevated roles require elevatedPass(Conf).
     * @param {module:api/AuthApi~authPasswordUpdateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authPasswordUpdate(opts, callback) {
      opts = opts || {};
      let postBody = opts['body'];

      let pathParams = {
        
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
      let returnType = InlineResponse2002;

      return this.apiClient.callApi(
        '/auth/pass', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
    /**
     * Callback function to receive the result of the authRefreshCreate operation.
     * @callback moduleapi/AuthApi~authRefreshCreateCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2001{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Auth Refresh
     * Refresh auth session, which provides a new auth token for use in other authenticated requests.  This does not extend the current auth session.
     * @param {module:api/AuthApi~authRefreshCreateCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    authRefreshCreate(callback) {
      
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = ['bearerTokenRefresh'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2001;

      return this.apiClient.callApi(
        '/auth/refresh', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}