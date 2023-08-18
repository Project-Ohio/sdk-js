# MyOhioAssemblycomPublicApi.MemberProfilesApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberProfileDocsCreate**](MemberProfilesApi.md#memberProfileDocsCreate) | **POST** /members/{memberId}/profile/docs/{profileDocKey} | Create new member profile doc
[**memberProfileDocsDeleteOne**](MemberProfilesApi.md#memberProfileDocsDeleteOne) | **DELETE** /members/{memberId}/profile/docs/{profileDocKey} | Delete existing member profile doc
[**memberProfileDocsNameUpdateOne**](MemberProfilesApi.md#memberProfileDocsNameUpdateOne) | **PUT** /members/{memberId}/profile/docs/{profileDocKey}/name | Update existing member profile doc name
[**memberProfileDocsUpdateOne**](MemberProfilesApi.md#memberProfileDocsUpdateOne) | **PUT** /members/{memberId}/profile/docs/{profileDocKey} | Update member profile doc
[**memberProfileGet**](MemberProfilesApi.md#memberProfileGet) | **GET** /members/{memberId}/profile | Get member profile
[**memberProfileUpdate**](MemberProfilesApi.md#memberProfileUpdate) | **PUT** /members/{memberId}/profile | Update member profile

<a name="memberProfileDocsCreate"></a>
# **memberProfileDocsCreate**
> InlineResponse2008 memberProfileDocsCreate(memberId, profileDocKey, opts)

Create new member profile doc

Upload new profile document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MemberProfilesApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let opts = { 
  'docName': "docName_example", // String | 
  'docFile': "docFile_example" // Blob | 
};
apiInstance.memberProfileDocsCreate(memberId, profileDocKey, opts, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **docName** | **String**|  | [optional] 
 **docFile** | **Blob**|  | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="memberProfileDocsDeleteOne"></a>
# **memberProfileDocsDeleteOne**
> InlineResponse2009 memberProfileDocsDeleteOne(memberId, profileDocKey, fileName)

Delete existing member profile doc

Delete document owned by member profile. This operation is restricted to auth user with memberId and elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MemberProfilesApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let fileName = "fileName_example"; // String | member id

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
 **memberId** | [**String**](.md)| member id | 
 **profileDocKey** | **String**| profile doc key | 
 **fileName** | **String**| member id | 

### Return type

[**InlineResponse2009**](InlineResponse2009.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberProfileDocsNameUpdateOne"></a>
# **memberProfileDocsNameUpdateOne**
> InlineResponse2008 memberProfileDocsNameUpdateOne(memberId, profileDocKey, opts)

Update existing member profile doc name

Update name of profile document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MemberProfilesApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let opts = { 
  'docName': "docName_example" // String | 
};
apiInstance.memberProfileDocsNameUpdateOne(memberId, profileDocKey, opts, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **docName** | **String**|  | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="memberProfileDocsUpdateOne"></a>
# **memberProfileDocsUpdateOne**
> InlineResponse2008 memberProfileDocsUpdateOne(memberId, profileDocKey, opts)

Update member profile doc

Upload new document for member profile, overwriting existing doc.  This operation is restricted to memberId and elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MemberProfilesApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let profileDocKey = "profileDocKey_example"; // String | profile doc key
let opts = { 
  'docName': "docName_example", // String | 
  'docFile': "docFile_example" // Blob | 
};
apiInstance.memberProfileDocsUpdateOne(memberId, profileDocKey, opts, (error, data, response) => {
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
 **profileDocKey** | **String**| profile doc key | 
 **docName** | **String**|  | [optional] 
 **docFile** | **Blob**|  | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="memberProfileGet"></a>
# **memberProfileGet**
> InlineResponse2008 memberProfileGet(memberId)

Get member profile

Read member profile.  This operation is restricted to auth user&#x27;s memberId unless role is elevated.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MemberProfilesApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id

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
 **memberId** | [**String**](.md)| member id | 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberProfileUpdate"></a>
# **memberProfileUpdate**
> InlineResponse2008 memberProfileUpdate(memberId, opts)

Update member profile

Update existing member profile

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MemberProfilesApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.MemberIdProfileBody() // MemberIdProfileBody | 
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
 **memberId** | [**String**](.md)| member id | 
 **body** | [**MemberIdProfileBody**](MemberIdProfileBody.md)|  | [optional] 

### Return type

[**InlineResponse2008**](InlineResponse2008.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

