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
 * The PurchaseItemsPurchaseItemIdBody model module.
 * @module model/PurchaseItemsPurchaseItemIdBody
 * @version 0.1.0
 */
export class PurchaseItemsPurchaseItemIdBody {
  /**
   * Constructs a new <code>PurchaseItemsPurchaseItemIdBody</code>.
   * @alias module:model/PurchaseItemsPurchaseItemIdBody
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>PurchaseItemsPurchaseItemIdBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PurchaseItemsPurchaseItemIdBody} obj Optional instance to populate.
   * @return {module:model/PurchaseItemsPurchaseItemIdBody} The populated <code>PurchaseItemsPurchaseItemIdBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new PurchaseItemsPurchaseItemIdBody();
      if (data.hasOwnProperty('notes'))
        obj.notes = ApiClient.convertToType(data['notes'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} notes
 */
PurchaseItemsPurchaseItemIdBody.prototype.notes = undefined;

