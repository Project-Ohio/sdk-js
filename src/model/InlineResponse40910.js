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
 * The InlineResponse40910 model module.
 * @module model/InlineResponse40910
 * @version 0.1.0
 */
export class InlineResponse40910 {
  /**
   * Constructs a new <code>InlineResponse40910</code>.
   * @alias module:model/InlineResponse40910
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>InlineResponse40910</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse40910} obj Optional instance to populate.
   * @return {module:model/InlineResponse40910} The populated <code>InlineResponse40910</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse40910();
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
InlineResponse40910.prototype.err = undefined;

/**
 * @member {Number} errCode
 */
InlineResponse40910.prototype.errCode = undefined;

