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
 * The AuthPassBody model module.
 * @module model/AuthPassBody
 * @version 0.1.0
 */
export class AuthPassBody {
  /**
   * Constructs a new <code>AuthPassBody</code>.
   * @alias module:model/AuthPassBody
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>AuthPassBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthPassBody} obj Optional instance to populate.
   * @return {module:model/AuthPassBody} The populated <code>AuthPassBody</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new AuthPassBody();
      if (data.hasOwnProperty('pass'))
        obj.pass = ApiClient.convertToType(data['pass'], 'String');
      if (data.hasOwnProperty('passConf'))
        obj.passConf = ApiClient.convertToType(data['passConf'], 'String');
      if (data.hasOwnProperty('elevatedPass'))
        obj.elevatedPass = ApiClient.convertToType(data['elevatedPass'], 'String');
      if (data.hasOwnProperty('elevatedPassConf'))
        obj.elevatedPassConf = ApiClient.convertToType(data['elevatedPassConf'], 'String');
    }
    return obj;
  }
}

/**
 * @member {String} pass
 */
AuthPassBody.prototype.pass = undefined;

/**
 * @member {String} passConf
 */
AuthPassBody.prototype.passConf = undefined;

/**
 * @member {String} elevatedPass
 */
AuthPassBody.prototype.elevatedPass = undefined;

/**
 * @member {String} elevatedPassConf
 */
AuthPassBody.prototype.elevatedPassConf = undefined;

