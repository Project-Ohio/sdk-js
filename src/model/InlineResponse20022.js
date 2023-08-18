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
import {ResShopPurchaseItem} from './ResShopPurchaseItem';

/**
 * The InlineResponse20022 model module.
 * @module model/InlineResponse20022
 * @version 0.1.0
 */
export class InlineResponse20022 {
  /**
   * Constructs a new <code>InlineResponse20022</code>.
   * @alias module:model/InlineResponse20022
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>InlineResponse20022</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse20022} obj Optional instance to populate.
   * @return {module:model/InlineResponse20022} The populated <code>InlineResponse20022</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse20022();
      if (data.hasOwnProperty('items'))
        obj.items = ApiClient.convertToType(data['items'], [ResShopPurchaseItem]);
    }
    return obj;
  }
}

/**
 * @member {Array.<module:model/ResShopPurchaseItem>} items
 */
InlineResponse20022.prototype.items = undefined;
