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
 * The AuthPasswordUpdateRequest model module.
 * @module model/AuthPasswordUpdateRequest
 * @version 0.1.0
 */
class AuthPasswordUpdateRequest {
    /**
     * Constructs a new <code>AuthPasswordUpdateRequest</code>.
     * @alias module:model/AuthPasswordUpdateRequest
     */
    constructor() { 
        
        AuthPasswordUpdateRequest.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AuthPasswordUpdateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AuthPasswordUpdateRequest} obj Optional instance to populate.
     * @return {module:model/AuthPasswordUpdateRequest} The populated <code>AuthPasswordUpdateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthPasswordUpdateRequest();

            if (data.hasOwnProperty('pass')) {
                obj['pass'] = ApiClient.convertToType(data['pass'], 'String');
            }
            if (data.hasOwnProperty('passConf')) {
                obj['passConf'] = ApiClient.convertToType(data['passConf'], 'String');
            }
            if (data.hasOwnProperty('elevatedPass')) {
                obj['elevatedPass'] = ApiClient.convertToType(data['elevatedPass'], 'String');
            }
            if (data.hasOwnProperty('elevatedPassConf')) {
                obj['elevatedPassConf'] = ApiClient.convertToType(data['elevatedPassConf'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AuthPasswordUpdateRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AuthPasswordUpdateRequest</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['pass'] && !(typeof data['pass'] === 'string' || data['pass'] instanceof String)) {
            throw new Error("Expected the field `pass` to be a primitive type in the JSON string but got " + data['pass']);
        }
        // ensure the json data is a string
        if (data['passConf'] && !(typeof data['passConf'] === 'string' || data['passConf'] instanceof String)) {
            throw new Error("Expected the field `passConf` to be a primitive type in the JSON string but got " + data['passConf']);
        }
        // ensure the json data is a string
        if (data['elevatedPass'] && !(typeof data['elevatedPass'] === 'string' || data['elevatedPass'] instanceof String)) {
            throw new Error("Expected the field `elevatedPass` to be a primitive type in the JSON string but got " + data['elevatedPass']);
        }
        // ensure the json data is a string
        if (data['elevatedPassConf'] && !(typeof data['elevatedPassConf'] === 'string' || data['elevatedPassConf'] instanceof String)) {
            throw new Error("Expected the field `elevatedPassConf` to be a primitive type in the JSON string but got " + data['elevatedPassConf']);
        }

        return true;
    }


}



/**
 * @member {String} pass
 */
AuthPasswordUpdateRequest.prototype['pass'] = undefined;

/**
 * @member {String} passConf
 */
AuthPasswordUpdateRequest.prototype['passConf'] = undefined;

/**
 * @member {String} elevatedPass
 */
AuthPasswordUpdateRequest.prototype['elevatedPass'] = undefined;

/**
 * @member {String} elevatedPassConf
 */
AuthPasswordUpdateRequest.prototype['elevatedPassConf'] = undefined;






export default AuthPasswordUpdateRequest;

