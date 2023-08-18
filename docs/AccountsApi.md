# MyOhioAssemblycomPublicApi.AccountsApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**accountsDeleteOne**](AccountsApi.md#accountsDeleteOne) | **DELETE** /accounts/{accountId} | Delete one account
[**accountsList**](AccountsApi.md#accountsList) | **GET** /accounts | List all accounts

<a name="accountsDeleteOne"></a>
# **accountsDeleteOne**
> InlineResponse20025 accountsDeleteOne(accountId)

Delete one account

Delete one account.  This operation is restricted to administrators

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.AccountsApi();
let accountId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | account id

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
 **accountId** | [**String**](.md)| account id | 

### Return type

[**InlineResponse20025**](InlineResponse20025.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="accountsList"></a>
# **accountsList**
> InlineResponse20024 accountsList()

List all accounts

List all accounts except any sensitive auth data and member data.  This operation is restricted to administrators

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.AccountsApi();
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

[**InlineResponse20024**](InlineResponse20024.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

