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
import {ApiClient} from './ApiClient';
import {AuthEmailBody} from './model/AuthEmailBody';
import {AuthLoginBody} from './model/AuthLoginBody';
import {AuthPassBody} from './model/AuthPassBody';
import {AuthRole} from './model/AuthRole';
import {AuthToken} from './model/AuthToken';
import {CredentialCardIdExpirationBody} from './model/CredentialCardIdExpirationBody';
import {DirectoryListing} from './model/DirectoryListing';
import {DocKeyNameBody} from './model/DocKeyNameBody';
import {DocsDocKeyBody} from './model/DocsDocKeyBody';
import {DocsDocKeyBody1} from './model/DocsDocKeyBody1';
import {DocsProfileDocKeyBody} from './model/DocsProfileDocKeyBody';
import {DocsProfileDocKeyBody1} from './model/DocsProfileDocKeyBody1';
import {InlineResponse200} from './model/InlineResponse200';
import {InlineResponse2001} from './model/InlineResponse2001';
import {InlineResponse20010} from './model/InlineResponse20010';
import {InlineResponse20011} from './model/InlineResponse20011';
import {InlineResponse20012} from './model/InlineResponse20012';
import {InlineResponse20013} from './model/InlineResponse20013';
import {InlineResponse20014} from './model/InlineResponse20014';
import {InlineResponse20015} from './model/InlineResponse20015';
import {InlineResponse20016} from './model/InlineResponse20016';
import {InlineResponse20017} from './model/InlineResponse20017';
import {InlineResponse20018} from './model/InlineResponse20018';
import {InlineResponse20019} from './model/InlineResponse20019';
import {InlineResponse2001AuthTokens} from './model/InlineResponse2001AuthTokens';
import {InlineResponse2002} from './model/InlineResponse2002';
import {InlineResponse20020} from './model/InlineResponse20020';
import {InlineResponse20021} from './model/InlineResponse20021';
import {InlineResponse20022} from './model/InlineResponse20022';
import {InlineResponse20023} from './model/InlineResponse20023';
import {InlineResponse20024} from './model/InlineResponse20024';
import {InlineResponse20025} from './model/InlineResponse20025';
import {InlineResponse20026} from './model/InlineResponse20026';
import {InlineResponse2003} from './model/InlineResponse2003';
import {InlineResponse2004} from './model/InlineResponse2004';
import {InlineResponse2005} from './model/InlineResponse2005';
import {InlineResponse2006} from './model/InlineResponse2006';
import {InlineResponse2007} from './model/InlineResponse2007';
import {InlineResponse2008} from './model/InlineResponse2008';
import {InlineResponse2009} from './model/InlineResponse2009';
import {InlineResponse200AuthTokens} from './model/InlineResponse200AuthTokens';
import {InlineResponse201} from './model/InlineResponse201';
import {InlineResponse2011} from './model/InlineResponse2011';
import {InlineResponse2012} from './model/InlineResponse2012';
import {InlineResponse2013} from './model/InlineResponse2013';
import {InlineResponse400} from './model/InlineResponse400';
import {InlineResponse401} from './model/InlineResponse401';
import {InlineResponse403} from './model/InlineResponse403';
import {InlineResponse404} from './model/InlineResponse404';
import {InlineResponse409} from './model/InlineResponse409';
import {InlineResponse4091} from './model/InlineResponse4091';
import {InlineResponse40910} from './model/InlineResponse40910';
import {InlineResponse40911} from './model/InlineResponse40911';
import {InlineResponse40912} from './model/InlineResponse40912';
import {InlineResponse4092} from './model/InlineResponse4092';
import {InlineResponse4093} from './model/InlineResponse4093';
import {InlineResponse4094} from './model/InlineResponse4094';
import {InlineResponse4095} from './model/InlineResponse4095';
import {InlineResponse4096} from './model/InlineResponse4096';
import {InlineResponse4097} from './model/InlineResponse4097';
import {InlineResponse4098} from './model/InlineResponse4098';
import {InlineResponse4099} from './model/InlineResponse4099';
import {ItemsItemIdBody} from './model/ItemsItemIdBody';
import {ItemsItemIdBody1} from './model/ItemsItemIdBody1';
import {MemberGender} from './model/MemberGender';
import {MemberIdCredentialCardsBody} from './model/MemberIdCredentialCardsBody';
import {MemberIdProfileBody} from './model/MemberIdProfileBody';
import {MemberInterestsCommittee} from './model/MemberInterestsCommittee';
import {MemberInterestsIndividual} from './model/MemberInterestsIndividual';
import {MemberNationalityStatus} from './model/MemberNationalityStatus';
import {MemberProfileCounty} from './model/MemberProfileCounty';
import {MemberRole} from './model/MemberRole';
import {MemberStatus} from './model/MemberStatus';
import {MembersBody} from './model/MembersBody';
import {MembersMemberIdBody} from './model/MembersMemberIdBody';
import {MembershipDocKey} from './model/MembershipDocKey';
import {MembershipsSignupBody} from './model/MembershipsSignupBody';
import {OrderIdPaymentsBody} from './model/OrderIdPaymentsBody';
import {OrdersOrderIdBody} from './model/OrdersOrderIdBody';
import {ProfileDocKeyNameBody} from './model/ProfileDocKeyNameBody';
import {PurchaseItemIdFulfillmentStatusBody} from './model/PurchaseItemIdFulfillmentStatusBody';
import {PurchaseItemsPurchaseItemIdBody} from './model/PurchaseItemsPurchaseItemIdBody';
import {ResAccount} from './model/ResAccount';
import {ResCredentialCard} from './model/ResCredentialCard';
import {ResMember} from './model/ResMember';
import {ResMemberBase} from './model/ResMemberBase';
import {ResMemberBaseNationality} from './model/ResMemberBaseNationality';
import {ResMemberDoc} from './model/ResMemberDoc';
import {ResMemberFeesDonations} from './model/ResMemberFeesDonations';
import {ResMemberProfile} from './model/ResMemberProfile';
import {ResMemberProfileDocs} from './model/ResMemberProfileDocs';
import {ResMembershipDocs} from './model/ResMembershipDocs';
import {ResPublicCredentialCard} from './model/ResPublicCredentialCard';
import {ResShopItem} from './model/ResShopItem';
import {ResShopOrder} from './model/ResShopOrder';
import {ResShopOrderItem} from './model/ResShopOrderItem';
import {ResShopOrderPayment} from './model/ResShopOrderPayment';
import {ResShopOrderTotals} from './model/ResShopOrderTotals';
import {ResShopPurchaseItem} from './model/ResShopPurchaseItem';
import {ShopItemType} from './model/ShopItemType';
import {ShopItemsBody} from './model/ShopItemsBody';
import {ShopOrderPaymentMethod} from './model/ShopOrderPaymentMethod';
import {ShopOrderPaymentStatus} from './model/ShopOrderPaymentStatus';
import {ShopOrderStatus} from './model/ShopOrderStatus';
import {ShopPurchaseItemFulfillmentStatus} from './model/ShopPurchaseItemFulfillmentStatus';
import {AccountsApi} from './api/AccountsApi';
import {AdminApi} from './api/AdminApi';
import {AuthApi} from './api/AuthApi';
import {CredentialCardsApi} from './api/CredentialCardsApi';
import {DirectoryApi} from './api/DirectoryApi';
import {DocsApi} from './api/DocsApi';
import {MemberProfilesApi} from './api/MemberProfilesApi';
import {MembersApi} from './api/MembersApi';
import {ShopApi} from './api/ShopApi';

