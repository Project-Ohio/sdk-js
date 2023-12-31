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
import ResShopOrderItem from './ResShopOrderItem';
import ShopPurchaseItemFulfillmentStatus from './ShopPurchaseItemFulfillmentStatus';

/**
 * The ResShopPurchaseItem model module.
 * @module model/ResShopPurchaseItem
 * @version 0.1.0
 */
class ResShopPurchaseItem {
    /**
     * Constructs a new <code>ResShopPurchaseItem</code>.
     * @alias module:model/ResShopPurchaseItem
     */
    constructor() { 
        
        ResShopPurchaseItem.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResShopPurchaseItem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResShopPurchaseItem} obj Optional instance to populate.
     * @return {module:model/ResShopPurchaseItem} The populated <code>ResShopPurchaseItem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResShopPurchaseItem();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('fulfillmentStatus')) {
                obj['fulfillmentStatus'] = ShopPurchaseItemFulfillmentStatus.constructFromObject(data['fulfillmentStatus']);
            }
            if (data.hasOwnProperty('orderId')) {
                obj['orderId'] = ApiClient.convertToType(data['orderId'], 'String');
            }
            if (data.hasOwnProperty('orderItem')) {
                obj['orderItem'] = ResShopOrderItem.constructFromObject(data['orderItem']);
            }
            if (data.hasOwnProperty('feePaid')) {
                obj['feePaid'] = ApiClient.convertToType(data['feePaid'], 'Number');
            }
            if (data.hasOwnProperty('notes')) {
                obj['notes'] = ApiClient.convertToType(data['notes'], 'String');
            }
            if (data.hasOwnProperty('createdAt')) {
                obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
            }
            if (data.hasOwnProperty('updatedAt')) {
                obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
            }
            if (data.hasOwnProperty('deletedAt')) {
                obj['deletedAt'] = ApiClient.convertToType(data['deletedAt'], Object);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResShopPurchaseItem</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResShopPurchaseItem</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['orderId'] && !(typeof data['orderId'] === 'string' || data['orderId'] instanceof String)) {
            throw new Error("Expected the field `orderId` to be a primitive type in the JSON string but got " + data['orderId']);
        }
        // validate the optional field `orderItem`
        if (data['orderItem']) { // data not null
          ResShopOrderItem.validateJSON(data['orderItem']);
        }
        // ensure the json data is a string
        if (data['notes'] && !(typeof data['notes'] === 'string' || data['notes'] instanceof String)) {
            throw new Error("Expected the field `notes` to be a primitive type in the JSON string but got " + data['notes']);
        }

        return true;
    }


}



/**
 * @member {String} id
 */
ResShopPurchaseItem.prototype['id'] = undefined;

/**
 * @member {module:model/ShopPurchaseItemFulfillmentStatus} fulfillmentStatus
 */
ResShopPurchaseItem.prototype['fulfillmentStatus'] = undefined;

/**
 * @member {String} orderId
 */
ResShopPurchaseItem.prototype['orderId'] = undefined;

/**
 * @member {module:model/ResShopOrderItem} orderItem
 */
ResShopPurchaseItem.prototype['orderItem'] = undefined;

/**
 * @member {Number} feePaid
 */
ResShopPurchaseItem.prototype['feePaid'] = undefined;

/**
 * @member {String} notes
 */
ResShopPurchaseItem.prototype['notes'] = undefined;

/**
 * @member {Date} createdAt
 */
ResShopPurchaseItem.prototype['createdAt'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResShopPurchaseItem.prototype['updatedAt'] = undefined;

/**
 * @member {Object} deletedAt
 */
ResShopPurchaseItem.prototype['deletedAt'] = undefined;






export default ResShopPurchaseItem;

