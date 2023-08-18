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
import {ResShopOrderItem} from './ResShopOrderItem';
import {ResShopOrderPayment} from './ResShopOrderPayment';
import {ResShopOrderTotals} from './ResShopOrderTotals';
import {ShopOrderStatus} from './ShopOrderStatus';

/**
 * The ResShopOrder model module.
 * @module model/ResShopOrder
 * @version 0.1.0
 */
export class ResShopOrder {
  /**
   * Constructs a new <code>ResShopOrder</code>.
   * @alias module:model/ResShopOrder
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ResShopOrder</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopOrder} obj Optional instance to populate.
   * @return {module:model/ResShopOrder} The populated <code>ResShopOrder</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopOrder();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'Date');
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], 'Date');
      if (data.hasOwnProperty('deletedAt'))
        obj.deletedAt = ApiClient.convertToType(data['deletedAt'], 'Date');
      if (data.hasOwnProperty('number'))
        obj._number = ApiClient.convertToType(data['number'], 'String');
      if (data.hasOwnProperty('status'))
        obj.status = ShopOrderStatus.constructFromObject(data['status']);
      if (data.hasOwnProperty('items'))
        obj.items = ApiClient.convertToType(data['items'], [ResShopOrderItem]);
      if (data.hasOwnProperty('amountCredit'))
        obj.amountCredit = ApiClient.convertToType(data['amountCredit'], 'String');
      if (data.hasOwnProperty('totals'))
        obj.totals = ResShopOrderTotals.constructFromObject(data['totals']);
      if (data.hasOwnProperty('payment'))
        obj.payment = ResShopOrderPayment.constructFromObject(data['payment']);
      if (data.hasOwnProperty('notes'))
        obj.notes = ApiClient.convertToType(data['notes'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
ResShopOrder.prototype.id = undefined;

/**
 * @member {Date} createdAt
 */
ResShopOrder.prototype.createdAt = undefined;

/**
 * @member {Date} updatedAt
 */
ResShopOrder.prototype.updatedAt = undefined;

/**
 * @member {Date} deletedAt
 */
ResShopOrder.prototype.deletedAt = undefined;

/**
 * @member {String} _number
 */
ResShopOrder.prototype._number = undefined;

/**
 * @member {module:model/ShopOrderStatus} status
 */
ResShopOrder.prototype.status = undefined;

/**
 * @member {Array.<module:model/ResShopOrderItem>} items
 */
ResShopOrder.prototype.items = undefined;

/**
 * @member {String} amountCredit
 */
ResShopOrder.prototype.amountCredit = undefined;

/**
 * @member {module:model/ResShopOrderTotals} totals
 */
ResShopOrder.prototype.totals = undefined;

/**
 * @member {module:model/ResShopOrderPayment} payment
 */
ResShopOrder.prototype.payment = undefined;

/**
 * @member {String} notes
 */
ResShopOrder.prototype.notes = undefined;
