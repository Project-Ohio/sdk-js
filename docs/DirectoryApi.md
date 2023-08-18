# MyOhioAssemblycomPublicApi.DirectoryApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**directoryListingsList**](DirectoryApi.md#directoryListingsList) | **GET** /directoryListings | Get directory listings based on filter

<a name="directoryListingsList"></a>
# **directoryListingsList**
> InlineResponse2005 directoryListingsList(opts)

Get directory listings based on filter

Retrieve directory listings.  This operation is public.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';

let apiInstance = new MyOhioAssemblycomPublicApi.DirectoryApi();
let opts = { 
  'filterRole': "filterRole_example" // String | only return members with minimum auth role specified
};
apiInstance.directoryListingsList(opts, (error, data, response) => {
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
 **filterRole** | [**String**](.md)| only return members with minimum auth role specified | [optional] 

### Return type

[**InlineResponse2005**](InlineResponse2005.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

