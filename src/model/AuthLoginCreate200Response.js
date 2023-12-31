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
import AuthLoginCreate200ResponseAuthTokens from './AuthLoginCreate200ResponseAuthTokens';
import MemberRole from './MemberRole';

/**
 * The AuthLoginCreate200Response model module.
 * @module model/AuthLoginCreate200Response
 * @version 0.1.0
 */
class AuthLoginCreate200Response {
    /**
     * Constructs a new <code>AuthLoginCreate200Response</code>.
     * @alias module:model/AuthLoginCreate200Response
     */
    constructor() { 
        
        AuthLoginCreate200Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AuthLoginCreate200Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthLoginCreate200Response} obj Optional instance to populate.
     * @return {module:model/AuthLoginCreate200Response} The populated <code>AuthLoginCreate200Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthLoginCreate200Response();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('role')) {
                obj['role'] = MemberRole.constructFromObject(data['role']);
            }
            if (data.hasOwnProperty('authTokens')) {
                obj['authTokens'] = AuthLoginCreate200ResponseAuthTokens.constructFromObject(data['authTokens']);
            }
            if (data.hasOwnProperty('sessionExpiresAt')) {
                obj['sessionExpiresAt'] = ApiClient.convertToType(data['sessionExpiresAt'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuthLoginCreate200Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate200Response</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        // validate the optional field `authTokens`
        if (data['authTokens']) { // data not null
          AuthLoginCreate200ResponseAuthTokens.validateJSON(data['authTokens']);
        }

        return true;
    }


}



/**
 * @member {String} id
 */
AuthLoginCreate200Response.prototype['id'] = undefined;

/**
 * @member {String} email
 */
AuthLoginCreate200Response.prototype['email'] = undefined;

/**
 * @member {module:model/MemberRole} role
 */
AuthLoginCreate200Response.prototype['role'] = undefined;

/**
 * @member {module:model/AuthLoginCreate200ResponseAuthTokens} authTokens
 */
AuthLoginCreate200Response.prototype['authTokens'] = undefined;

/**
 * @member {Date} sessionExpiresAt
 */
AuthLoginCreate200Response.prototype['sessionExpiresAt'] = undefined;






export default AuthLoginCreate200Response;

