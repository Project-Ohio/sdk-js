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
import {InlineResponse2005} from '../model/InlineResponse2005';
import {InlineResponse400} from '../model/InlineResponse400';

/**
* Directory service.
* @module api/DirectoryApi
* @version 0.1.0
*/
export class DirectoryApi {

    /**
    * Constructs a new DirectoryApi. 
    * @alias module:api/DirectoryApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instanc
    e} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }

    /**
     * Callback function to receive the result of the directoryListingsList operation.
     * @callback moduleapi/DirectoryApi~directoryListingsListCallback
     * @param {String} error Error message, if any.
     * @param {module:model/InlineResponse2005{ data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get directory listings based on filter
     * Retrieve directory listings.  This operation is public.
     * @param {Object} opts Optional parameters
     * @param {String} opts.filterRole only return members with minimum auth role specified
     * @param {module:api/DirectoryApi~directoryListingsListCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link <&vendorExtensions.x-jsdoc-type>}
     */
    directoryListingsList(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
        
      };
      let queryParams = {
        'filterRole': opts['filterRole']
      };
      let headerParams = {
        
      };
      let formParams = {
        
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = InlineResponse2005;

      return this.apiClient.callApi(
        '/directoryListings', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

}