/**
* REST_API_for_MyOhioAssembly_com.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var MyOhioAssemblycomPublicApi = require('index'); // See note below*.
* var xxxSvc = new MyOhioAssemblycomPublicApi.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new MyOhioAssemblycomPublicApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new MyOhioAssemblycomPublicApi.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new MyOhioAssemblycomPublicApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 0.1.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AuthEmailBody model constructor.
     * @property {module:model/AuthEmailBody}
     */
    AuthEmailBody,

    /**
     * The AuthLoginBody model constructor.
     * @property {module:model/AuthLoginBody}
     */
    AuthLoginBody,

    /**
     * The AuthPassBody model constructor.
     * @property {module:model/AuthPassBody}
     */
    AuthPassBody,

    /**
     * The AuthRole model constructor.
     * @property {module:model/AuthRole}
     */
    AuthRole,

    /**
     * The AuthToken model constructor.
     * @property {module:model/AuthToken}
     */
    AuthToken,

    /**
     * The CredentialCardIdExpirationBody model constructor.
     * @property {module:model/CredentialCardIdExpirationBody}
     */
    CredentialCardIdExpirationBody,

    /**
     * The DirectoryListing model constructor.
     * @property {module:model/DirectoryListing}
     */
    DirectoryListing,

    /**
     * The DocKeyNameBody model constructor.
     * @property {module:model/DocKeyNameBody}
     */
    DocKeyNameBody,

    /**
     * The DocsDocKeyBody model constructor.
     * @property {module:model/DocsDocKeyBody}
     */
    DocsDocKeyBody,

    /**
     * The DocsDocKeyBody1 model constructor.
     * @property {module:model/DocsDocKeyBody1}
     */
    DocsDocKeyBody1,

    /**
     * The DocsProfileDocKeyBody model constructor.
     * @property {module:model/DocsProfileDocKeyBody}
     */
    DocsProfileDocKeyBody,

    /**
     * The DocsProfileDocKeyBody1 model constructor.
     * @property {module:model/DocsProfileDocKeyBody1}
     */
    DocsProfileDocKeyBody1,

    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200,

    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001,

    /**
     * The InlineResponse20010 model constructor.
     * @property {module:model/InlineResponse20010}
     */
    InlineResponse20010,

    /**
     * The InlineResponse20011 model constructor.
     * @property {module:model/InlineResponse20011}
     */
    InlineResponse20011,

    /**
     * The InlineResponse20012 model constructor.
     * @property {module:model/InlineResponse20012}
     */
    InlineResponse20012,

    /**
     * The InlineResponse20013 model constructor.
     * @property {module:model/InlineResponse20013}
     */
    InlineResponse20013,

    /**
     * The InlineResponse20014 model constructor.
     * @property {module:model/InlineResponse20014}
     */
    InlineResponse20014,

    /**
     * The InlineResponse20015 model constructor.
     * @property {module:model/InlineResponse20015}
     */
    InlineResponse20015,

    /**
     * The InlineResponse20016 model constructor.
     * @property {module:model/InlineResponse20016}
     */
    InlineResponse20016,

    /**
     * The InlineResponse20017 model constructor.
     * @property {module:model/InlineResponse20017}
     */
    InlineResponse20017,

    /**
     * The InlineResponse20018 model constructor.
     * @property {module:model/InlineResponse20018}
     */
    InlineResponse20018,

    /**
     * The InlineResponse20019 model constructor.
     * @property {module:model/InlineResponse20019}
     */
    InlineResponse20019,

    /**
     * The InlineResponse2001AuthTokens model constructor.
     * @property {module:model/InlineResponse2001AuthTokens}
     */
    InlineResponse2001AuthTokens,

    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002,

    /**
     * The InlineResponse20020 model constructor.
     * @property {module:model/InlineResponse20020}
     */
    InlineResponse20020,

    /**
     * The InlineResponse20021 model constructor.
     * @property {module:model/InlineResponse20021}
     */
    InlineResponse20021,

    /**
     * The InlineResponse20022 model constructor.
     * @property {module:model/InlineResponse20022}
     */
    InlineResponse20022,

    /**
     * The InlineResponse20023 model constructor.
     * @property {module:model/InlineResponse20023}
     */
    InlineResponse20023,

    /**
     * The InlineResponse20024 model constructor.
     * @property {module:model/InlineResponse20024}
     */
    InlineResponse20024,

    /**
     * The InlineResponse20025 model constructor.
     * @property {module:model/InlineResponse20025}
     */
    InlineResponse20025,

    /**
     * The InlineResponse20026 model constructor.
     * @property {module:model/InlineResponse20026}
     */
    InlineResponse20026,

    /**
     * The InlineResponse2003 model constructor.
     * @property {module:model/InlineResponse2003}
     */
    InlineResponse2003,

    /**
     * The InlineResponse2004 model constructor.
     * @property {module:model/InlineResponse2004}
     */
    InlineResponse2004,

    /**
     * The InlineResponse2005 model constructor.
     * @property {module:model/InlineResponse2005}
     */
    InlineResponse2005,

    /**
     * The InlineResponse2006 model constructor.
     * @property {module:model/InlineResponse2006}
     */
    InlineResponse2006,

    /**
     * The InlineResponse2007 model constructor.
     * @property {module:model/InlineResponse2007}
     */
    InlineResponse2007,

    /**
     * The InlineResponse2008 model constructor.
     * @property {module:model/InlineResponse2008}
     */
    InlineResponse2008,

    /**
     * The InlineResponse2009 model constructor.
     * @property {module:model/InlineResponse2009}
     */
    InlineResponse2009,

    /**
     * The InlineResponse200AuthTokens model constructor.
     * @property {module:model/InlineResponse200AuthTokens}
     */
    InlineResponse200AuthTokens,

    /**
     * The InlineResponse201 model constructor.
     * @property {module:model/InlineResponse201}
     */
    InlineResponse201,

    /**
     * The InlineResponse2011 model constructor.
     * @property {module:model/InlineResponse2011}
     */
    InlineResponse2011,

    /**
     * The InlineResponse2012 model constructor.
     * @property {module:model/InlineResponse2012}
     */
    InlineResponse2012,

    /**
     * The InlineResponse2013 model constructor.
     * @property {module:model/InlineResponse2013}
     */
    InlineResponse2013,

    /**
     * The InlineResponse400 model constructor.
     * @property {module:model/InlineResponse400}
     */
    InlineResponse400,

    /**
     * The InlineResponse401 model constructor.
     * @property {module:model/InlineResponse401}
     */
    InlineResponse401,

    /**
     * The InlineResponse403 model constructor.
     * @property {module:model/InlineResponse403}
     */
    InlineResponse403,

    /**
     * The InlineResponse404 model constructor.
     * @property {module:model/InlineResponse404}
     */
    InlineResponse404,

    /**
     * The InlineResponse409 model constructor.
     * @property {module:model/InlineResponse409}
     */
    InlineResponse409,

    /**
     * The InlineResponse4091 model constructor.
     * @property {module:model/InlineResponse4091}
     */
    InlineResponse4091,

    /**
     * The InlineResponse40910 model constructor.
     * @property {module:model/InlineResponse40910}
     */
    InlineResponse40910,

    /**
     * The InlineResponse40911 model constructor.
     * @property {module:model/InlineResponse40911}
     */
    InlineResponse40911,

    /**
     * The InlineResponse40912 model constructor.
     * @property {module:model/InlineResponse40912}
     */
    InlineResponse40912,

    /**
     * The InlineResponse4092 model constructor.
     * @property {module:model/InlineResponse4092}
     */
    InlineResponse4092,

    /**
     * The InlineResponse4093 model constructor.
     * @property {module:model/InlineResponse4093}
     */
    InlineResponse4093,

    /**
     * The InlineResponse4094 model constructor.
     * @property {module:model/InlineResponse4094}
     */
    InlineResponse4094,

    /**
     * The InlineResponse4095 model constructor.
     * @property {module:model/InlineResponse4095}
     */
    InlineResponse4095,

    /**
     * The InlineResponse4096 model constructor.
     * @property {module:model/InlineResponse4096}
     */
    InlineResponse4096,

    /**
     * The InlineResponse4097 model constructor.
     * @property {module:model/InlineResponse4097}
     */
    InlineResponse4097,

    /**
     * The InlineResponse4098 model constructor.
     * @property {module:model/InlineResponse4098}
     */
    InlineResponse4098,

    /**
     * The InlineResponse4099 model constructor.
     * @property {module:model/InlineResponse4099}
     */
    InlineResponse4099,

    /**
     * The ItemsItemIdBody model constructor.
     * @property {module:model/ItemsItemIdBody}
     */
    ItemsItemIdBody,

    /**
     * The ItemsItemIdBody1 model constructor.
     * @property {module:model/ItemsItemIdBody1}
     */
    ItemsItemIdBody1,

    /**
     * The MemberGender model constructor.
     * @property {module:model/MemberGender}
     */
    MemberGender,

    /**
     * The MemberIdCredentialCardsBody model constructor.
     * @property {module:model/MemberIdCredentialCardsBody}
     */
    MemberIdCredentialCardsBody,

    /**
     * The MemberIdProfileBody model constructor.
     * @property {module:model/MemberIdProfileBody}
     */
    MemberIdProfileBody,

    /**
     * The MemberInterestsCommittee model constructor.
     * @property {module:model/MemberInterestsCommittee}
     */
    MemberInterestsCommittee,

    /**
     * The MemberInterestsIndividual model constructor.
     * @property {module:model/MemberInterestsIndividual}
     */
    MemberInterestsIndividual,

    /**
     * The MemberNationalityStatus model constructor.
     * @property {module:model/MemberNationalityStatus}
     */
    MemberNationalityStatus,

    /**
     * The MemberProfileCounty model constructor.
     * @property {module:model/MemberProfileCounty}
     */
    MemberProfileCounty,

    /**
     * The MemberRole model constructor.
     * @property {module:model/MemberRole}
     */
    MemberRole,

    /**
     * The MemberStatus model constructor.
     * @property {module:model/MemberStatus}
     */
    MemberStatus,

    /**
     * The MembersBody model constructor.
     * @property {module:model/MembersBody}
     */
    MembersBody,

    /**
     * The MembersMemberIdBody model constructor.
     * @property {module:model/MembersMemberIdBody}
     */
    MembersMemberIdBody,

    /**
     * The MembershipDocKey model constructor.
     * @property {module:model/MembershipDocKey}
     */
    MembershipDocKey,

    /**
     * The MembershipsSignupBody model constructor.
     * @property {module:model/MembershipsSignupBody}
     */
    MembershipsSignupBody,

    /**
     * The OrderIdPaymentsBody model constructor.
     * @property {module:model/OrderIdPaymentsBody}
     */
    OrderIdPaymentsBody,

    /**
     * The OrdersOrderIdBody model constructor.
     * @property {module:model/OrdersOrderIdBody}
     */
    OrdersOrderIdBody,

    /**
     * The ProfileDocKeyNameBody model constructor.
     * @property {module:model/ProfileDocKeyNameBody}
     */
    ProfileDocKeyNameBody,

    /**
     * The PurchaseItemIdFulfillmentStatusBody model constructor.
     * @property {module:model/PurchaseItemIdFulfillmentStatusBody}
     */
    PurchaseItemIdFulfillmentStatusBody,

    /**
     * The PurchaseItemsPurchaseItemIdBody model constructor.
     * @property {module:model/PurchaseItemsPurchaseItemIdBody}
     */
    PurchaseItemsPurchaseItemIdBody,

    /**
     * The ResAccount model constructor.
     * @property {module:model/ResAccount}
     */
    ResAccount,

    /**
     * The ResCredentialCard model constructor.
     * @property {module:model/ResCredentialCard}
     */
    ResCredentialCard,

    /**
     * The ResMember model constructor.
     * @property {module:model/ResMember}
     */
    ResMember,

    /**
     * The ResMemberBase model constructor.
     * @property {module:model/ResMemberBase}
     */
    ResMemberBase,

    /**
     * The ResMemberBaseNationality model constructor.
     * @property {module:model/ResMemberBaseNationality}
     */
    ResMemberBaseNationality,

    /**
     * The ResMemberDoc model constructor.
     * @property {module:model/ResMemberDoc}
     */
    ResMemberDoc,

    /**
     * The ResMemberFeesDonations model constructor.
     * @property {module:model/ResMemberFeesDonations}
     */
    ResMemberFeesDonations,

    /**
     * The ResMemberProfile model constructor.
     * @property {module:model/ResMemberProfile}
     */
    ResMemberProfile,

    /**
     * The ResMemberProfileDocs model constructor.
     * @property {module:model/ResMemberProfileDocs}
     */
    ResMemberProfileDocs,

    /**
     * The ResMembershipDocs model constructor.
     * @property {module:model/ResMembershipDocs}
     */
    ResMembershipDocs,

    /**
     * The ResPublicCredentialCard model constructor.
     * @property {module:model/ResPublicCredentialCard}
     */
    ResPublicCredentialCard,

    /**
     * The ResShopItem model constructor.
     * @property {module:model/ResShopItem}
     */
    ResShopItem,

    /**
     * The ResShopOrder model constructor.
     * @property {module:model/ResShopOrder}
     */
    ResShopOrder,

    /**
     * The ResShopOrderItem model constructor.
     * @property {module:model/ResShopOrderItem}
     */
    ResShopOrderItem,

    /**
     * The ResShopOrderPayment model constructor.
     * @property {module:model/ResShopOrderPayment}
     */
    ResShopOrderPayment,

    /**
     * The ResShopOrderTotals model constructor.
     * @property {module:model/ResShopOrderTotals}
     */
    ResShopOrderTotals,

    /**
     * The ResShopPurchaseItem model constructor.
     * @property {module:model/ResShopPurchaseItem}
     */
    ResShopPurchaseItem,

    /**
     * The ShopItemType model constructor.
     * @property {module:model/ShopItemType}
     */
    ShopItemType,

    /**
     * The ShopItemsBody model constructor.
     * @property {module:model/ShopItemsBody}
     */
    ShopItemsBody,

    /**
     * The ShopOrderPaymentMethod model constructor.
     * @property {module:model/ShopOrderPaymentMethod}
     */
    ShopOrderPaymentMethod,

    /**
     * The ShopOrderPaymentStatus model constructor.
     * @property {module:model/ShopOrderPaymentStatus}
     */
    ShopOrderPaymentStatus,

    /**
     * The ShopOrderStatus model constructor.
     * @property {module:model/ShopOrderStatus}
     */
    ShopOrderStatus,

    /**
     * The ShopPurchaseItemFulfillmentStatus model constructor.
     * @property {module:model/ShopPurchaseItemFulfillmentStatus}
     */
    ShopPurchaseItemFulfillmentStatus,

    /**
    * The AccountsApi service constructor.
    * @property {module:api/AccountsApi}
    */
    AccountsApi,

    /**
    * The AdminApi service constructor.
    * @property {module:api/AdminApi}
    */
    AdminApi,

    /**
    * The AuthApi service constructor.
    * @property {module:api/AuthApi}
    */
    AuthApi,

    /**
    * The CredentialCardsApi service constructor.
    * @property {module:api/CredentialCardsApi}
    */
    CredentialCardsApi,

    /**
    * The DirectoryApi service constructor.
    * @property {module:api/DirectoryApi}
    */
    DirectoryApi,

    /**
    * The DocsApi service constructor.
    * @property {module:api/DocsApi}
    */
    DocsApi,

    /**
    * The MemberProfilesApi service constructor.
    * @property {module:api/MemberProfilesApi}
    */
    MemberProfilesApi,

    /**
    * The MembersApi service constructor.
    * @property {module:api/MembersApi}
    */
    MembersApi,

    /**
    * The ShopApi service constructor.
    * @property {module:api/ShopApi}
    */
    ShopApi
};
