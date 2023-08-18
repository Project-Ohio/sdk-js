# MyOhioAssemblycomPublicApi.AuthApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authAccountPasswordResetCreate**](AuthApi.md#authAccountPasswordResetCreate) | **POST** /accounts/{accountId}/pass/reset | Password reset account
[**authEmailUpdateRequest**](AuthApi.md#authEmailUpdateRequest) | **PUT** /auth/email | Email Update Request
[**authEmailUpdateVerify**](AuthApi.md#authEmailUpdateVerify) | **PUT** /auth/email/verify | Confirm account email
[**authLoginCreate**](AuthApi.md#authLoginCreate) | **POST** /auth/login | Login
[**authPasswordUpdate**](AuthApi.md#authPasswordUpdate) | **PUT** /auth/pass | Password Update
[**authRefreshCreate**](AuthApi.md#authRefreshCreate) | **POST** /auth/refresh | Auth Refresh

<a name="authAccountPasswordResetCreate"></a>
# **authAccountPasswordResetCreate**
> InlineResponse20026 authAccountPasswordResetCreate(accountId)

Password reset account

Reset account password.  This operation is restricted to elevated roles unless auth user is also the user being reset.  This action will also cause an email to be sent to user with a temporary password which must be changed upon first logging in.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.AuthApi();
let accountId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | account id

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
 **accountId** | [**String**](.md)| account id | 

### Return type

[**InlineResponse20026**](InlineResponse20026.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="authEmailUpdateRequest"></a>
# **authEmailUpdateRequest**
> InlineResponse2003 authEmailUpdateRequest(opts)

Email Update Request

Update user email request. Both email and email conf values should match.  Email must be different from current email.  This operation will result in a confirmation email being sent to the new email.  Only after client confirmation will the email change go into effect.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.AuthApi();
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.AuthEmailBody() // AuthEmailBody | The respective email and conf fields should match.
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
 **body** | [**AuthEmailBody**](AuthEmailBody.md)| The respective email and conf fields should match. | [optional] 

### Return type

[**InlineResponse2003**](InlineResponse2003.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="authEmailUpdateVerify"></a>
# **authEmailUpdateVerify**
> InlineResponse2004 authEmailUpdateVerify(token)

Confirm account email

Confirms account email

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';

let apiInstance = new MyOhioAssemblycomPublicApi.AuthApi();
let token = "token_example"; // String | JWT signature

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

[**InlineResponse2004**](InlineResponse2004.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="authLoginCreate"></a>
# **authLoginCreate**
> InlineResponse200 authLoginCreate(opts)

Login

New login request all users.  This operation uses basic auth where the username is the account email and the password is the account password.  This operation will fail with 409 response if account role is elevated and the &#x27;elevatedPass&#x27; value is not provided.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;
// Configure HTTP basic authorization: basicEmailPassword
let basicEmailPassword = defaultClient.authentications['basicEmailPassword'];
basicEmailPassword.username = 'YOUR USERNAME';
basicEmailPassword.password = 'YOUR PASSWORD';

let apiInstance = new MyOhioAssemblycomPublicApi.AuthApi();
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.AuthLoginBody() // AuthLoginBody | 
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
 **body** | [**AuthLoginBody**](AuthLoginBody.md)|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

[basicEmailPassword](../README.md#basicEmailPassword)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="authPasswordUpdate"></a>
# **authPasswordUpdate**
> InlineResponse2002 authPasswordUpdate(opts)

Password Update

Update password for currently authenticated user.  Updated password cannot match current password.  Updated elevated password cannot match current elevated password.  This operation will not affect the open auth session.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.AuthApi();
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.AuthPassBody() // AuthPassBody | The respective pass and conf fields should match if provided.  Only elevated roles require elevatedPass(Conf).
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
 **body** | [**AuthPassBody**](AuthPassBody.md)| The respective pass and conf fields should match if provided.  Only elevated roles require elevatedPass(Conf). | [optional] 

### Return type

[**InlineResponse2002**](InlineResponse2002.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="authRefreshCreate"></a>
# **authRefreshCreate**
> InlineResponse2001 authRefreshCreate()

Auth Refresh

Refresh auth session, which provides a new auth token for use in other authenticated requests.  This does not extend the current auth session.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.AuthApi();
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

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

[bearerTokenRefresh](../README.md#bearerTokenRefresh)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

