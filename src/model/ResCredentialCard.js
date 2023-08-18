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
import {ResMemberBase} from './ResMemberBase';

/**
 * The ResCredentialCard model module.
 * @module model/ResCredentialCard
 * @version 0.1.0
 */
export class ResCredentialCard {
  /**
   * Constructs a new <code>ResCredentialCard</code>.
   * @alias module:model/ResCredentialCard
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>ResCredentialCard</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ResCredentialCard} obj Optional instance to populate.
   * @return {module:model/ResCredentialCard} The populated <code>ResCredentialCard</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new ResCredentialCard();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('purchaseItemId'))
        obj.purchaseItemId = ApiClient.convertToType(data['purchaseItemId'], 'String');
      if (data.hasOwnProperty('recordingNumber'))
        obj.recordingNumber = ApiClient.convertToType(data['recordingNumber'], 'String');
      if (data.hasOwnProperty('masterRecordNumber'))
        obj.masterRecordNumber = ApiClient.convertToType(data['masterRecordNumber'], 'String');
      if (data.hasOwnProperty('printedAt'))
        obj.printedAt = ApiClient.convertToType(data['printedAt'], 'Date');
      if (data.hasOwnProperty('verifiedAt'))
        obj.verifiedAt = ApiClient.convertToType(data['verifiedAt'], 'Date');
      if (data.hasOwnProperty('expirationDate'))
        obj.expirationDate = ApiClient.convertToType(data['expirationDate'], 'Date');
      if (data.hasOwnProperty('createdAt'))
        obj.createdAt = ApiClient.convertToType(data['createdAt'], 'Date');
      if (data.hasOwnProperty('updatedAt'))
        obj.updatedAt = ApiClient.convertToType(data['updatedAt'], 'Date');
      if (data.hasOwnProperty('member'))
        obj.member = ResMemberBase.constructFromObject(data['member']);
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
ResCredentialCard.prototype.id = undefined;

/**
 * @member {String} purchaseItemId
 */
ResCredentialCard.prototype.purchaseItemId = undefined;

/**
 * @member {String} recordingNumber
 */
ResCredentialCard.prototype.recordingNumber = undefined;

/**
 * @member {String} masterRecordNumber
 */
ResCredentialCard.prototype.masterRecordNumber = undefined;

/**
 * @member {Date} printedAt
 */
ResCredentialCard.prototype.printedAt = undefined;

/**
 * @member {Date} verifiedAt
 */
ResCredentialCard.prototype.verifiedAt = undefined;

/**
 * @member {Date} expirationDate
 */
ResCredentialCard.prototype.expirationDate = undefined;

/**
 * @member {Date} createdAt
 */
ResCredentialCard.prototype.createdAt = undefined;

/**
 * @member {Date} updatedAt
 */
ResCredentialCard.prototype.updatedAt = undefined;

/**
 * @member {module:model/ResMemberBase} member
 */
ResCredentialCard.prototype.member = undefined;

