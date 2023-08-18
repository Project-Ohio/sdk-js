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
import ResShopOrder from './ResShopOrder';

/**
 * The MemberOrdersCreate201Response model module.
 * @module model/MemberOrdersCreate201Response
 * @version 0.1.0
 */
class MemberOrdersCreate201Response {
    /**
     * Constructs a new <code>MemberOrdersCreate201Response</code>.
     * @alias module:model/MemberOrdersCreate201Response
     */
    constructor() { 
        
        MemberOrdersCreate201Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>MemberOrdersCreate201Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MemberOrdersCreate201Response} obj Optional instance to populate.
     * @return {module:model/MemberOrdersCreate201Response} The populated <code>MemberOrdersCreate201Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MemberOrdersCreate201Response();

            if (data.hasOwnProperty('order')) {
                obj['order'] = ResShopOrder.constructFromObject(data['order']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MemberOrdersCreate201Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberOrdersCreate201Response</code>.
     */
    static validateJSON(data) {
        // validate the optional field `order`
        if (data['order']) { // data not null
          ResShopOrder.validateJSON(data['order']);
        }

        return true;
    }


}



/**
 * @member {module:model/ResShopOrder} order
 */
MemberOrdersCreate201Response.prototype['order'] = undefined;






export default MemberOrdersCreate201Response;

