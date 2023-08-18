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
import {ShopOrderPaymentMethod} from './ShopOrderPaymentMethod';
import {ShopOrderPaymentStatus} from './ShopOrderPaymentStatus';

/**
 * The ResShopOrderPayment model module.
 * @module model/ResShopOrderPayment
 * @version 0.1.0
 */
export class ResShopOrderPayment {
  /**
   * Constructs a new <code>ResShopOrderPayment</code>.
   * @alias module:model/ResShopOrderPayment
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ResShopOrderPayment</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResShopOrderPayment} obj Optional instance to populate.
   * @return {module:model/ResShopOrderPayment} The populated <code>ResShopOrderPayment</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResShopOrderPayment();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('amount'))
        obj.amount = ApiClient.convertToType(data['amount'], 'String');
      if (data.hasOwnProperty('method'))
        obj.method = ShopOrderPaymentMethod.constructFromObject(data['method']);
      if (data.hasOwnProperty('methodCardLast4'))
        obj.methodCardLast4 = ApiClient.convertToType(data['methodCardLast4'], 'String');
      if (data.hasOwnProperty('status'))
        obj.status = ShopOrderPaymentStatus.constructFromObject(data['status']);
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'Date');
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], 'Date');
      if (data.hasOwnProperty('refundedAt'))
        obj.refundedAt = ApiClient.convertToType(data['refundedAt'], 'Date');
      if (data.hasOwnProperty('deletedAt'))
        obj.deletedAt = ApiClient.convertToType(data['deletedAt'], 'Date');
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
ResShopOrderPayment.prototype.id = undefined;

/**
 * @member {String} amount
 */
ResShopOrderPayment.prototype.amount = undefined;

/**
 * @member {module:model/ShopOrderPaymentMethod} method
 */
ResShopOrderPayment.prototype.method = undefined;

/**
 * @member {String} methodCardLast4
 */
ResShopOrderPayment.prototype.methodCardLast4 = undefined;

/**
 * @member {module:model/ShopOrderPaymentStatus} status
 */
ResShopOrderPayment.prototype.status = undefined;

/**
 * @member {Date} createdAt
 */
ResShopOrderPayment.prototype.createdAt = undefined;

/**
 * @member {Date} updatedAt
 */
ResShopOrderPayment.prototype.updatedAt = undefined;

/**
 * @member {Date} refundedAt
 */
ResShopOrderPayment.prototype.refundedAt = undefined;

/**
 * @member {Date} deletedAt
 */
ResShopOrderPayment.prototype.deletedAt = undefined;

