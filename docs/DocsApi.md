# MyOhioAssemblyComPublicApi.DocsApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**credentialCardsGetOne**](DocsApi.md#credentialCardsGetOne) | **GET** /credentialCards/{masterRecordNumber} | Get public credential card
[**memberDocsCreate**](DocsApi.md#memberDocsCreate) | **POST** /members/{memberId}/docs/{docKey} | Create new member doc
[**memberDocsDeleteOne**](DocsApi.md#memberDocsDeleteOne) | **DELETE** /members/{memberId}/docs/{docKey} | Delete existing member doc
[**memberDocsDownload**](DocsApi.md#memberDocsDownload) | **GET** /memberDocs/{memberDocId}/download | Download one member doc
[**memberDocsGet**](DocsApi.md#memberDocsGet) | **GET** /members/{memberId}/docs | Get member docs
[**memberDocsNameUpdateOne**](DocsApi.md#memberDocsNameUpdateOne) | **PUT** /members/{memberId}/docs/{docKey}/name | Update existing member doc name
[**memberDocsUpdateOne**](DocsApi.md#memberDocsUpdateOne) | **PUT** /members/{memberId}/docs/{docKey} | Update existing member doc



## credentialCardsGetOne

> CredentialCardsGetOne200Response credentialCardsGetOne(masterRecordNumber)

Get public credential card

Get existing credential card unless expired or deleted.  This is a public operation.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
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


## memberDocsCreate

> MemberDocsUpdateOne200Response memberDocsCreate(memberId, docKey, docName, docFile)

Create new member doc

Upload new document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
let memberId = "memberId_example"; // String | member id
let docKey = new MyOhioAssemblyComPublicApi.MembershipDocKey(); // MembershipDocKey | member id
let docName = "docName_example"; // String | 
let docFile = "/path/to/file"; // File | 
apiInstance.memberDocsCreate(memberId, docKey, docName, docFile, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 
 **docName** | **String**|  | 
 **docFile** | **File**|  | 

### Return type

[**MemberDocsUpdateOne200Response**](MemberDocsUpdateOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## memberDocsDeleteOne

> MemberDocsDeleteOne200Response memberDocsDeleteOne(memberId, docKey)

Delete existing member doc

Delete document owned by member. This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
let memberId = "memberId_example"; // String | member id
let docKey = new MyOhioAssemblyComPublicApi.MembershipDocKey(); // MembershipDocKey | member id
apiInstance.memberDocsDeleteOne(memberId, docKey, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 

### Return type

[**MemberDocsDeleteOne200Response**](MemberDocsDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberDocsDownload

> File memberDocsDownload(memberDocId, signature)

Download one member doc

Returns file download.  This operation will check that memberdocId matches claim in signature JWT.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
let memberDocId = "memberDocId_example"; // String | member doc id
let signature = eyJhbGc.eyJle.9zZalsd23lsfj; // String | JWT signature
apiInstance.memberDocsDownload(memberDocId, signature, (error, data, response) => {
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
 **memberDocId** | **String**| member doc id | 
 **signature** | **String**| JWT signature | 

### Return type

**File**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: image/png, application/pdf, application/json


## memberDocsGet

> MemberDocsGet200Response memberDocsGet(memberId)

Get member docs

Gets data on all member docs.  This operation is restricted to currently auth member&#39;s memberId unless role is elevated

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
let memberId = "memberId_example"; // String | member id
apiInstance.memberDocsGet(memberId, (error, data, response) => {
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

[**MemberDocsGet200Response**](MemberDocsGet200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberDocsNameUpdateOne

> MemberDocsUpdateOne200Response memberDocsNameUpdateOne(memberId, docKey, docName)

Update existing member doc name

Update name of document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
let memberId = "memberId_example"; // String | member id
let docKey = new MyOhioAssemblyComPublicApi.MembershipDocKey(); // MembershipDocKey | member id
let docName = "docName_example"; // String | 
apiInstance.memberDocsNameUpdateOne(memberId, docKey, docName, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 
 **docName** | **String**|  | 

### Return type

[**MemberDocsUpdateOne200Response**](MemberDocsUpdateOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json


## memberDocsUpdateOne

> MemberDocsUpdateOne200Response memberDocsUpdateOne(memberId, docKey, docName, docFile)

Update existing member doc

Upload new member document.  This operation will create a new document associated with docKey and original doc will be archived.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.DocsApi();
let memberId = "memberId_example"; // String | member id
let docKey = new MyOhioAssemblyComPublicApi.MembershipDocKey(); // MembershipDocKey | member id
let docName = "docName_example"; // String | 
let docFile = "/path/to/file"; // File | 
apiInstance.memberDocsUpdateOne(memberId, docKey, docName, docFile, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 
 **docName** | **String**|  | 
 **docFile** | **File**|  | 

### Return type

[**MemberDocsUpdateOne200Response**](MemberDocsUpdateOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: multipart/form-data
- **Accept**: application/json

