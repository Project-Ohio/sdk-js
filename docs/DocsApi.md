# MyOhioAssemblycomPublicApi.DocsApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**credentialCardsGetOne**](DocsApi.md#credentialCardsGetOne) | **GET** /credentialCards/{masterRecordNumber} | Get public credential card
[**memberDocsCreate**](DocsApi.md#memberDocsCreate) | **POST** /members/{memberId}/docs/{docKey} | Create new member doc
[**memberDocsDeleteOne**](DocsApi.md#memberDocsDeleteOne) | **DELETE** /members/{memberId}/docs/{docKey} | Delete existing member doc
[**memberDocsDownload**](DocsApi.md#memberDocsDownload) | **GET** /memberDocs/{memberDocId}/download | Download one member doc
[**memberDocsGet**](DocsApi.md#memberDocsGet) | **GET** /members/{memberId}/docs | Get member docs
[**memberDocsNameUpdateOne**](DocsApi.md#memberDocsNameUpdateOne) | **PUT** /members/{memberId}/docs/{docKey}/name | Update existing member doc name
[**memberDocsUpdateOne**](DocsApi.md#memberDocsUpdateOne) | **PUT** /members/{memberId}/docs/{docKey} | Update existing member doc

<a name="credentialCardsGetOne"></a>
# **credentialCardsGetOne**
> InlineResponse20015 credentialCardsGetOne(masterRecordNumber)

Get public credential card

Get existing credential card unless expired or deleted.  This is a public operation.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';

let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
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

<a name="memberDocsCreate"></a>
# **memberDocsCreate**
> InlineResponse20013 memberDocsCreate(memberId, docKey, opts)

Create new member doc

Upload new document owned by member.  This operation will fail if a document already exists with same owner and file name.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let docKey = new MyOhioAssemblycomPublicApi.MembershipDocKey(); // MembershipDocKey | member id
let opts = { 
  'docName': "docName_example", // String | 
  'docFile': "docFile_example" // Blob | 
};
apiInstance.memberDocsCreate(memberId, docKey, opts, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 
 **docName** | **String**|  | [optional] 
 **docFile** | **Blob**|  | [optional] 

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="memberDocsDeleteOne"></a>
# **memberDocsDeleteOne**
> InlineResponse20014 memberDocsDeleteOne(memberId, docKey)

Delete existing member doc

Delete document owned by member. This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let docKey = new MyOhioAssemblycomPublicApi.MembershipDocKey(); // MembershipDocKey | member id

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
 **memberId** | [**String**](.md)| member id | 
 **docKey** | [**MembershipDocKey**](.md)| member id | 

### Return type

[**InlineResponse20014**](InlineResponse20014.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberDocsDownload"></a>
# **memberDocsDownload**
> &#x27;Blob&#x27; memberDocsDownload(memberDocId, signature)

Download one member doc

Returns file download.  This operation will check that memberdocId matches claim in signature JWT.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';

let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
let memberDocId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member doc id
let signature = "signature_example"; // String | JWT signature

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
 **memberDocId** | [**String**](.md)| member doc id | 
 **signature** | **String**| JWT signature | 

### Return type

**&#x27;Blob&#x27;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: image/png, application/pdf, application/json

<a name="memberDocsGet"></a>
# **memberDocsGet**
> InlineResponse20012 memberDocsGet(memberId)

Get member docs

Gets data on all member docs.  This operation is restricted to currently auth member&#x27;s memberId unless role is elevated

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id

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
 **memberId** | [**String**](.md)| member id | 

### Return type

[**InlineResponse20012**](InlineResponse20012.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberDocsNameUpdateOne"></a>
# **memberDocsNameUpdateOne**
> InlineResponse20013 memberDocsNameUpdateOne(memberId, docKey, opts)

Update existing member doc name

Update name of document owned by member.  This operation will not modify the document contents.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let docKey = new MyOhioAssemblycomPublicApi.MembershipDocKey(); // MembershipDocKey | member id
let opts = { 
  'docName': "docName_example" // String | 
};
apiInstance.memberDocsNameUpdateOne(memberId, docKey, opts, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 
 **docName** | **String**|  | [optional] 

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

<a name="memberDocsUpdateOne"></a>
# **memberDocsUpdateOne**
> InlineResponse20013 memberDocsUpdateOne(memberId, docKey, opts)

Update existing member doc

Upload new member document.  This operation will create a new document associated with docKey and original doc will be archived.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.DocsApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let docKey = new MyOhioAssemblycomPublicApi.MembershipDocKey(); // MembershipDocKey | member id
let opts = { 
  'docName': "docName_example", // String | 
  'docFile': "docFile_example" // Blob | 
};
apiInstance.memberDocsUpdateOne(memberId, docKey, opts, (error, data, response) => {
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
 **docKey** | [**MembershipDocKey**](.md)| member id | 
 **docName** | **String**|  | [optional] 
 **docFile** | **Blob**|  | [optional] 

### Return type

[**InlineResponse20013**](InlineResponse20013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json

