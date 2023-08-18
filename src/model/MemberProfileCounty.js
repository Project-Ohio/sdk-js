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
 * Enum class MemberProfileCounty.
 * @enum {String}
 * @readonly
 */
const MemberProfileCounty = {
  /**
   * value: "ADAMS"
   * @const
   */
  ADAMS: "ADAMS",

  /**
   * value: "ALLEN"
   * @const
   */
  ALLEN: "ALLEN",

  /**
   * value: "ASHLAND"
   * @const
   */
  ASHLAND: "ASHLAND",

  /**
   * value: "ASHTABULA"
   * @const
   */
  ASHTABULA: "ASHTABULA",

  /**
   * value: "ATHENS"
   * @const
   */
  ATHENS: "ATHENS",

  /**
   * value: "AUGLAIZE"
   * @const
   */
  AUGLAIZE: "AUGLAIZE",

  /**
   * value: "BELMONT"
   * @const
   */
  BELMONT: "BELMONT",

  /**
   * value: "BROWN"
   * @const
   */
  BROWN: "BROWN",

  /**
   * value: "BUTLER"
   * @const
   */
  BUTLER: "BUTLER",

  /**
   * value: "CARROLL"
   * @const
   */
  CARROLL: "CARROLL",

  /**
   * value: "CHAMPAIGN"
   * @const
   */
  CHAMPAIGN: "CHAMPAIGN",

  /**
   * value: "CLARK"
   * @const
   */
  CLARK: "CLARK",

  /**
   * value: "CLERMONT"
   * @const
   */
  CLERMONT: "CLERMONT",

  /**
   * value: "CLINTON"
   * @const
   */
  CLINTON: "CLINTON",

  /**
   * value: "COLUMBIANA"
   * @const
   */
  COLUMBIANA: "COLUMBIANA",

  /**
   * value: "COSHOCTON"
   * @const
   */
  COSHOCTON: "COSHOCTON",

  /**
   * value: "CRAWFORD"
   * @const
   */
  CRAWFORD: "CRAWFORD",

  /**
   * value: "CUYAHOGA"
   * @const
   */
  CUYAHOGA: "CUYAHOGA",

  /**
   * value: "DARKE"
   * @const
   */
  DARKE: "DARKE",

  /**
   * value: "DEFIANCE"
   * @const
   */
  DEFIANCE: "DEFIANCE",

  /**
   * value: "DELAWARE"
   * @const
   */
  DELAWARE: "DELAWARE",

  /**
   * value: "ERIE"
   * @const
   */
  ERIE: "ERIE",

  /**
   * value: "FAIRFIELD"
   * @const
   */
  FAIRFIELD: "FAIRFIELD",

  /**
   * value: "FAYETTE"
   * @const
   */
  FAYETTE: "FAYETTE",

  /**
   * value: "FRANKLIN"
   * @const
   */
  FRANKLIN: "FRANKLIN",

  /**
   * value: "FULTON"
   * @const
   */
  FULTON: "FULTON",

  /**
   * value: "GALLIA"
   * @const
   */
  GALLIA: "GALLIA",

  /**
   * value: "GEAUGA"
   * @const
   */
  GEAUGA: "GEAUGA",

  /**
   * value: "GREENE"
   * @const
   */
  GREENE: "GREENE",

  /**
   * value: "GUERNSEY"
   * @const
   */
  GUERNSEY: "GUERNSEY",

  /**
   * value: "HAMILTON"
   * @const
   */
  HAMILTON: "HAMILTON",

  /**
   * value: "HANCOCK"
   * @const
   */
  HANCOCK: "HANCOCK",

  /**
   * value: "HARDIN"
   * @const
   */
  HARDIN: "HARDIN",

  /**
   * value: "HARRISON"
   * @const
   */
  HARRISON: "HARRISON",

  /**
   * value: "HENRY"
   * @const
   */
  HENRY: "HENRY",

  /**
   * value: "HIGHLAND"
   * @const
   */
  HIGHLAND: "HIGHLAND",

  /**
   * value: "HOCKING"
   * @const
   */
  HOCKING: "HOCKING",

  /**
   * value: "HOLMES"
   * @const
   */
  HOLMES: "HOLMES",

  /**
   * value: "HURON"
   * @const
   */
  HURON: "HURON",

  /**
   * value: "JACKSON"
   * @const
   */
  JACKSON: "JACKSON",

  /**
   * value: "JEFFERSON"
   * @const
   */
  JEFFERSON: "JEFFERSON",

  /**
   * value: "KNOX"
   * @const
   */
  KNOX: "KNOX",

  /**
   * value: "LAKE"
   * @const
   */
  LAKE: "LAKE",

  /**
   * value: "LAWRENCE"
   * @const
   */
  LAWRENCE: "LAWRENCE",

  /**
   * value: "LICKING"
   * @const
   */
  LICKING: "LICKING",

  /**
   * value: "LOGAN"
   * @const
   */
  LOGAN: "LOGAN",

  /**
   * value: "LORAIN"
   * @const
   */
  LORAIN: "LORAIN",

  /**
   * value: "LUCAS"
   * @const
   */
  LUCAS: "LUCAS",

  /**
   * value: "MADISON"
   * @const
   */
  MADISON: "MADISON",

  /**
   * value: "MAHONING"
   * @const
   */
  MAHONING: "MAHONING",

  /**
   * value: "MARION"
   * @const
   */
  MARION: "MARION",

  /**
   * value: "MEDINA"
   * @const
   */
  MEDINA: "MEDINA",

  /**
   * value: "MEIGS"
   * @const
   */
  MEIGS: "MEIGS",

  /**
   * value: "MERCER"
   * @const
   */
  MERCER: "MERCER",

  /**
   * value: "MIAMI"
   * @const
   */
  MIAMI: "MIAMI",

  /**
   * value: "MONROE"
   * @const
   */
  MONROE: "MONROE",

  /**
   * value: "MONTGOMERY"
   * @const
   */
  MONTGOMERY: "MONTGOMERY",

  /**
   * value: "MORGAN"
   * @const
   */
  MORGAN: "MORGAN",

  /**
   * value: "MORROW"
   * @const
   */
  MORROW: "MORROW",

  /**
   * value: "MUSKINGUM"
   * @const
   */
  MUSKINGUM: "MUSKINGUM",

  /**
   * value: "NOBLE"
   * @const
   */
  NOBLE: "NOBLE",

  /**
   * value: "OTTAWA"
   * @const
   */
  OTTAWA: "OTTAWA",

  /**
   * value: "PAULDING"
   * @const
   */
  PAULDING: "PAULDING",

  /**
   * value: "PERRY"
   * @const
   */
  PERRY: "PERRY",

  /**
   * value: "PICKAWAY"
   * @const
   */
  PICKAWAY: "PICKAWAY",

  /**
   * value: "PIKE"
   * @const
   */
  PIKE: "PIKE",

  /**
   * value: "PORTAGE"
   * @const
   */
  PORTAGE: "PORTAGE",

  /**
   * value: "PREBLE"
   * @const
   */
  PREBLE: "PREBLE",

  /**
   * value: "PUTNAM"
   * @const
   */
  PUTNAM: "PUTNAM",

  /**
   * value: "RICHLAND"
   * @const
   */
  RICHLAND: "RICHLAND",

  /**
   * value: "ROSS"
   * @const
   */
  ROSS: "ROSS",

  /**
   * value: "SANDUSKY"
   * @const
   */
  SANDUSKY: "SANDUSKY",

  /**
   * value: "SCIOTO"
   * @const
   */
  SCIOTO: "SCIOTO",

  /**
   * value: "SENECA"
   * @const
   */
  SENECA: "SENECA",

  /**
   * value: "SHELBY"
   * @const
   */
  SHELBY: "SHELBY",

  /**
   * value: "STARK"
   * @const
   */
  STARK: "STARK",

  /**
   * value: "SUMMIT"
   * @const
   */
  SUMMIT: "SUMMIT",

  /**
   * value: "TRUMBULL"
   * @const
   */
  TRUMBULL: "TRUMBULL",

  /**
   * value: "TUSCARAWAS"
   * @const
   */
  TUSCARAWAS: "TUSCARAWAS",

  /**
   * value: "UNION"
   * @const
   */
  UNION: "UNION",

  /**
   * value: "VAN WERT"
   * @const
   */
  VAN_WERT: "VAN WERT",

  /**
   * value: "VINTON"
   * @const
   */
  VINTON: "VINTON",

  /**
   * value: "WARREN"
   * @const
   */
  WARREN: "WARREN",

  /**
   * value: "WASHINGTON"
   * @const
   */
  WASHINGTON: "WASHINGTON",

  /**
   * value: "WAYNE"
   * @const
   */
  WAYNE: "WAYNE",

  /**
   * value: "WILLIAMS"
   * @const
   */
  WILLIAMS: "WILLIAMS",

  /**
   * value: "WOOD"
   * @const
   */
  WOOD: "WOOD",

  /**
   * value: "WYANDOT"
   * @const
   */
  WYANDOT: "WYANDOT",

  /**
   * Returns a <code>MemberProfileCounty</code> enum value from a JavaScript object name.
   * @param {Object} data The plain JavaScript object containing the name of the enum value.
  * @return {module:model/MemberProfileCounty} The enum <code>MemberProfileCounty</code> value.
   */
  constructFromObject: function(object) {
    return object;
  }
};

export {MemberProfileCounty};