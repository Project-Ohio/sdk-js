# MyOhioAssemblycomPublicApi.MembersApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberUpdate**](MembersApi.md#memberUpdate) | **PUT** /members/{memberId} | Update existing member
[**membersCreate**](MembersApi.md#membersCreate) | **POST** /members | Create new member
[**membersDeleteOne**](MembersApi.md#membersDeleteOne) | **DELETE** /members/{memberId} | Delete member
[**membersGetOne**](MembersApi.md#membersGetOne) | **GET** /members/{memberId} | Get one member
[**membersList**](MembersApi.md#membersList) | **GET** /members | List members
[**membershipSignup**](MembersApi.md#membershipSignup) | **POST** /memberships/signup | Create new member via public signup

<a name="memberUpdate"></a>
# **memberUpdate**
> InlineResponse201 memberUpdate(memberId, opts)

Update existing member

Update member.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MembersApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.MembersMemberIdBody() // MembersMemberIdBody | 
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
 **memberId** | [**String**](.md)| member id | 
 **body** | [**MembersMemberIdBody**](MembersMemberIdBody.md)|  | [optional] 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="membersCreate"></a>
# **membersCreate**
> InlineResponse201 membersCreate(opts)

Create new member

Create new member (unverified)

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MembersApi();
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.MembersBody() // MembersBody | 
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
 **body** | [**MembersBody**](MembersBody.md)|  | [optional] 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="membersDeleteOne"></a>
# **membersDeleteOne**
> InlineResponse2007 membersDeleteOne(memberId)

Delete member

Deletes existing non-deleted member.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MembersApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id

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
 **memberId** | [**String**](.md)| member id | 

### Return type

[**InlineResponse2007**](InlineResponse2007.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="membersGetOne"></a>
# **membersGetOne**
> InlineResponse201 membersGetOne(memberId)

Get one member

Retrieve member.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MembersApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id

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
 **memberId** | [**String**](.md)| member id | 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="membersList"></a>
# **membersList**
> InlineResponse2006 membersList()

List members

Retrieve list of all members.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.MembersApi();
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

[**InlineResponse2006**](InlineResponse2006.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="membershipSignup"></a>
# **membershipSignup**
> InlineResponse201 membershipSignup(opts)

Create new member via public signup

Create new member (unverified)

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';

let apiInstance = new MyOhioAssemblycomPublicApi.MembersApi();
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.MembershipsSignupBody() // MembershipsSignupBody | 
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
 **body** | [**MembershipsSignupBody**](MembershipsSignupBody.md)|  | [optional] 

### Return type

[**InlineResponse201**](InlineResponse201.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

