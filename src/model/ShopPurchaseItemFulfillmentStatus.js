/*
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * OpenAPI spec version: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 3.0.46
 *
 * Do not edit the class manually.
 *
 */
import {ApiClient} from '../ApiClient';

/**
 * Enum class ShopPurchaseItemFulfillmentStatus.
 * @enum {String}
 * @readonly
 */
const ShopPurchaseItemFulfillmentStatus = {
  /**
   * value: "PENDING"
   * @const
   */
  PENDING: "PENDING",

  /**
   * value: "CANCELLED"
   * @const
   */
  CANCELLED: "CANCELLED",

  /**
   * value: "IN_PROGRESS"
   * @const
   */
  IN_PROGRESS: "IN_PROGRESS",

  /**
   * value: "FULFILLED"
   * @const
   */
  FULFILLED: "FULFILLED",

  /**
   * Returns a <code>ShopPurchaseItemFulfillmentStatus</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopPurchaseItemFulfillmentStatus} The enum <code>ShopPurchaseItemFulfillmentStatus</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {ShopPurchaseItemFulfillmentStatus};