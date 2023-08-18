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
 * Enum class MemberRole.
 * @enum {String}
 * @readonly
 */
const MemberRole = {
  /**
   * value: "MEMBER"
   * @const
   */
  MEMBER: "MEMBER",

  /**
   * value: "RECORDING_SECRETARY"
   * @const
   */
  RECORDING_SECRETARY: "RECORDING_SECRETARY",

  /**
   * value: "COORDINATOR"
   * @const
   */
  COORDINATOR: "COORDINATOR",

  /**
   * Returns a <code>MemberRole</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberRole} The enum <code>MemberRole</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {MemberRole};