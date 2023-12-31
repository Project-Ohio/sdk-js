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
import MemberGender from './MemberGender';
import MemberProfileCounty from './MemberProfileCounty';

/**
 * The MembershipSignupRequest model module.
 * @module model/MembershipSignupRequest
 * @version 0.1.0
 */
class MembershipSignupRequest {
    /**
     * Constructs a new <code>MembershipSignupRequest</code>.
     * @alias module:model/MembershipSignupRequest
     * @param captchaResToken {String} 
     * @param email {String} 
     * @param password {String} 
     * @param passwordConf {String} 
     * @param recordingSecretaryEmail {String} 
     * @param coordinatorEmail {String} 
     * @param firstName {String} 
     * @param lastName {String} 
     * @param gender {module:model/MemberGender} 
     * @param dob {Date} 
     * @param addrLine1 {String} 
     * @param addrCity {String} 
     * @param addrState {String} 
     * @param addrZip {String} 
     * @param addrCounty {module:model/MemberProfileCounty} 
     * @param phone {String} 
     */
    constructor(captchaResToken, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone) { 
        
        MembershipSignupRequest.initialize(this, captchaResToken, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, captchaResToken, email, password, passwordConf, recordingSecretaryEmail, coordinatorEmail, firstName, lastName, gender, dob, addrLine1, addrCity, addrState, addrZip, addrCounty, phone) { 
        obj['captchaResToken'] = captchaResToken;
        obj['email'] = email;
        obj['password'] = password;
        obj['passwordConf'] = passwordConf;
        obj['recordingSecretaryEmail'] = recordingSecretaryEmail;
        obj['coordinatorEmail'] = coordinatorEmail;
        obj['firstName'] = firstName;
        obj['lastName'] = lastName;
        obj['gender'] = gender;
        obj['dob'] = dob;
        obj['addrLine1'] = addrLine1;
        obj['addrCity'] = addrCity;
        obj['addrState'] = addrState;
        obj['addrZip'] = addrZip;
        obj['addrCounty'] = addrCounty;
        obj['phone'] = phone;
    }

    /**
     * Constructs a <code>MembershipSignupRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MembershipSignupRequest} obj Optional instance to populate.
     * @return {module:model/MembershipSignupRequest} The populated <code>MembershipSignupRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MembershipSignupRequest();

            if (data.hasOwnProperty('captchaResToken')) {
                obj['captchaResToken'] = ApiClient.convertToType(data['captchaResToken'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('passwordConf')) {
                obj['passwordConf'] = ApiClient.convertToType(data['passwordConf'], 'String');
            }
            if (data.hasOwnProperty('recordingSecretaryEmail')) {
                obj['recordingSecretaryEmail'] = ApiClient.convertToType(data['recordingSecretaryEmail'], 'String');
            }
            if (data.hasOwnProperty('coordinatorEmail')) {
                obj['coordinatorEmail'] = ApiClient.convertToType(data['coordinatorEmail'], 'String');
            }
            if (data.hasOwnProperty('firstName')) {
                obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String');
            }
            if (data.hasOwnProperty('middleName')) {
                obj['middleName'] = ApiClient.convertToType(data['middleName'], 'String');
            }
            if (data.hasOwnProperty('lastName')) {
                obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String');
            }
            if (data.hasOwnProperty('gender')) {
                obj['gender'] = MemberGender.constructFromObject(data['gender']);
            }
            if (data.hasOwnProperty('dob')) {
                obj['dob'] = ApiClient.convertToType(data['dob'], 'Date');
            }
            if (data.hasOwnProperty('addrLine1')) {
                obj['addrLine1'] = ApiClient.convertToType(data['addrLine1'], 'String');
            }
            if (data.hasOwnProperty('addrLine2')) {
                obj['addrLine2'] = ApiClient.convertToType(data['addrLine2'], 'String');
            }
            if (data.hasOwnProperty('addrCity')) {
                obj['addrCity'] = ApiClient.convertToType(data['addrCity'], 'String');
            }
            if (data.hasOwnProperty('addrState')) {
                obj['addrState'] = ApiClient.convertToType(data['addrState'], 'String');
            }
            if (data.hasOwnProperty('addrZip')) {
                obj['addrZip'] = ApiClient.convertToType(data['addrZip'], 'String');
            }
            if (data.hasOwnProperty('addrCounty')) {
                obj['addrCounty'] = MemberProfileCounty.constructFromObject(data['addrCounty']);
            }
            if (data.hasOwnProperty('phone')) {
                obj['phone'] = ApiClient.convertToType(data['phone'], 'String');
            }
            if (data.hasOwnProperty('emailAlt')) {
                obj['emailAlt'] = ApiClient.convertToType(data['emailAlt'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MembershipSignupRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MembershipSignupRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of MembershipSignupRequest.RequiredProperties) {
            if (!data[property]) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['captchaResToken'] && !(typeof data['captchaResToken'] === 'string' || data['captchaResToken'] instanceof String)) {
            throw new Error("Expected the field `captchaResToken` to be a primitive type in the JSON string but got " + data['captchaResToken']);
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        // ensure the json data is a string
        if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
            throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
        }
        // ensure the json data is a string
        if (data['passwordConf'] && !(typeof data['passwordConf'] === 'string' || data['passwordConf'] instanceof String)) {
            throw new Error("Expected the field `passwordConf` to be a primitive type in the JSON string but got " + data['passwordConf']);
        }
        // ensure the json data is a string
        if (data['recordingSecretaryEmail'] && !(typeof data['recordingSecretaryEmail'] === 'string' || data['recordingSecretaryEmail'] instanceof String)) {
            throw new Error("Expected the field `recordingSecretaryEmail` to be a primitive type in the JSON string but got " + data['recordingSecretaryEmail']);
        }
        // ensure the json data is a string
        if (data['coordinatorEmail'] && !(typeof data['coordinatorEmail'] === 'string' || data['coordinatorEmail'] instanceof String)) {
            throw new Error("Expected the field `coordinatorEmail` to be a primitive type in the JSON string but got " + data['coordinatorEmail']);
        }
        // ensure the json data is a string
        if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
            throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
        }
        // ensure the json data is a string
        if (data['middleName'] && !(typeof data['middleName'] === 'string' || data['middleName'] instanceof String)) {
            throw new Error("Expected the field `middleName` to be a primitive type in the JSON string but got " + data['middleName']);
        }
        // ensure the json data is a string
        if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
            throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
        }
        // ensure the json data is a string
        if (data['addrLine1'] && !(typeof data['addrLine1'] === 'string' || data['addrLine1'] instanceof String)) {
            throw new Error("Expected the field `addrLine1` to be a primitive type in the JSON string but got " + data['addrLine1']);
        }
        // ensure the json data is a string
        if (data['addrLine2'] && !(typeof data['addrLine2'] === 'string' || data['addrLine2'] instanceof String)) {
            throw new Error("Expected the field `addrLine2` to be a primitive type in the JSON string but got " + data['addrLine2']);
        }
        // ensure the json data is a string
        if (data['addrCity'] && !(typeof data['addrCity'] === 'string' || data['addrCity'] instanceof String)) {
            throw new Error("Expected the field `addrCity` to be a primitive type in the JSON string but got " + data['addrCity']);
        }
        // ensure the json data is a string
        if (data['addrState'] && !(typeof data['addrState'] === 'string' || data['addrState'] instanceof String)) {
            throw new Error("Expected the field `addrState` to be a primitive type in the JSON string but got " + data['addrState']);
        }
        // ensure the json data is a string
        if (data['addrZip'] && !(typeof data['addrZip'] === 'string' || data['addrZip'] instanceof String)) {
            throw new Error("Expected the field `addrZip` to be a primitive type in the JSON string but got " + data['addrZip']);
        }
        // ensure the json data is a string
        if (data['phone'] && !(typeof data['phone'] === 'string' || data['phone'] instanceof String)) {
            throw new Error("Expected the field `phone` to be a primitive type in the JSON string but got " + data['phone']);
        }
        // ensure the json data is a string
        if (data['emailAlt'] && !(typeof data['emailAlt'] === 'string' || data['emailAlt'] instanceof String)) {
            throw new Error("Expected the field `emailAlt` to be a primitive type in the JSON string but got " + data['emailAlt']);
        }

        return true;
    }


}

MembershipSignupRequest.RequiredProperties = ["captchaResToken", "email", "password", "passwordConf", "recordingSecretaryEmail", "coordinatorEmail", "firstName", "lastName", "gender", "dob", "addrLine1", "addrCity", "addrState", "addrZip", "addrCounty", "phone"];

/**
 * @member {String} captchaResToken
 */
MembershipSignupRequest.prototype['captchaResToken'] = undefined;

/**
 * @member {String} email
 */
MembershipSignupRequest.prototype['email'] = undefined;

/**
 * @member {String} password
 */
MembershipSignupRequest.prototype['password'] = undefined;

/**
 * @member {String} passwordConf
 */
MembershipSignupRequest.prototype['passwordConf'] = undefined;

/**
 * @member {String} recordingSecretaryEmail
 */
MembershipSignupRequest.prototype['recordingSecretaryEmail'] = undefined;

/**
 * @member {String} coordinatorEmail
 */
MembershipSignupRequest.prototype['coordinatorEmail'] = undefined;

/**
 * @member {String} firstName
 */
MembershipSignupRequest.prototype['firstName'] = undefined;

/**
 * @member {String} middleName
 */
MembershipSignupRequest.prototype['middleName'] = undefined;

/**
 * @member {String} lastName
 */
MembershipSignupRequest.prototype['lastName'] = undefined;

/**
 * @member {module:model/MemberGender} gender
 */
MembershipSignupRequest.prototype['gender'] = undefined;

/**
 * @member {Date} dob
 */
MembershipSignupRequest.prototype['dob'] = undefined;

/**
 * @member {String} addrLine1
 */
MembershipSignupRequest.prototype['addrLine1'] = undefined;

/**
 * @member {String} addrLine2
 */
MembershipSignupRequest.prototype['addrLine2'] = undefined;

/**
 * @member {String} addrCity
 */
MembershipSignupRequest.prototype['addrCity'] = undefined;

/**
 * @member {String} addrState
 */
MembershipSignupRequest.prototype['addrState'] = undefined;

/**
 * @member {String} addrZip
 */
MembershipSignupRequest.prototype['addrZip'] = undefined;

/**
 * @member {module:model/MemberProfileCounty} addrCounty
 */
MembershipSignupRequest.prototype['addrCounty'] = undefined;

/**
 * @member {String} phone
 */
MembershipSignupRequest.prototype['phone'] = undefined;

/**
 * @member {String} emailAlt
 */
MembershipSignupRequest.prototype['emailAlt'] = undefined;






export default MembershipSignupRequest;

