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
 * The MemberCredentialCardsCreateRequest model module.
 * @module model/MemberCredentialCardsCreateRequest
 * @version 0.1.0
 */
class MemberCredentialCardsCreateRequest {
    /**
     * Constructs a new <code>MemberCredentialCardsCreateRequest</code>.
     * @alias module:model/MemberCredentialCardsCreateRequest
     */
    constructor() { 
        
        MemberCredentialCardsCreateRequest.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>MemberCredentialCardsCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MemberCredentialCardsCreateRequest} obj Optional instance to populate.
     * @return {module:model/MemberCredentialCardsCreateRequest} The populated <code>MemberCredentialCardsCreateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MemberCredentialCardsCreateRequest();

            if (data.hasOwnProperty('purchaseItemId')) {
                obj['purchaseItemId'] = ApiClient.convertToType(data['purchaseItemId'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MemberCredentialCardsCreateRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MemberCredentialCardsCreateRequest</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['purchaseItemId'] && !(typeof data['purchaseItemId'] === 'string' || data['purchaseItemId'] instanceof String)) {
            throw new Error("Expected the field `purchaseItemId` to be a primitive type in the JSON string but got " + data['purchaseItemId']);
        }

        return true;
    }


}



/**
 * @member {String} purchaseItemId
 */
MemberCredentialCardsCreateRequest.prototype['purchaseItemId'] = undefined;






export default MemberCredentialCardsCreateRequest;

