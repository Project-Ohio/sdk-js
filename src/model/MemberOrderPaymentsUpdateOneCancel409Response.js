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
 * The MemberOrderPaymentsUpdateOneCancel409Response model module.
 * @module model/MemberOrderPaymentsUpdateOneCancel409Response
 * @version 0.1.0
 */
class MemberOrderPaymentsUpdateOneCancel409Response {
    /**
     * Constructs a new <code>MemberOrderPaymentsUpdateOneCancel409Response</code>.
     * @alias module:model/MemberOrderPaymentsUpdateOneCancel409Response
     */
    constructor() { 
        
        MemberOrderPaymentsUpdateOneCancel409Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>MemberOrderPaymentsUpdateOneCancel409Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MemberOrderPaymentsUpdateOneCancel409Response} obj Optional instance to populate.
     * @return {module:model/MemberOrderPaymentsUpdateOneCancel409Response} The populated <code>MemberOrderPaymentsUpdateOneCancel409Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MemberOrderPaymentsUpdateOneCancel409Response();

            if (data.hasOwnProperty('err')) {
                obj['err'] = ApiClient.convertToType(data['err'], 'String');
            }
            if (data.hasOwnProperty('errCode')) {
                obj['errCode'] = ApiClient.convertToType(data['errCode'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MemberOrderPaymentsUpdateOneCancel409Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrderPaymentsUpdateOneCancel409Response</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['err'] && !(typeof data['err'] === 'string' || data['err'] instanceof String)) {
            throw new Error("Expected the field `err` to be a primitive type in the JSON string but got " + data['err']);
        }

        return true;
    }


}



/**
 * @member {String} err
 */
MemberOrderPaymentsUpdateOneCancel409Response.prototype['err'] = undefined;

/**
 * @member {Number} errCode
 */
MemberOrderPaymentsUpdateOneCancel409Response.prototype['errCode'] = undefined;






export default MemberOrderPaymentsUpdateOneCancel409Response;
