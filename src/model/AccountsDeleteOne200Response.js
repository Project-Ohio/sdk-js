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

import ApiClient from '../ApiClient';

/**
 * The AccountsDeleteOne200Response model module.
 * @module model/AccountsDeleteOne200Response
 * @version 0.1.0
 */
class AccountsDeleteOne200Response {
    /**
     * Constructs a new <code>AccountsDeleteOne200Response</code>.
     * @alias module:model/AccountsDeleteOne200Response
     */
    constructor() { 
        
        AccountsDeleteOne200Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AccountsDeleteOne200Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AccountsDeleteOne200Response} obj Optional instance to populate.
     * @return {module:model/AccountsDeleteOne200Response} The populated <code>AccountsDeleteOne200Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AccountsDeleteOne200Response();

            if (data.hasOwnProperty('msg')) {
                obj['msg'] = ApiClient.convertToType(data['msg'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AccountsDeleteOne200Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AccountsDeleteOne200Response</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * @member {Object} msg
 */
AccountsDeleteOne200Response.prototype['msg'] = undefined;






export default AccountsDeleteOne200Response;
