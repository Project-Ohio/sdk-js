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
 * Enum class MemberInterestsIndividual.
 * @enum {String}
 * @readonly
 */
const MemberInterestsIndividual = {
  /**
   * value: "ACCOUNTING"
   * @const
   */
  ACCOUNTING: "ACCOUNTING",

  /**
   * value: "ARMORY"
   * @const
   */
  ARMORY: "ARMORY",

  /**
   * value: "BOOKKEEPING"
   * @const
   */
  BOOKKEEPING: "BOOKKEEPING",

  /**
   * value: "CARPENTRY"
   * @const
   */
  CARPENTRY: "CARPENTRY",

  /**
   * value: "CHILDCARE"
   * @const
   */
  CHILDCARE: "CHILDCARE",

  /**
   * value: "COMP_PROGRAMMING"
   * @const
   */
  COMP_PROGRAMMING: "COMP_PROGRAMMING",

  /**
   * value: "CONSTRUCTION"
   * @const
   */
  CONSTRUCTION: "CONSTRUCTION",

  /**
   * value: "COOKING"
   * @const
   */
  COOKING: "COOKING",

  /**
   * value: "DENTISTRY"
   * @const
   */
  DENTISTRY: "DENTISTRY",

  /**
   * value: "EDUCATION"
   * @const
   */
  EDUCATION: "EDUCATION",

  /**
   * value: "ELECTRICIAN"
   * @const
   */
  ELECTRICIAN: "ELECTRICIAN",

  /**
   * value: "ELECTRONICS_REPAIR"
   * @const
   */
  ELECTRONICS_REPAIR: "ELECTRONICS_REPAIR",

  /**
   * value: "FARMING"
   * @const
   */
  FARMING: "FARMING",

  /**
   * value: "IT"
   * @const
   */
  IT: "IT",

  /**
   * value: "JANITORIAL"
   * @const
   */
  JANITORIAL: "JANITORIAL",

  /**
   * value: "MARKETING"
   * @const
   */
  MARKETING: "MARKETING",

  /**
   * value: "MEDICAL"
   * @const
   */
  MEDICAL: "MEDICAL",

  /**
   * value: "NUTRITION"
   * @const
   */
  NUTRITION: "NUTRITION",

  /**
   * value: "ORGANIZING"
   * @const
   */
  ORGANIZING: "ORGANIZING",

  /**
   * value: "PLUMBING"
   * @const
   */
  PLUMBING: "PLUMBING",

  /**
   * value: "PR"
   * @const
   */
  PR: "PR",

  /**
   * value: "RADIO_COMM"
   * @const
   */
  RADIO_COMM: "RADIO_COMM",

  /**
   * value: "RANCHING"
   * @const
   */
  RANCHING: "RANCHING",

  /**
   * value: "RECORDKEEPING"
   * @const
   */
  RECORDKEEPING: "RECORDKEEPING",

  /**
   * value: "RESEARCH"
   * @const
   */
  RESEARCH: "RESEARCH",

  /**
   * value: "SEWING"
   * @const
   */
  SEWING: "SEWING",

  /**
   * value: "TEACHING"
   * @const
   */
  TEACHING: "TEACHING",

  /**
   * value: "TRANSPORTATION"
   * @const
   */
  TRANSPORTATION: "TRANSPORTATION",

  /**
   * value: "WOODWORKING"
   * @const
   */
  WOODWORKING: "WOODWORKING",

  /**
   * Returns a <code>MemberInterestsIndividual</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberInterestsIndividual} The enum <code>MemberInterestsIndividual</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {MemberInterestsIndividual};