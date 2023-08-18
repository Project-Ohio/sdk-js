# MyOhioAssemblyComPublicApi.ShopApi

All URIs are relative to *http://localhost:8101/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**memberOrderDeleteOne**](ShopApi.md#memberOrderDeleteOne) | **DELETE** /members/{memberId}/orders/{orderId} | Delete order
[**memberOrderItemsQuantityUpdateOne**](ShopApi.md#memberOrderItemsQuantityUpdateOne) | **PUT** /members/{memberId}/orders/{orderId}/items/{itemId}/quantity/{quantity} | Update order item quantity
[**memberOrderItemsUpdateOne**](ShopApi.md#memberOrderItemsUpdateOne) | **PUT** /members/{memberId}/orders/{orderId}/items/{itemId} | Update order item
[**memberOrderPaymentList**](ShopApi.md#memberOrderPaymentList) | **GET** /members/orders/payments | List order payments
[**memberOrderPaymentsCreate**](ShopApi.md#memberOrderPaymentsCreate) | **POST** /members/{memberId}/orders/{orderId}/payments | Create order payment
[**memberOrderPaymentsDeleteOne**](ShopApi.md#memberOrderPaymentsDeleteOne) | **DELETE** /members/{memberId}/orders/{orderId}/payments/{paymentId} | Delete order payment
[**memberOrderPaymentsUpdateOneCancel**](ShopApi.md#memberOrderPaymentsUpdateOneCancel) | **PUT** /members/{memberId}/orders/{orderId}/payments/{paymentId}/cancel | Cancel order payment
[**memberOrderPaymentsUpdateOneComplete**](ShopApi.md#memberOrderPaymentsUpdateOneComplete) | **PUT** /members/{memberId}/orders/{orderId}/payments/{paymentId}/complete | Complete order payment
[**memberOrderPaymentsUpdateOneRefund**](ShopApi.md#memberOrderPaymentsUpdateOneRefund) | **PUT** /members/{memberId}/orders/{orderId}/payments/{paymentId}/refund | Refund order payment
[**memberOrdersCreate**](ShopApi.md#memberOrdersCreate) | **POST** /members/{memberId}/orders | Create new order
[**memberOrdersList**](ShopApi.md#memberOrdersList) | **GET** /members/{memberId}/orders | List member orders
[**memberOrdersUpdateOne**](ShopApi.md#memberOrdersUpdateOne) | **PUT** /members/{memberId}/orders/{orderId} | Update member order
[**memberOrdersUpdateOneCancel**](ShopApi.md#memberOrdersUpdateOneCancel) | **PUT** /members/{memberId}/orders/{orderId}/cancel | Cancel order
[**memberOrdersUpdateOneConfirm**](ShopApi.md#memberOrdersUpdateOneConfirm) | **PUT** /members/{memberId}/orders/{orderId}/confirm | Confirm paid order
[**memberOrdersUpdateOneSubmit**](ShopApi.md#memberOrdersUpdateOneSubmit) | **PUT** /members/{memberId}/orders/{orderId}/submit | Submit paid order
[**memberPurchaseItemsFulfillmentStatusUpdateOne**](ShopApi.md#memberPurchaseItemsFulfillmentStatusUpdateOne) | **PUT** /members/{memberId}/purchaseItems/{purchaseItemId}/fulfillmentStatus | Update one member purchase item, update fulfillment status
[**memberPurchaseItemsList**](ShopApi.md#memberPurchaseItemsList) | **GET** /members/{memberId}/purchaseItems | List member purchase items
[**memberPurchaseItemsUpdateOne**](ShopApi.md#memberPurchaseItemsUpdateOne) | **PUT** /members/{memberId}/purchaseItems/{purchaseItemId} | Update one member purchase item
[**shopItemsCreate**](ShopApi.md#shopItemsCreate) | **POST** /shop/items | Create shop item
[**shopItemsDeleteOne**](ShopApi.md#shopItemsDeleteOne) | **DELETE** /shop/items/{itemId} | Delete shop item
[**shopItemsList**](ShopApi.md#shopItemsList) | **GET** /shop/items | List shop items
[**shopItemsUpdateOne**](ShopApi.md#shopItemsUpdateOne) | **PUT** /shop/items/{itemId} | Update shop item



## memberOrderDeleteOne

> MemberOrderDeleteOne200Response memberOrderDeleteOne(memberId, orderId)

Delete order

Delete order.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
apiInstance.memberOrderDeleteOne(memberId, orderId, (error, data, response) => {
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
 **orderId** | **String**| order id | 

### Return type

[**MemberOrderDeleteOne200Response**](MemberOrderDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrderItemsQuantityUpdateOne

> MemberOrdersCreate201Response memberOrderItemsQuantityUpdateOne(memberId, orderId, itemId, quantity)

Update order item quantity

Update order item.  This operation results in adding an item if not already added.  This operation results in removing an item if quantity is zero.  This operation is restricted to auth member id and elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let itemId = "itemId_example"; // String | item id
let quantity = 56; // Number | item quantity
apiInstance.memberOrderItemsQuantityUpdateOne(memberId, orderId, itemId, quantity, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **itemId** | **String**| item id | 
 **quantity** | **Number**| item quantity | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrderItemsUpdateOne

> MemberOrdersCreate201Response memberOrderItemsUpdateOne(memberId, orderId, itemId, opts)

Update order item

Update order item.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let itemId = "itemId_example"; // String | item id
let opts = {
  'memberOrderItemsUpdateOneRequest': new MyOhioAssemblyComPublicApi.MemberOrderItemsUpdateOneRequest() // MemberOrderItemsUpdateOneRequest | 
};
apiInstance.memberOrderItemsUpdateOne(memberId, orderId, itemId, opts, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **itemId** | **String**| item id | 
 **memberOrderItemsUpdateOneRequest** | [**MemberOrderItemsUpdateOneRequest**](MemberOrderItemsUpdateOneRequest.md)|  | [optional] 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## memberOrderPaymentList

> MemberOrderPaymentList200Response memberOrderPaymentList(opts)

List order payments

Return all payments.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let opts = {
  'includeDeleted': true // Boolean | 
};
apiInstance.memberOrderPaymentList(opts, (error, data, response) => {
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
 **includeDeleted** | **Boolean**|  | [optional] 

### Return type

[**MemberOrderPaymentList200Response**](MemberOrderPaymentList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrderPaymentsCreate

> MemberOrdersCreate201Response memberOrderPaymentsCreate(memberId, orderId, opts)

Create order payment

Create payment associated with SUBMITTED order.  Will only be successful if order is in SUBMITTED status.  The methodCardLast4 is required if method is CARD.  This operation is restricted to auth member id and elevated roles

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let opts = {
  'memberOrderPaymentsCreateRequest': new MyOhioAssemblyComPublicApi.MemberOrderPaymentsCreateRequest() // MemberOrderPaymentsCreateRequest | 
};
apiInstance.memberOrderPaymentsCreate(memberId, orderId, opts, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **memberOrderPaymentsCreateRequest** | [**MemberOrderPaymentsCreateRequest**](MemberOrderPaymentsCreateRequest.md)|  | [optional] 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## memberOrderPaymentsDeleteOne

> MemberOrderPaymentsDeleteOne200Response memberOrderPaymentsDeleteOne(memberId, orderId, paymentId)

Delete order payment

Deletes existing non-deleted member.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let paymentId = "paymentId_example"; // String | payment id
apiInstance.memberOrderPaymentsDeleteOne(memberId, orderId, paymentId, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **paymentId** | **String**| payment id | 

### Return type

[**MemberOrderPaymentsDeleteOne200Response**](MemberOrderPaymentsDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrderPaymentsUpdateOneCancel

> MemberOrdersCreate201Response memberOrderPaymentsUpdateOneCancel(memberId, orderId, paymentId)

Cancel order payment

Update status of payment associated with order to CANCELLED.  This operation will only be successful if payment status is already PENDING.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let paymentId = "paymentId_example"; // String | payment id
apiInstance.memberOrderPaymentsUpdateOneCancel(memberId, orderId, paymentId, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **paymentId** | **String**| payment id | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrderPaymentsUpdateOneComplete

> MemberOrdersCreate201Response memberOrderPaymentsUpdateOneComplete(memberId, orderId, paymentId)

Complete order payment

Update status of payment associated with order to COMPLETE.  This operation will only be successful if payment status is already PENDING.  This operation will also change the associated order status to PAID.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let paymentId = "paymentId_example"; // String | payment id
apiInstance.memberOrderPaymentsUpdateOneComplete(memberId, orderId, paymentId, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **paymentId** | **String**| payment id | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrderPaymentsUpdateOneRefund

> MemberOrdersCreate201Response memberOrderPaymentsUpdateOneRefund(memberId, orderId, paymentId)

Refund order payment

Update status of payment associated with order to REFUNDED.  This operation will only be successful if payment status is already COMPLETE.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let paymentId = "paymentId_example"; // String | payment id
apiInstance.memberOrderPaymentsUpdateOneRefund(memberId, orderId, paymentId, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **paymentId** | **String**| payment id | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrdersCreate

> MemberOrdersCreate201Response memberOrdersCreate(memberId)

Create new order

Create new order owned by memberId.  This operation is restricted to auth member&#39;s memberId unless role is elevated.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
apiInstance.memberOrdersCreate(memberId, (error, data, response) => {
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

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrdersList

> MemberOrdersList200Response memberOrdersList(memberId, opts)

List member orders

Returns all member orders.  This operation is restricted to auth memberId or elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let opts = {
  'includeDeleted': true // Boolean | 
};
apiInstance.memberOrdersList(memberId, opts, (error, data, response) => {
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
 **includeDeleted** | **Boolean**|  | [optional] 

### Return type

[**MemberOrdersList200Response**](MemberOrdersList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrdersUpdateOne

> MemberOrdersCreate201Response memberOrdersUpdateOne(memberId, orderId, opts)

Update member order

Update order owned by memberId.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
let opts = {
  'memberOrdersUpdateOneRequest': new MyOhioAssemblyComPublicApi.MemberOrdersUpdateOneRequest() // MemberOrdersUpdateOneRequest | 
};
apiInstance.memberOrdersUpdateOne(memberId, orderId, opts, (error, data, response) => {
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
 **orderId** | **String**| order id | 
 **memberOrdersUpdateOneRequest** | [**MemberOrdersUpdateOneRequest**](MemberOrdersUpdateOneRequest.md)|  | [optional] 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## memberOrdersUpdateOneCancel

> MemberOrdersCreate201Response memberOrdersUpdateOneCancel(memberId, orderId)

Cancel order

Cancels order, changing order status to CANCELLED.  This operation is allowed unless order is in CLOSED or CONFIRMED status.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
apiInstance.memberOrdersUpdateOneCancel(memberId, orderId, (error, data, response) => {
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
 **orderId** | **String**| order id | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrdersUpdateOneConfirm

> MemberOrdersCreate201Response memberOrdersUpdateOneConfirm(memberId, orderId)

Confirm paid order

Confirms order, creating purchase items and changing order status to CONFIRMED.  This operation is only allowed if order is in PAID status.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
apiInstance.memberOrdersUpdateOneConfirm(memberId, orderId, (error, data, response) => {
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
 **orderId** | **String**| order id | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberOrdersUpdateOneSubmit

> MemberOrdersCreate201Response memberOrdersUpdateOneSubmit(memberId, orderId)

Submit paid order

Submits order, freezing order items (cart) and changing order status to SUBMITTED.  This operation is only allowed if order is in OPEN status.  This operation is restricted to auth member id and elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let orderId = "orderId_example"; // String | order id
apiInstance.memberOrdersUpdateOneSubmit(memberId, orderId, (error, data, response) => {
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
 **orderId** | **String**| order id | 

### Return type

[**MemberOrdersCreate201Response**](MemberOrdersCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberPurchaseItemsFulfillmentStatusUpdateOne

> MemberPurchaseItemsUpdateOne200Response memberPurchaseItemsFulfillmentStatusUpdateOne(memberId, purchaseItemId, opts)

Update one member purchase item, update fulfillment status

Updates fulfillment status on specified member purchase item.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let purchaseItemId = "purchaseItemId_example"; // String | purchase item id
let opts = {
  'memberPurchaseItemsFulfillmentStatusUpdateOneRequest': new MyOhioAssemblyComPublicApi.MemberPurchaseItemsFulfillmentStatusUpdateOneRequest() // MemberPurchaseItemsFulfillmentStatusUpdateOneRequest | 
};
apiInstance.memberPurchaseItemsFulfillmentStatusUpdateOne(memberId, purchaseItemId, opts, (error, data, response) => {
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
 **purchaseItemId** | **String**| purchase item id | 
 **memberPurchaseItemsFulfillmentStatusUpdateOneRequest** | [**MemberPurchaseItemsFulfillmentStatusUpdateOneRequest**](MemberPurchaseItemsFulfillmentStatusUpdateOneRequest.md)|  | [optional] 

### Return type

[**MemberPurchaseItemsUpdateOne200Response**](MemberPurchaseItemsUpdateOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## memberPurchaseItemsList

> MemberPurchaseItemsList200Response memberPurchaseItemsList(memberId, opts)

List member purchase items

Returns all member purchase items.  If param filterStatus is provided the results will be filtered by given status.  This operation is restricted to auth memberId or elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let opts = {
  'filterStatus': new MyOhioAssemblyComPublicApi.ShopPurchaseItemFulfillmentStatus(), // ShopPurchaseItemFulfillmentStatus | member id
  'includeDeleted': true // Boolean | 
};
apiInstance.memberPurchaseItemsList(memberId, opts, (error, data, response) => {
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
 **filterStatus** | [**ShopPurchaseItemFulfillmentStatus**](.md)| member id | [optional] 
 **includeDeleted** | **Boolean**|  | [optional] 

### Return type

[**MemberPurchaseItemsList200Response**](MemberPurchaseItemsList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## memberPurchaseItemsUpdateOne

> MemberPurchaseItemsUpdateOne200Response memberPurchaseItemsUpdateOne(memberId, purchaseItemId, opts)

Update one member purchase item

Updates specified member purchase item.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let memberId = "memberId_example"; // String | member id
let purchaseItemId = "purchaseItemId_example"; // String | purchase item id
let opts = {
  'memberPurchaseItemsUpdateOneRequest': new MyOhioAssemblyComPublicApi.MemberPurchaseItemsUpdateOneRequest() // MemberPurchaseItemsUpdateOneRequest | 
};
apiInstance.memberPurchaseItemsUpdateOne(memberId, purchaseItemId, opts, (error, data, response) => {
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
 **purchaseItemId** | **String**| purchase item id | 
 **memberPurchaseItemsUpdateOneRequest** | [**MemberPurchaseItemsUpdateOneRequest**](MemberPurchaseItemsUpdateOneRequest.md)|  | [optional] 

### Return type

[**MemberPurchaseItemsUpdateOne200Response**](MemberPurchaseItemsUpdateOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## shopItemsCreate

> ShopItemsCreate201Response shopItemsCreate(opts)

Create shop item

Create shop item.  This operation is restricted to elevated roles.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let opts = {
  'shopItemsCreateRequest': new MyOhioAssemblyComPublicApi.ShopItemsCreateRequest() // ShopItemsCreateRequest | 
};
apiInstance.shopItemsCreate(opts, (error, data, response) => {
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
 **shopItemsCreateRequest** | [**ShopItemsCreateRequest**](ShopItemsCreateRequest.md)|  | [optional] 

### Return type

[**ShopItemsCreate201Response**](ShopItemsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## shopItemsDeleteOne

> ShopItemsDeleteOne200Response shopItemsDeleteOne(itemId)

Delete shop item

Delete shop item.  This operation is restricted to users with elevated role.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let itemId = "itemId_example"; // String | item id
apiInstance.shopItemsDeleteOne(itemId, (error, data, response) => {
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
 **itemId** | **String**| item id | 

### Return type

[**ShopItemsDeleteOne200Response**](ShopItemsDeleteOne200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## shopItemsList

> ShopItemsList200Response shopItemsList(opts)

List shop items

Returns all items available via shop.  This operation is restricted to elevated roles

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let opts = {
  'includeDeleted': true // Boolean | 
};
apiInstance.shopItemsList(opts, (error, data, response) => {
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
 **includeDeleted** | **Boolean**|  | [optional] 

### Return type

[**ShopItemsList200Response**](ShopItemsList200Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## shopItemsUpdateOne

> ShopItemsCreate201Response shopItemsUpdateOne(itemId, opts)

Update shop item

Update shop item.  This operation is restricted to users with elevated role.

### Example

```javascript
import MyOhioAssemblyComPublicApi from 'my_ohio_assembly_com_public_api';
let defaultClient = MyOhioAssemblyComPublicApi.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerTokenAuth
let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
bearerTokenAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new MyOhioAssemblyComPublicApi.ShopApi();
let itemId = "itemId_example"; // String | item id
let opts = {
  'shopItemsUpdateOneRequest': new MyOhioAssemblyComPublicApi.ShopItemsUpdateOneRequest() // ShopItemsUpdateOneRequest | 
};
apiInstance.shopItemsUpdateOne(itemId, opts, (error, data, response) => {
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
 **itemId** | **String**| item id | 
 **shopItemsUpdateOneRequest** | [**ShopItemsUpdateOneRequest**](ShopItemsUpdateOneRequest.md)|  | [optional] 

### Return type

[**ShopItemsCreate201Response**](ShopItemsCreate201Response.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

