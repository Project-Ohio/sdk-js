# MyOhioAssemblyComPublicApi.MemberProfilesApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberProfileDocsCreate**](MemberProfilesApi.md#memberProfileDocsCreate) | **POST** /members/{memberId}/profile/docs/{profileDocKey} | Create new member profile doc
[**memberProfileDocsDeleteOne**](MemberProfilesApi.md#memberProfileDocsDeleteOne) | **DELETE** /members/{memberId}/profile/docs/{profileDocKey} | Delete existing member profile doc
[**memberProfileDocsNameUpdateOne**](MemberProfilesApi.md#memberProfileDocsNameUpdateOne) | **PUT** /members/{memberId}/profile/docs/{profileDocKey}/name | Update existing member profile doc name
[**memberProfileDocsUpdateOne**](MemberProfilesApi.md#memberProfileDocsUpdateOne) | **PUT** /members/{memberId}/profile/docs/{profileDocKey} | Update member profile doc
[**memberProfileGet**](MemberProfilesApi.md#memberProfileGet) | **GET** /members/{memberId}/profile | Get member profile
[**memberProfileUpdate**](MemberProfilesApi.md#memberProfileUpdate) | **PUT** /members/{memberId}/profile | Update member profile



## memberProfileDocsCreate

> MemberProfileGet200Response memberProfileDocsCreate(memberId, profileDocKey, docName, docFile)

Create new member profile doc

Upload new profile document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MemberProfilesApi();
let memberId = "memberId_example"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let docName = "docName_example"; // String | 
let docFile = "/path/to/file"; // File | 
apiInstance.memberProfileDocsCreate(memberId, profileDocKey, docName, docFile, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **docName** | **String**|  | 
 **docFile** | **File**|  | 

### Return type

[**MemberProfileGet200Response**](MemberProfileGet200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## memberProfileDocsDeleteOne

> MemberProfileDocsDeleteOne200Response memberProfileDocsDeleteOne(memberId, profileDocKey, fileName)

Delete existing member profile doc

Delete document owned by member profile. This operation is restricted to auth user with memberId and elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MemberProfilesApi();
let memberId = "memberId_example"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let fileName = path/to/image.jpg; // String | member id
apiInstance.memberProfileDocsDeleteOne(memberId, profileDocKey, fileName, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **fileName** | **String**| member id | 

### Return type

[**MemberProfileDocsDeleteOne200Response**](MemberProfileDocsDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberProfileDocsNameUpdateOne

> MemberProfileGet200Response memberProfileDocsNameUpdateOne(memberId, profileDocKey, docName)

Update existing member profile doc name

Update name of profile document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MemberProfilesApi();
let memberId = "memberId_example"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let docName = "docName_example"; // String | 
apiInstance.memberProfileDocsNameUpdateOne(memberId, profileDocKey, docName, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **docName** | **String**|  | 

### Return type

[**MemberProfileGet200Response**](MemberProfileGet200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## memberProfileDocsUpdateOne

> MemberProfileGet200Response memberProfileDocsUpdateOne(memberId, profileDocKey, docName, docFile)

Update member profile doc

Upload new document for member profile, overwriting existing doc.  This operation is restricted to memberId and elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MemberProfilesApi();
let memberId = "memberId_example"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let docName = "docName_example"; // String | 
let docFile = "/path/to/file"; // File | 
apiInstance.memberProfileDocsUpdateOne(memberId, profileDocKey, docName, docFile, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **docName** | **String**|  | 
 **docFile** | **File**|  | 

### Return type

[**MemberProfileGet200Response**](MemberProfileGet200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## memberProfileGet

> MemberProfileGet200Response memberProfileGet(memberId)

Get member profile

Read member profile.  This operation is restricted to auth user&#39;s memberId unless role is elevated.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MemberProfilesApi();
let memberId = "memberId_example"; // String | member id
apiInstance.memberProfileGet(memberId, (error, data, response) => {
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

### Return type

[**MemberProfileGet200Response**](MemberProfileGet200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberProfileUpdate

> MemberProfileGet200Response memberProfileUpdate(memberId, opts)

Update member profile

Update existing member profile

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MemberProfilesApi();
let memberId = "memberId_example"; // String | member id
let opts = {
  'memberProfileUpdateRequest': new MyOhioAssemblyComPublicApi.MemberProfileUpdateRequest() // MemberProfileUpdateRequest | 
};
apiInstance.memberProfileUpdate(memberId, opts, (error, data, response) => {
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
 **memberProfileUpdateRequest** | [**MemberProfileUpdateRequest**](MemberProfileUpdateRequest.md)|  | [optional] 

### Return type

[**MemberProfileGet200Response**](MemberProfileGet200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

