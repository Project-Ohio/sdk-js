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
import {InlineResponse2001AuthTokens} from './InlineResponse2001AuthTokens';
import {MemberRole} from './MemberRole';

/**
 * The InlineResponse2001 model module.
 * @module model/InlineResponse2001
 * @version 0.1.0
 */
export class InlineResponse2001 {
  /**
   * Constructs a new <code>InlineResponse2001</code>.
   * @alias module:model/InlineResponse2001
   * @class
   */
  constructor() {
  }

  /**
   * Constructs a <code>InlineResponse2001</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse2001} obj Optional instance to populate.
   * @return {module:model/InlineResponse2001} The populated <code>InlineResponse2001</code> instance.
   */
  static constructFromObject(data, obj) {
    if (data) {
      obj = obj || new InlineResponse2001();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'String');
      if (data.hasOwnProperty('email'))
        obj.email = ApiClient.convertToType(data['email'], 'String');
      if (data.hasOwnProperty('role'))
        obj.role = MemberRole.constructFromObject(data['role']);
      if (data.hasOwnProperty('authTokens'))
        obj.authTokens = InlineResponse2001AuthTokens.constructFromObject(data['authTokens']);
      if (data.hasOwnProperty('sessionExpiresAt'))
        obj.sessionExpiresAt = ApiClient.convertToType(data['sessionExpiresAt'], 'Date');
    }
    return obj;
  }
}

/**
 * @member {String} id
 */
InlineResponse2001.prototype.id = undefined;

/**
 * @member {String} email
 */
InlineResponse2001.prototype.email = undefined;

/**
 * @member {module:model/MemberRole} role
 */
InlineResponse2001.prototype.role = undefined;

/**
 * @member {module:model/InlineResponse2001AuthTokens} authTokens
 */
InlineResponse2001.prototype.authTokens = undefined;

/**
 * @member {Date} sessionExpiresAt
 */
InlineResponse2001.prototype.sessionExpiresAt = undefined;

