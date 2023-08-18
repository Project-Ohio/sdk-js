# MyOhioAssemblyComPublicApi.CredentialCardsApi

All URIs are relative to *http://localhost:8101/v1*

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



## credentialCardsGetOne

> CredentialCardsGetOne200Response credentialCardsGetOne(masterRecordNumber)

Get public credential card

Get existing credential card unless expired or deleted.  This is a public operation.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let masterRecordNumber = 01OK4Y2; // String | unique master record number for credential card
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

[**CredentialCardsGetOne200Response**](CredentialCardsGetOne200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberCredentialCardsCreate

> MemberCredentialCardsCreate201Response memberCredentialCardsCreate(memberId, opts)

Create credential card

Create credential card.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
let opts = {
  'memberCredentialCardsCreateRequest': new MyOhioAssemblyComPublicApi.MemberCredentialCardsCreateRequest() // MemberCredentialCardsCreateRequest | 
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
 **memberId** | **String**| member id | 
 **memberCredentialCardsCreateRequest** | [**MemberCredentialCardsCreateRequest**](MemberCredentialCardsCreateRequest.md)|  | [optional] 

### Return type

[**MemberCredentialCardsCreate201Response**](MemberCredentialCardsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## memberCredentialCardsDeleteOne

> MemberCredentialCardsDeleteOne200Response memberCredentialCardsDeleteOne(memberId, credentialCardId)

Delete credential card

Delete credential card even if deleted.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
let credentialCardId = "credentialCardId_example"; // String | credential card id
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
 **memberId** | **String**| member id | 
 **credentialCardId** | **String**| credential card id | 

### Return type

[**MemberCredentialCardsDeleteOne200Response**](MemberCredentialCardsDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberCredentialCardsGetOne

> MemberCredentialCardsCreate201Response memberCredentialCardsGetOne(memberId, credentialCardId)

Get one member credential card

Get one member credential card even if expired but not if deleted.  This operation is restricted to auth user&#39;s memberId and elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
let credentialCardId = "credentialCardId_example"; // String | credential card id
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
 **memberId** | **String**| member id | 
 **credentialCardId** | **String**| credential card id | 

### Return type

[**MemberCredentialCardsCreate201Response**](MemberCredentialCardsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberCredentialCardsList

> MemberCredentialCardsList200Response memberCredentialCardsList(memberId, includeDeleted)

List member credential cards

Get all member credential cards even if expired but not if deleted.  This operation is restricted to auth user&#39;s memberId and elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
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
 **memberId** | **String**| member id | 
 **includeDeleted** | **Boolean**|  | 

### Return type

[**MemberCredentialCardsList200Response**](MemberCredentialCardsList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberCredentialCardsUpdateOneExpiry

> MemberCredentialCardsCreate201Response memberCredentialCardsUpdateOneExpiry(memberId, credentialCardId, opts)

Update expiration date on credential card

Update expiration date on credential card.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
let credentialCardId = "credentialCardId_example"; // String | credential card id
let opts = {
  'memberCredentialCardsUpdateOneExpiryRequest': new MyOhioAssemblyComPublicApi.MemberCredentialCardsUpdateOneExpiryRequest() // MemberCredentialCardsUpdateOneExpiryRequest | 
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
 **memberId** | **String**| member id | 
 **credentialCardId** | **String**| credential card id | 
 **memberCredentialCardsUpdateOneExpiryRequest** | [**MemberCredentialCardsUpdateOneExpiryRequest**](MemberCredentialCardsUpdateOneExpiryRequest.md)|  | [optional] 

### Return type

[**MemberCredentialCardsCreate201Response**](MemberCredentialCardsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## memberCredentialCardsUpdateOnePrint

> MemberCredentialCardsCreate201Response memberCredentialCardsUpdateOnePrint(memberId, credentialCardId)

Print credential card

Print credential card.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
let credentialCardId = "credentialCardId_example"; // String | credential card id
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
 **memberId** | **String**| member id | 
 **credentialCardId** | **String**| credential card id | 

### Return type

[**MemberCredentialCardsCreate201Response**](MemberCredentialCardsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberCredentialCardsUpdateOneVerify

> MemberCredentialCardsCreate201Response memberCredentialCardsUpdateOneVerify(memberId, credentialCardId)

Verify credential card

Verify credential card.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.CredentialCardsApi();
let memberId = "memberId_example"; // String | member id
let credentialCardId = "credentialCardId_example"; // String | credential card id
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
 **memberId** | **String**| member id | 
 **credentialCardId** | **String**| credential card id | 

### Return type

[**MemberCredentialCardsCreate201Response**](MemberCredentialCardsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

