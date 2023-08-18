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
 * The InlineResponse4095 model module.
 * @module model/InlineResponse4095
 * @version 0.1.0
 */
export class InlineResponse4095 {
  /**
   * Constructs a new <code>InlineResponse4095</code>.
   * @alias module:model/InlineResponse4095
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>InlineResponse4095</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse4095} obj Optional instance to populate.
   * @return {module:model/InlineResponse4095} The populated <code>InlineResponse4095</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse4095();
      if (data.hasOwnProperty('err'))
        obj.err = ApiClient.convertToType(data['err'], 'String');
      if (data.hasOwnProperty('errCode'))
        obj.errCode = ApiClient.convertToType(data['errCode'], 'Number');
    }
    return obj;
  }
}

/**
 * @member {String} err
 */
InlineResponse4095.prototype.err = undefined;

/**
 * @member {Number} errCode
 */
InlineResponse4095.prototype.errCode = undefined;
