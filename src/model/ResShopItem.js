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
import {ShopItemType} from './ShopItemType';

/**
 * The ResShopItem model module.
 * @module model/ResShopItem
 * @version 0.1.0
 */
export class ResShopItem {
  /**
   * Constructs a new <code>ResShopItem</code>.
   * @alias module:model/ResShopItem
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ResShopItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopItem} obj Optional instance to populate.
   * @return {module:model/ResShopItem} The populated <code>ResShopItem</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopItem();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
      if (data.hasOwnProperty('info'))
        obj.info = ApiClient.convertToType(data['info'], 'String');
      if (data.hasOwnProperty('type'))
        obj.type = ShopItemType.constructFromObject(data['type']);
      if (data.hasOwnProperty('amountFee'))
        obj.amountFee = ApiClient.convertToType(data['amountFee'], 'String');
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], Object);
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], Object);
      if (data.hasOwnProperty('deletedAt'))
        obj.deletedAt = ApiClient.convertToType(data['deletedAt'], Object);
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
ResShopItem.prototype.id = undefined;

/**
 * @member {String} name
 */
ResShopItem.prototype.name = undefined;

/**
 * @member {String} info
 */
ResShopItem.prototype.info = undefined;

/**
 * @member {module:model/ShopItemType} type
 */
ResShopItem.prototype.type = undefined;

/**
 * @member {String} amountFee
 */
ResShopItem.prototype.amountFee = undefined;

/**
 * @member {Object} createdAt
 */
ResShopItem.prototype.createdAt = undefined;

/**
 * @member {Object} updatedAt
 */
ResShopItem.prototype.updatedAt = undefined;

/**
 * @member {Object} deletedAt
 */
ResShopItem.prototype.deletedAt = undefined;

