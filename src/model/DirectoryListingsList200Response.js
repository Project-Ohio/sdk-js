/**
 * MyOhioAssembly.com Public API
 * REST API for MyOhioAssembly.com
 *
 * The version of the OpenAPI document: 0.1.0
 * Contact: contact@myohioassembly.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import DirectoryListing from './DirectoryListing';

/**
 * The DirectoryListingsList200Response model module.
 * @module model/DirectoryListingsList200Response
 * @version 0.1.0
 */
class DirectoryListingsList200Response {
    /**
     * Constructs a new <code>DirectoryListingsList200Response</code>.
     * @alias module:model/DirectoryListingsList200Response
     */
    constructor() { 
        
        DirectoryListingsList200Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DirectoryListingsList200Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DirectoryListingsList200Response} obj Optional instance to populate.
     * @return {module:model/DirectoryListingsList200Response} The populated <code>DirectoryListingsList200Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DirectoryListingsList200Response();

            if (data.hasOwnProperty('listings')) {
                obj['listings'] = ApiClient.convertToType(data['listings'], [DirectoryListing]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DirectoryListingsList200Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DirectoryListingsList200Response</code>.
     */
    static validateJSON(data) {
        if (data['listings']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['listings'])) {
                throw new Error("Expected the field `listings` to be an array in the JSON data but got " + data['listings']);
            }
            // validate the optional field `listings` (array)
            for (const item of data['listings']) {
                DirectoryListing.validateJSON(item);
            };
        }

        return true;
    }


}



/**
 * @member {Array.<module:model/DirectoryListing>} listings
 */
DirectoryListingsList200Response.prototype['listings'] = undefined;






export default DirectoryListingsList200Response;

