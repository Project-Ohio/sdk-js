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
import AuthToken from './AuthToken';

/**
 * The AuthLoginCreate200ResponseAuthTokens model module.
 * @module model/AuthLoginCreate200ResponseAuthTokens
 * @version 0.1.0
 */
class AuthLoginCreate200ResponseAuthTokens {
    /**
     * Constructs a new <code>AuthLoginCreate200ResponseAuthTokens</code>.
     * @alias module:model/AuthLoginCreate200ResponseAuthTokens
     */
    constructor() { 
        
        AuthLoginCreate200ResponseAuthTokens.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AuthLoginCreate200ResponseAuthTokens</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthLoginCreate200ResponseAuthTokens} obj Optional instance to populate.
     * @return {module:model/AuthLoginCreate200ResponseAuthTokens} The populated <code>AuthLoginCreate200ResponseAuthTokens</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthLoginCreate200ResponseAuthTokens();

            if (data.hasOwnProperty('refresh')) {
                obj['refresh'] = AuthToken.constructFromObject(data['refresh']);
            }
            if (data.hasOwnProperty('auth')) {
                obj['auth'] = AuthToken.constructFromObject(data['auth']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuthLoginCreate200ResponseAuthTokens</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthLoginCreate200ResponseAuthTokens</code>.
     */
    static validateJSON(data) {
        // validate the optional field `refresh`
        if (data['refresh']) { // data not null
          AuthToken.validateJSON(data['refresh']);
        }
        // validate the optional field `auth`
        if (data['auth']) { // data not null
          AuthToken.validateJSON(data['auth']);
        }

        return true;
    }


}



/**
 * @member {module:model/AuthToken} refresh
 */
AuthLoginCreate200ResponseAuthTokens.prototype['refresh'] = undefined;

/**
 * @member {module:model/AuthToken} auth
 */
AuthLoginCreate200ResponseAuthTokens.prototype['auth'] = undefined;






export default AuthLoginCreate200ResponseAuthTokens;

