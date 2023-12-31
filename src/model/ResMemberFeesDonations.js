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

/**
 * The ResMemberFeesDonations model module.
 * @module model/ResMemberFeesDonations
 * @version 0.1.0
 */
class ResMemberFeesDonations {
    /**
     * Constructs a new <code>ResMemberFeesDonations</code>.
     * @alias module:model/ResMemberFeesDonations
     */
    constructor() { 
        
        ResMemberFeesDonations.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ResMemberFeesDonations</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ResMemberFeesDonations} obj Optional instance to populate.
     * @return {module:model/ResMemberFeesDonations} The populated <code>ResMemberFeesDonations</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ResMemberFeesDonations();

            if (data.hasOwnProperty('credentialCardFee')) {
                obj['credentialCardFee'] = ApiClient.convertToType(data['credentialCardFee'], 'String');
            }
            if (data.hasOwnProperty('trainingCourseFee')) {
                obj['trainingCourseFee'] = ApiClient.convertToType(data['trainingCourseFee'], 'String');
            }
            if (data.hasOwnProperty('donationStateAssembly')) {
                obj['donationStateAssembly'] = ApiClient.convertToType(data['donationStateAssembly'], 'String');
            }
            if (data.hasOwnProperty('donationCountyAssembly')) {
                obj['donationCountyAssembly'] = ApiClient.convertToType(data['donationCountyAssembly'], 'String');
            }
            if (data.hasOwnProperty('donationStateChiefMarshal')) {
                obj['donationStateChiefMarshal'] = ApiClient.convertToType(data['donationStateChiefMarshal'], 'String');
            }
            if (data.hasOwnProperty('donationDesignatedRecipient')) {
                obj['donationDesignatedRecipient'] = ApiClient.convertToType(data['donationDesignatedRecipient'], 'String');
            }
            if (data.hasOwnProperty('donationDesignatedAmount')) {
                obj['donationDesignatedAmount'] = ApiClient.convertToType(data['donationDesignatedAmount'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ResMemberFeesDonations</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ResMemberFeesDonations</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['credentialCardFee'] && !(typeof data['credentialCardFee'] === 'string' || data['credentialCardFee'] instanceof String)) {
            throw new Error("Expected the field `credentialCardFee` to be a primitive type in the JSON string but got " + data['credentialCardFee']);
        }
        // ensure the json data is a string
        if (data['trainingCourseFee'] && !(typeof data['trainingCourseFee'] === 'string' || data['trainingCourseFee'] instanceof String)) {
            throw new Error("Expected the field `trainingCourseFee` to be a primitive type in the JSON string but got " + data['trainingCourseFee']);
        }
        // ensure the json data is a string
        if (data['donationStateAssembly'] && !(typeof data['donationStateAssembly'] === 'string' || data['donationStateAssembly'] instanceof String)) {
            throw new Error("Expected the field `donationStateAssembly` to be a primitive type in the JSON string but got " + data['donationStateAssembly']);
        }
        // ensure the json data is a string
        if (data['donationCountyAssembly'] && !(typeof data['donationCountyAssembly'] === 'string' || data['donationCountyAssembly'] instanceof String)) {
            throw new Error("Expected the field `donationCountyAssembly` to be a primitive type in the JSON string but got " + data['donationCountyAssembly']);
        }
        // ensure the json data is a string
        if (data['donationStateChiefMarshal'] && !(typeof data['donationStateChiefMarshal'] === 'string' || data['donationStateChiefMarshal'] instanceof String)) {
            throw new Error("Expected the field `donationStateChiefMarshal` to be a primitive type in the JSON string but got " + data['donationStateChiefMarshal']);
        }
        // ensure the json data is a string
        if (data['donationDesignatedRecipient'] && !(typeof data['donationDesignatedRecipient'] === 'string' || data['donationDesignatedRecipient'] instanceof String)) {
            throw new Error("Expected the field `donationDesignatedRecipient` to be a primitive type in the JSON string but got " + data['donationDesignatedRecipient']);
        }
        // ensure the json data is a string
        if (data['donationDesignatedAmount'] && !(typeof data['donationDesignatedAmount'] === 'string' || data['donationDesignatedAmount'] instanceof String)) {
            throw new Error("Expected the field `donationDesignatedAmount` to be a primitive type in the JSON string but got " + data['donationDesignatedAmount']);
        }

        return true;
    }


}



/**
 * @member {String} credentialCardFee
 */
ResMemberFeesDonations.prototype['credentialCardFee'] = undefined;

/**
 * @member {String} trainingCourseFee
 */
ResMemberFeesDonations.prototype['trainingCourseFee'] = undefined;

/**
 * @member {String} donationStateAssembly
 */
ResMemberFeesDonations.prototype['donationStateAssembly'] = undefined;

/**
 * @member {String} donationCountyAssembly
 */
ResMemberFeesDonations.prototype['donationCountyAssembly'] = undefined;

/**
 * @member {String} donationStateChiefMarshal
 */
ResMemberFeesDonations.prototype['donationStateChiefMarshal'] = undefined;

/**
 * @member {String} donationDesignatedRecipient
 */
ResMemberFeesDonations.prototype['donationDesignatedRecipient'] = undefined;

/**
 * @member {String} donationDesignatedAmount
 */
ResMemberFeesDonations.prototype['donationDesignatedAmount'] = undefined;






export default ResMemberFeesDonations;

