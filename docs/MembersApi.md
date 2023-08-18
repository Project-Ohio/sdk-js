# MyOhioAssemblyComPublicApi.MembersApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberUpdate**](MembersApi.md#memberUpdate) | **PUT** /members/{memberId} | Update existing member
[**membersCreate**](MembersApi.md#membersCreate) | **POST** /members | Create new member
[**membersDeleteOne**](MembersApi.md#membersDeleteOne) | **DELETE** /members/{memberId} | Delete member
[**membersGetOne**](MembersApi.md#membersGetOne) | **GET** /members/{memberId} | Get one member
[**membersList**](MembersApi.md#membersList) | **GET** /members | List members
[**membershipSignup**](MembersApi.md#membershipSignup) | **POST** /memberships/signup | Create new member via public signup



## memberUpdate

> MembershipSignup201Response memberUpdate(memberId, opts)

Update existing member

Update member.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MembersApi();
let memberId = "memberId_example"; // String | member id
let opts = {
  'memberUpdateRequest': new MyOhioAssemblyComPublicApi.MemberUpdateRequest() // MemberUpdateRequest | 
};
apiInstance.memberUpdate(memberId, opts, (error, data, response) => {
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
 **memberUpdateRequest** | [**MemberUpdateRequest**](MemberUpdateRequest.md)|  | [optional] 

### Return type

[**MembershipSignup201Response**](MembershipSignup201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## membersCreate

> MembershipSignup201Response membersCreate(opts)

Create new member

Create new member (unverified)

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MembersApi();
let opts = {
  'membersCreateRequest': new MyOhioAssemblyComPublicApi.MembersCreateRequest() // MembersCreateRequest | 
};
apiInstance.membersCreate(opts, (error, data, response) => {
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
 **membersCreateRequest** | [**MembersCreateRequest**](MembersCreateRequest.md)|  | [optional] 

### Return type

[**MembershipSignup201Response**](MembershipSignup201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## membersDeleteOne

> MembersDeleteOne200Response membersDeleteOne(memberId)

Delete member

Deletes existing non-deleted member.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MembersApi();
let memberId = "memberId_example"; // String | member id
apiInstance.membersDeleteOne(memberId, (error, data, response) => {
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

[**MembersDeleteOne200Response**](MembersDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## membersGetOne

> MembershipSignup201Response membersGetOne(memberId)

Get one member

Retrieve member.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MembersApi();
let memberId = "memberId_example"; // String | member id
apiInstance.membersGetOne(memberId, (error, data, response) => {
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

[**MembershipSignup201Response**](MembershipSignup201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## membersList

> MembersList200Response membersList()

List members

Retrieve list of all members.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.MembersApi();
apiInstance.membersList((error, data, response) => {
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

[**MembersList200Response**](MembersList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## membershipSignup

> MembershipSignup201Response membershipSignup(opts)

Create new member via public signup

Create new member (unverified)

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';

let apiInstance = new MyOhioAssemblyComPublicApi.MembersApi();
let opts = {
  'membershipSignupRequest': new MyOhioAssemblyComPublicApi.MembershipSignupRequest() // MembershipSignupRequest | 
};
apiInstance.membershipSignup(opts, (error, data, response) => {
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
 **membershipSignupRequest** | [**MembershipSignupRequest**](MembershipSignupRequest.md)|  | [optional] 

### Return type

[**MembershipSignup201Response**](MembershipSignup201Response.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

