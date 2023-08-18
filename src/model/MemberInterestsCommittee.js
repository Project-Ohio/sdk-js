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
 * Enum class MemberInterestsCommittee.
 * @enum {String}
 * @readonly
 */
const MemberInterestsCommittee = {
  /**
   * value: "GEN_ED"
   * @const
   */
  GEN_ED: "GEN_ED",

  /**
   * value: "NEW_MEM"
   * @const
   */
  NEW_MEM: "NEW_MEM",

  /**
   * value: "ORIENTATION"
   * @const
   */
  ORIENTATION: "ORIENTATION",

  /**
   * value: "EVENTS"
   * @const
   */
  EVENTS: "EVENTS",

  /**
   * value: "RECORDS"
   * @const
   */
  RECORDS: "RECORDS",

  /**
   * value: "TREASURY"
   * @const
   */
  TREASURY: "TREASURY",

  /**
   * value: "OVERSIGHT"
   * @const
   */
  OVERSIGHT: "OVERSIGHT",

  /**
   * value: "OMBUDSMAN"
   * @const
   */
  OMBUDSMAN: "OMBUDSMAN",

  /**
   * value: "VETTING"
   * @const
   */
  VETTING: "VETTING",

  /**
   * value: "GEN_ELECTIONS"
   * @const
   */
  GEN_ELECTIONS: "GEN_ELECTIONS",

  /**
   * value: "MARSHAL_AT_ARMS"
   * @const
   */
  MARSHAL_AT_ARMS: "MARSHAL_AT_ARMS",

  /**
   * value: "INFRA"
   * @const
   */
  INFRA: "INFRA",

  /**
   * value: "VENUE"
   * @const
   */
  VENUE: "VENUE",

  /**
   * value: "LAW_ED"
   * @const
   */
  LAW_ED: "LAW_ED",

  /**
   * value: "JURY_POOL"
   * @const
   */
  JURY_POOL: "JURY_POOL",

  /**
   * value: "OVERSIGHT"
   * @const
   */
  OVERSIGHT: "OVERSIGHT",

  /**
   * value: "SHERIFF"
   * @const
   */
  SHERIFF: "SHERIFF",

  /**
   * value: "CORONER"
   * @const
   */
  CORONER: "CORONER",

  /**
   * value: "LITIGATION"
   * @const
   */
  LITIGATION: "LITIGATION",

  /**
   * value: "LAND_PATENT"
   * @const
   */
  LAND_PATENT: "LAND_PATENT",

  /**
   * value: "INTL_ED"
   * @const
   */
  INTL_ED: "INTL_ED",

  /**
   * value: "PROVISIONS"
   * @const
   */
  PROVISIONS: "PROVISIONS",

  /**
   * value: "MILITIA_ED"
   * @const
   */
  MILITIA_ED: "MILITIA_ED",

  /**
   * value: "MILITIA_OPS"
   * @const
   */
  MILITIA_OPS: "MILITIA_OPS",

  /**
   * Returns a <code>MemberInterestsCommittee</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberInterestsCommittee} The enum <code>MemberInterestsCommittee</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {MemberInterestsCommittee};