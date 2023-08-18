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
 * Enum class MemberStatus.
 * @enum {String}
 * @readonly
 */
const MemberStatus = {
  /**
   * value: "PENDING"
   * @const
   */
  PENDING: "PENDING",

  /**
   * value: "ACTIVE"
   * @const
   */
  ACTIVE: "ACTIVE",

  /**
   * value: "DEACTIVATED"
   * @const
   */
  DEACTIVATED: "DEACTIVATED",

  /**
   * Returns a <code>MemberStatus</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberStatus} The enum <code>MemberStatus</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {MemberStatus};