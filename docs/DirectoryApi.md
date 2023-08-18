# MyOhioAssemblyComPublicApi.DirectoryApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**directoryListingsList**](DirectoryApi.md#directoryListingsList) | **GET** /directoryListings | Get directory listings based on filter



## directoryListingsList

> DirectoryListingsList200Response directoryListingsList(opts)

Get directory listings based on filter

Retrieve directory listings.  This operation is public.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';

let apiInstance = new MyOhioAssemblyComPublicApi.DirectoryApi();
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
 **filterRole** | **String**| only return members with minimum auth role specified | [optional] 

### Return type

[**DirectoryListingsList200Response**](DirectoryListingsList200Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

