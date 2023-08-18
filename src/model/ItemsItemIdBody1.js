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
 * The ItemsItemIdBody1 model module.
 * @module model/ItemsItemIdBody1
 * @version 0.1.0
 */
export class ItemsItemIdBody1 {
  /**
   * Constructs a new <code>ItemsItemIdBody1</code>.
   * @alias module:model/ItemsItemIdBody1
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ItemsItemIdBody1</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ItemsItemIdBody1} obj Optional instance to populate.
   * @return {module:model/ItemsItemIdBody1} The populated <code>ItemsItemIdBody1</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ItemsItemIdBody1();
      if (data.hasOwnProperty('notes'))
        obj.notes = ApiClient.convertToType(data['notes'], 'String');
      if (data.hasOwnProperty('discount'))
        obj.discount = ApiClient.convertToType(data['discount'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} notes
 */
ItemsItemIdBody1.prototype.notes = undefined;

/**
 * @member {String} discount
 */
ItemsItemIdBody1.prototype.discount = undefined;
