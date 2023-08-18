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
 * The AuthEmailUpdateVerify200Response model module.
 * @module model/AuthEmailUpdateVerify200Response
 * @version 0.1.0
 */
class AuthEmailUpdateVerify200Response {
    /**
     * Constructs a new <code>AuthEmailUpdateVerify200Response</code>.
     * @alias module:model/AuthEmailUpdateVerify200Response
     */
    constructor() { 
        
        AuthEmailUpdateVerify200Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AuthEmailUpdateVerify200Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthEmailUpdateVerify200Response} obj Optional instance to populate.
     * @return {module:model/AuthEmailUpdateVerify200Response} The populated <code>AuthEmailUpdateVerify200Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthEmailUpdateVerify200Response();

            if (data.hasOwnProperty('msg')) {
                obj['msg'] = ApiClient.convertToType(data['msg'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuthEmailUpdateVerify200Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthEmailUpdateVerify200Response</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['msg'] && !(typeof data['msg'] === 'string' || data['msg'] instanceof String)) {
            throw new Error("Expected the field `msg` to be a primitive type in the JSON string but got " + data['msg']);
        }

        return true;
    }


}



/**
 * @member {String} msg
 */
AuthEmailUpdateVerify200Response.prototype['msg'] = undefined;






export default AuthEmailUpdateVerify200Response;

