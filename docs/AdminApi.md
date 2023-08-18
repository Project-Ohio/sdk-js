# MyOhioAssemblyComPublicApi.AdminApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accountsDeleteOne**](AdminApi.md#accountsDeleteOne) | **DELETE** /accounts/{accountId} | Delete one account
[**accountsList**](AdminApi.md#accountsList) | **GET** /accounts | List all accounts
[**authAccountPasswordResetCreate**](AdminApi.md#authAccountPasswordResetCreate) | **POST** /accounts/{accountId}/pass/reset | Password reset account



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

let apiInstance = new MyOhioAssemblyComPublicApi.AdminApi();
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

let apiInstance = new MyOhioAssemblyComPublicApi.AdminApi();
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


## authAccountPasswordResetCreate

> AuthAccountPasswordResetCreate200Response authAccountPasswordResetCreate(accountId)

Password reset account

Reset account password.  This operation is restricted to elevated roles.  This action will also cause an email to be sent to user with a temporary password which must be changed upon first logging in.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.AdminApi();
let accountId = "accountId_example"; // String | account id
apiInstance.authAccountPasswordResetCreate(accountId, (error, data, response) => {
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

[**AuthAccountPasswordResetCreate200Response**](AuthAccountPasswordResetCreate200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

