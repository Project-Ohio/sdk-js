# MyOhioAssemblyComPublicApi.AccountsApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accountsDeleteOne**](AccountsApi.md#accountsDeleteOne) | **DELETE** /accounts/{accountId} | Delete one account
[**accountsList**](AccountsApi.md#accountsList) | **GET** /accounts | List all accounts



## accountsDeleteOne

> AccountsDeleteOne200Response accountsDeleteOne(accountId)

Delete one account

Delete one account.  This operation is restricted to administrators

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.AccountsApi();
let accountId = "accountId_example"; // String | account id
apiInstance.accountsDeleteOne(accountId, (error, data, response) => {
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
 **accountId** | **String**| account id | 

### Return type

[**AccountsDeleteOne200Response**](AccountsDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## accountsList

> AccountsList200Response accountsList()

List all accounts

List all accounts except any sensitive auth data and member data.  This operation is restricted to administrators

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.AccountsApi();
apiInstance.accountsList((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AccountsList200Response**](AccountsList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

