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
import ShopItemType from './ShopItemType';

/**
 * The ShopItemsCreateRequest model module.
 * @module model/ShopItemsCreateRequest
 * @version 0.1.0
 */
class ShopItemsCreateRequest {
    /**
     * Constructs a new <code>ShopItemsCreateRequest</code>.
     * @alias module:model/ShopItemsCreateRequest
     * @param name {String} 
     * @param type {module:model/ShopItemType} 
     */
    constructor(name, type) { 
        
        ShopItemsCreateRequest.initialize(this, name, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, type) { 
        obj['name'] = name;
        obj['type'] = type;
    }

    /**
     * Constructs a <code>ShopItemsCreateRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ShopItemsCreateRequest} obj Optional instance to populate.
     * @return {module:model/ShopItemsCreateRequest} The populated <code>ShopItemsCreateRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ShopItemsCreateRequest();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ShopItemType.constructFromObject(data['type']);
            }
            if (data.hasOwnProperty('info')) {
                obj['info'] = ApiClient.convertToType(data['info'], 'String');
            }
            if (data.hasOwnProperty('amountFee')) {
                obj['amountFee'] = ApiClient.convertToType(data['amountFee'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ShopItemsCreateRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShopItemsCreateRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ShopItemsCreateRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['info'] && !(typeof data['info'] === 'string' || data['info'] instanceof String)) {
            throw new Error("Expected the field `info` to be a primitive type in the JSON string but got " + data['info']);
        }
        // ensure the json data is a string
        if (data['amountFee'] && !(typeof data['amountFee'] === 'string' || data['amountFee'] instanceof String)) {
            throw new Error("Expected the field `amountFee` to be a primitive type in the JSON string but got " + data['amountFee']);
        }

        return true;
    }


}

ShopItemsCreateRequest.RequiredProperties = ["name", "type"];

/**
 * @member {String} name
 */
ShopItemsCreateRequest.prototype['name'] = undefined;

/**
 * @member {module:model/ShopItemType} type
 */
ShopItemsCreateRequest.prototype['type'] = undefined;

/**
 * @member {String} info
 */
ShopItemsCreateRequest.prototype['info'] = undefined;

/**
 * @member {String} amountFee
 */
ShopItemsCreateRequest.prototype['amountFee'] = undefined;






export default ShopItemsCreateRequest;

