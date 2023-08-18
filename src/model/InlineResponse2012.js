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
import {ResShopItem} from './ResShopItem';

/**
 * The InlineResponse2012 model module.
 * @module model/InlineResponse2012
 * @version 0.1.0
 */
export class InlineResponse2012 {
  /**
   * Constructs a new <code>InlineResponse2012</code>.
   * @alias module:model/InlineResponse2012
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>InlineResponse2012</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse2012} obj Optional instance to populate.
   * @return {module:model/InlineResponse2012} The populated <code>InlineResponse2012</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse2012();
      if (data.hasOwnProperty('item'))
        obj.item = ResShopItem.constructFromObject(data['item']);
    }
    return obj;
  }
}

/**
 * @member {module:model/ResShopItem} item
 */
InlineResponse2012.prototype.item = undefined;
