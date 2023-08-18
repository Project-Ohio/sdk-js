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
 * Enum class ShopItemType.
 * @enum {String}
 * @readonly
 */
const ShopItemType = {
  /**
   * value: "CREDENTIAL_CARD"
   * @const
   */
  CREDENTIAL_CARD: "CREDENTIAL_CARD",

  /**
   * value: "PUBLISHING_FEE"
   * @const
   */
  PUBLISHING_FEE: "PUBLISHING_FEE",

  /**
   * value: "RECORDING_FEE"
   * @const
   */
  RECORDING_FEE: "RECORDING_FEE",

  /**
   * value: "DOCUMENT_GENERATOR"
   * @const
   */
  DOCUMENT_GENERATOR: "DOCUMENT_GENERATOR",

  /**
   * value: "TRAINING_COURSES"
   * @const
   */
  TRAINING_COURSES: "TRAINING_COURSES",

  /**
   * value: "BACKGROUND_CHECK"
   * @const
   */
  BACKGROUND_CHECK: "BACKGROUND_CHECK",

  /**
   * value: "DONATE_STATE_ASSEMBLY"
   * @const
   */
  DONATE_STATE_ASSEMBLY: "DONATE_STATE_ASSEMBLY",

  /**
   * value: "DONATE_COUNTY_ASSEMBLY"
   * @const
   */
  DONATE_COUNTY_ASSEMBLY: "DONATE_COUNTY_ASSEMBLY",

  /**
   * value: "DONATE_CONTINENTAL_MARSHALS"
   * @const
   */
  DONATE_CONTINENTAL_MARSHALS: "DONATE_CONTINENTAL_MARSHALS",

  /**
   * value: "DONATE_ANNA"
   * @const
   */
  DONATE_ANNA: "DONATE_ANNA",

  /**
   * value: "DONATE_OTHER"
   * @const
   */
  DONATE_OTHER: "DONATE_OTHER",

  /**
   * value: "OTHER"
   * @const
   */
  OTHER: "OTHER",

  /**
   * Returns a <code>ShopItemType</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/ShopItemType} The enum <code>ShopItemType</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {ShopItemType};