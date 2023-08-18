# MyOhioAssemblycomPublicApi.CredentialCardsApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**credentialCardsGetOne**](CredentialCardsApi.md#credentialCardsGetOne) | **GET** /credentialCards/{masterRecordNumber} | Get public credential card
[**memberCredentialCardsCreate**](CredentialCardsApi.md#memberCredentialCardsCreate) | **POST** /members/{memberId}/credentialCards | Create credential card
[**memberCredentialCardsDeleteOne**](CredentialCardsApi.md#memberCredentialCardsDeleteOne) | **DELETE** /members/{memberId}/credentialCards/{credentialCardId} | Delete credential card
[**memberCredentialCardsGetOne**](CredentialCardsApi.md#memberCredentialCardsGetOne) | **GET** /members/{memberId}/credentialCards/{credentialCardId} | Get one member credential card
[**memberCredentialCardsList**](CredentialCardsApi.md#memberCredentialCardsList) | **GET** /members/{memberId}/credentialCards | List member credential cards
[**memberCredentialCardsUpdateOneExpiry**](CredentialCardsApi.md#memberCredentialCardsUpdateOneExpiry) | **PUT** /members/{memberId}/credentialCards/{credentialCardId}/expiration | Update expiration date on credential card
[**memberCredentialCardsUpdateOnePrint**](CredentialCardsApi.md#memberCredentialCardsUpdateOnePrint) | **PUT** /members/{memberId}/credentialCards/{credentialCardId}/print | Print credential card
[**memberCredentialCardsUpdateOneVerify**](CredentialCardsApi.md#memberCredentialCardsUpdateOneVerify) | **PUT** /members/{memberId}/credentialCards/{credentialCardId}/verify | Verify credential card

<a name="credentialCardsGetOne"></a>
# **credentialCardsGetOne**
> InlineResponse20015 credentialCardsGetOne(masterRecordNumber)

Get public credential card

Get existing credential card unless expired or deleted.  This is a public operation.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';

let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let masterRecordNumber = "masterRecordNumber_example"; // String | unique master record number for credential card

apiInstance.credentialCardsGetOne(masterRecordNumber, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **masterRecordNumber** | **String**| unique master record number for credential card | 

### Return type

[**InlineResponse20015**](InlineResponse20015.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberCredentialCardsCreate"></a>
# **memberCredentialCardsCreate**
> InlineResponse2011 memberCredentialCardsCreate(memberId, opts)

Create credential card

Create credential card.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.MemberIdCredentialCardsBody() // MemberIdCredentialCardsBody | 
};
apiInstance.memberCredentialCardsCreate(memberId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **body** | [**MemberIdCredentialCardsBody**](MemberIdCredentialCardsBody.md)|  | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="memberCredentialCardsDeleteOne"></a>
# **memberCredentialCardsDeleteOne**
> InlineResponse20011 memberCredentialCardsDeleteOne(memberId, credentialCardId)

Delete credential card

Delete credential card even if deleted.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let credentialCardId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | credential card id

apiInstance.memberCredentialCardsDeleteOne(memberId, credentialCardId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **credentialCardId** | [**String**](.md)| credential card id | 

### Return type

[**InlineResponse20011**](InlineResponse20011.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberCredentialCardsGetOne"></a>
# **memberCredentialCardsGetOne**
> InlineResponse2011 memberCredentialCardsGetOne(memberId, credentialCardId)

Get one member credential card

Get one member credential card even if expired but not if deleted.  This operation is restricted to auth user&#x27;s memberId and elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let credentialCardId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | credential card id

apiInstance.memberCredentialCardsGetOne(memberId, credentialCardId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **credentialCardId** | [**String**](.md)| credential card id | 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberCredentialCardsList"></a>
# **memberCredentialCardsList**
> InlineResponse20010 memberCredentialCardsList(memberId, includeDeleted)

List member credential cards

Get all member credential cards even if expired but not if deleted.  This operation is restricted to auth user&#x27;s memberId and elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let includeDeleted = true; // Boolean | 

apiInstance.memberCredentialCardsList(memberId, includeDeleted, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **includeDeleted** | **Boolean**|  | 

### Return type

[**InlineResponse20010**](InlineResponse20010.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberCredentialCardsUpdateOneExpiry"></a>
# **memberCredentialCardsUpdateOneExpiry**
> InlineResponse2011 memberCredentialCardsUpdateOneExpiry(memberId, credentialCardId, opts)

Update expiration date on credential card

Update expiration date on credential card.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let credentialCardId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | credential card id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.CredentialCardIdExpirationBody() // CredentialCardIdExpirationBody | 
};
apiInstance.memberCredentialCardsUpdateOneExpiry(memberId, credentialCardId, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **credentialCardId** | [**String**](.md)| credential card id | 
 **body** | [**CredentialCardIdExpirationBody**](CredentialCardIdExpirationBody.md)|  | [optional] 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="memberCredentialCardsUpdateOnePrint"></a>
# **memberCredentialCardsUpdateOnePrint**
> InlineResponse2011 memberCredentialCardsUpdateOnePrint(memberId, credentialCardId)

Print credential card

Print credential card.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let credentialCardId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | credential card id

apiInstance.memberCredentialCardsUpdateOnePrint(memberId, credentialCardId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **credentialCardId** | [**String**](.md)| credential card id | 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberCredentialCardsUpdateOneVerify"></a>
# **memberCredentialCardsUpdateOneVerify**
> InlineResponse2011 memberCredentialCardsUpdateOneVerify(memberId, credentialCardId)

Verify credential card

Verify credential card.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.CredentialCardsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let credentialCardId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | credential card id

apiInstance.memberCredentialCardsUpdateOneVerify(memberId, credentialCardId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **memberId** | [**String**](.md)| member id | 
 **credentialCardId** | [**String**](.md)| credential card id | 

### Return type

[**InlineResponse2011**](InlineResponse2011.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

