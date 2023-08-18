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
import ResMemberProfile from './ResMemberProfile';
import ResMembershipDocs from './ResMembershipDocs';

/**
 * The ResPublicCredentialCard model module.
 * @module model/ResPublicCredentialCard
 * @version 0.1.0
 */
class ResPublicCredentialCard {
    /**
     * Constructs a new <code>ResPublicCredentialCard</code>.
     * @alias module:model/ResPublicCredentialCard
     */
    constructor() { 
        
        ResPublicCredentialCard.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResPublicCredentialCard</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResPublicCredentialCard} obj Optional instance to populate.
     * @return {module:model/ResPublicCredentialCard} The populated <code>ResPublicCredentialCard</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResPublicCredentialCard();

            if (data.hasOwnProperty('masterRecordNumber')) {
                obj['masterRecordNumber'] = ApiClient.convertToType(data['masterRecordNumber'], 'String');
            }
            if (data.hasOwnProperty('expirationDate')) {
                obj['expirationDate'] = ApiClient.convertToType(data['expirationDate'], 'Date');
            }
            if (data.hasOwnProperty('updatedAt')) {
                obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
            }
            if (data.hasOwnProperty('memberProfile')) {
                obj['memberProfile'] = ResMemberProfile.constructFromObject(data['memberProfile']);
            }
            if (data.hasOwnProperty('memberDocs')) {
                obj['memberDocs'] = ResMembershipDocs.constructFromObject(data['memberDocs']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResPublicCredentialCard</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResPublicCredentialCard</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['masterRecordNumber'] && !(typeof data['masterRecordNumber'] === 'string' || data['masterRecordNumber'] instanceof String)) {
            throw new Error("Expected the field `masterRecordNumber` to be a primitive type in the JSON string but got " + data['masterRecordNumber']);
        }
        // validate the optional field `memberProfile`
        if (data['memberProfile']) { // data not null
          ResMemberProfile.validateJSON(data['memberProfile']);
        }
        // validate the optional field `memberDocs`
        if (data['memberDocs']) { // data not null
          ResMembershipDocs.validateJSON(data['memberDocs']);
        }

        return true;
    }


}



/**
 * @member {String} masterRecordNumber
 */
ResPublicCredentialCard.prototype['masterRecordNumber'] = undefined;

/**
 * @member {Date} expirationDate
 */
ResPublicCredentialCard.prototype['expirationDate'] = undefined;

/**
 * @member {Date} updatedAt
 */
ResPublicCredentialCard.prototype['updatedAt'] = undefined;

/**
 * @member {module:model/ResMemberProfile} memberProfile
 */
ResPublicCredentialCard.prototype['memberProfile'] = undefined;

/**
 * @member {module:model/ResMembershipDocs} memberDocs
 */
ResPublicCredentialCard.prototype['memberDocs'] = undefined;






export default ResPublicCredentialCard;

