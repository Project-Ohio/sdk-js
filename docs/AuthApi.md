# MyOhioAssemblyComPublicApi.AuthApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authAccountPasswordResetCreate**](AuthApi.md#authAccountPasswordResetCreate) | **POST** /accounts/{accountId}/pass/reset | Password reset account
[**authEmailUpdateRequest**](AuthApi.md#authEmailUpdateRequest) | **PUT** /auth/email | Email Update Request
[**authEmailUpdateVerify**](AuthApi.md#authEmailUpdateVerify) | **PUT** /auth/email/verify | Confirm account email
[**authLoginCreate**](AuthApi.md#authLoginCreate) | **POST** /auth/login | Login
[**authPasswordUpdate**](AuthApi.md#authPasswordUpdate) | **PUT** /auth/pass | Password Update
[**authRefreshCreate**](AuthApi.md#authRefreshCreate) | **POST** /auth/refresh | Auth Refresh



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

let apiInstance = new MyOhioAssemblyComPublicApi.AuthApi();
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


## authEmailUpdateRequest

> AuthEmailUpdateRequest200Response authEmailUpdateRequest(opts)

Email Update Request

Update user email request. Both email and email conf values should match.  Email must be different from current email.  This operation will result in a confirmation email being sent to the new email.  Only after client confirmation will the email change go into effect.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.AuthApi();
let opts = {
  'authEmailUpdateRequestRequest': new MyOhioAssemblyComPublicApi.AuthEmailUpdateRequestRequest() // AuthEmailUpdateRequestRequest | The respective email and conf fields should match.
};
apiInstance.authEmailUpdateRequest(opts, (error, data, response) => {
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
 **authEmailUpdateRequestRequest** | [**AuthEmailUpdateRequestRequest**](AuthEmailUpdateRequestRequest.md)| The respective email and conf fields should match. | [optional] 

### Return type

[**AuthEmailUpdateRequest200Response**](AuthEmailUpdateRequest200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authEmailUpdateVerify

> AuthEmailUpdateVerify200Response authEmailUpdateVerify(token)

Confirm account email

Confirms account email

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';

let apiInstance = new MyOhioAssemblyComPublicApi.AuthApi();
let token = eyJhbGc.eyJle.9zZalsd23lsfj; // String | JWT signature
apiInstance.authEmailUpdateVerify(token, (error, data, response) => {
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
 **token** | **String**| JWT signature | 

### Return type

[**AuthEmailUpdateVerify200Response**](AuthEmailUpdateVerify200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## authLoginCreate

> AuthLoginCreate200Response authLoginCreate(opts)

Login

New login request all users.  This operation uses basic auth where the username is the account email and the password is the account password.  This operation will fail with 409 response if account role is elevated and the &#39;elevatedPass&#39; value is not provided.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure HTTP basic authorization: basicEmailPassword
let basicEmailPassword = defaultClient.authentications['basicEmailPassword'];
basicEmailPassword.username = 'YOUR USERNAME';
basicEmailPassword.password = 'YOUR PASSWORD';

let apiInstance = new MyOhioAssemblyComPublicApi.AuthApi();
let opts = {
  'authLoginCreateRequest': new MyOhioAssemblyComPublicApi.AuthLoginCreateRequest() // AuthLoginCreateRequest | 
};
apiInstance.authLoginCreate(opts, (error, data, response) => {
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
 **authLoginCreateRequest** | [**AuthLoginCreateRequest**](AuthLoginCreateRequest.md)|  | [optional] 

### Return type

[**AuthLoginCreate200Response**](AuthLoginCreate200Response.md)

### Authorization

[basicEmailPassword](../README.md#basicEmailPassword)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authPasswordUpdate

> AuthPasswordUpdate200Response authPasswordUpdate(opts)

Password Update

Update password for currently authenticated user.  Updated password cannot match current password.  Updated elevated password cannot match current elevated password.  This operation will not affect the open auth session.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.AuthApi();
let opts = {
  'authPasswordUpdateRequest': new MyOhioAssemblyComPublicApi.AuthPasswordUpdateRequest() // AuthPasswordUpdateRequest | The respective pass and conf fields should match if provided.  Only elevated roles require elevatedPass(Conf).
};
apiInstance.authPasswordUpdate(opts, (error, data, response) => {
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
 **authPasswordUpdateRequest** | [**AuthPasswordUpdateRequest**](AuthPasswordUpdateRequest.md)| The respective pass and conf fields should match if provided.  Only elevated roles require elevatedPass(Conf). | [optional] 

### Return type

[**AuthPasswordUpdate200Response**](AuthPasswordUpdate200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## authRefreshCreate

> AuthRefreshCreate200Response authRefreshCreate()

Auth Refresh

Refresh auth session, which provides a new auth token for use in other authenticated requests.  This does not extend the current auth session.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenRefresh
let bearerTokenRefresh = defaultClient.authentications['bearerTokenRefresh'];
bearerTokenRefresh.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.AuthApi();
apiInstance.authRefreshCreate((error, data, response) => {
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

[**AuthRefreshCreate200Response**](AuthRefreshCreate200Response.md)

### Authorization

[bearerTokenRefresh](../README.md#bearerTokenRefresh)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

