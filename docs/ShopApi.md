# MyOhioAssemblycomPublicApi.ShopApi

All URIs are relative to *http://localhost:{hostPort}/{apiVersion}*

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

<a name="memberOrderDeleteOne"></a>
# **memberOrderDeleteOne**
> InlineResponse20019 memberOrderDeleteOne(memberId, orderId)

Delete order

Delete order.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 

### Return type

[**InlineResponse20019**](InlineResponse20019.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrderItemsQuantityUpdateOne"></a>
# **memberOrderItemsQuantityUpdateOne**
> InlineResponse2013 memberOrderItemsQuantityUpdateOne(memberId, orderId, itemId, quantity)

Update order item quantity

Update order item.  This operation results in adding an item if not already added.  This operation results in removing an item if quantity is zero.  This operation is restricted to auth member id and elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let itemId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | item id
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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **itemId** | [**String**](.md)| item id | 
 **quantity** | **Number**| item quantity | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrderItemsUpdateOne"></a>
# **memberOrderItemsUpdateOne**
> InlineResponse2013 memberOrderItemsUpdateOne(memberId, orderId, itemId, opts)

Update order item

Update order item.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let itemId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | item id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.ItemsItemIdBody1() // ItemsItemIdBody1 | 
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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **itemId** | [**String**](.md)| item id | 
 **body** | [**ItemsItemIdBody1**](ItemsItemIdBody1.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="memberOrderPaymentList"></a>
# **memberOrderPaymentList**
> InlineResponse20020 memberOrderPaymentList(opts)

List order payments

Return all payments.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
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

[**InlineResponse20020**](InlineResponse20020.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrderPaymentsCreate"></a>
# **memberOrderPaymentsCreate**
> InlineResponse2013 memberOrderPaymentsCreate(memberId, orderId, opts)

Create order payment

Create payment associated with SUBMITTED order.  Will only be successful if order is in SUBMITTED status.  The methodCardLast4 is required if method is CARD.  This operation is restricted to auth member id and elevated roles

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.OrderIdPaymentsBody() // OrderIdPaymentsBody | 
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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **body** | [**OrderIdPaymentsBody**](OrderIdPaymentsBody.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="memberOrderPaymentsDeleteOne"></a>
# **memberOrderPaymentsDeleteOne**
> InlineResponse20021 memberOrderPaymentsDeleteOne(memberId, orderId, paymentId)

Delete order payment

Deletes existing non-deleted member.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let paymentId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | payment id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **paymentId** | [**String**](.md)| payment id | 

### Return type

[**InlineResponse20021**](InlineResponse20021.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrderPaymentsUpdateOneCancel"></a>
# **memberOrderPaymentsUpdateOneCancel**
> InlineResponse2013 memberOrderPaymentsUpdateOneCancel(memberId, orderId, paymentId)

Cancel order payment

Update status of payment associated with order to CANCELLED.  This operation will only be successful if payment status is already PENDING.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let paymentId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | payment id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **paymentId** | [**String**](.md)| payment id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrderPaymentsUpdateOneComplete"></a>
# **memberOrderPaymentsUpdateOneComplete**
> InlineResponse2013 memberOrderPaymentsUpdateOneComplete(memberId, orderId, paymentId)

Complete order payment

Update status of payment associated with order to COMPLETE.  This operation will only be successful if payment status is already PENDING.  This operation will also change the associated order status to PAID.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let paymentId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | payment id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **paymentId** | [**String**](.md)| payment id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrderPaymentsUpdateOneRefund"></a>
# **memberOrderPaymentsUpdateOneRefund**
> InlineResponse2013 memberOrderPaymentsUpdateOneRefund(memberId, orderId, paymentId)

Refund order payment

Update status of payment associated with order to REFUNDED.  This operation will only be successful if payment status is already COMPLETE.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let paymentId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | payment id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **paymentId** | [**String**](.md)| payment id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrdersCreate"></a>
# **memberOrdersCreate**
> InlineResponse2013 memberOrdersCreate(memberId)

Create new order

Create new order owned by memberId.  This operation is restricted to auth member&#x27;s memberId unless role is elevated.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id

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
 **memberId** | [**String**](.md)| member id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrdersList"></a>
# **memberOrdersList**
> InlineResponse20018 memberOrdersList(memberId, opts)

List member orders

Returns all member orders.  This operation is restricted to auth memberId or elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
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
 **memberId** | [**String**](.md)| member id | 
 **includeDeleted** | **Boolean**|  | [optional] 

### Return type

[**InlineResponse20018**](InlineResponse20018.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrdersUpdateOne"></a>
# **memberOrdersUpdateOne**
> InlineResponse2013 memberOrdersUpdateOne(memberId, orderId, opts)

Update member order

Update order owned by memberId.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.OrdersOrderIdBody() // OrdersOrderIdBody | 
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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 
 **body** | [**OrdersOrderIdBody**](OrdersOrderIdBody.md)|  | [optional] 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="memberOrdersUpdateOneCancel"></a>
# **memberOrdersUpdateOneCancel**
> InlineResponse2013 memberOrdersUpdateOneCancel(memberId, orderId)

Cancel order

Cancels order, changing order status to CANCELLED.  This operation is allowed unless order is in CLOSED or CONFIRMED status.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrdersUpdateOneConfirm"></a>
# **memberOrdersUpdateOneConfirm**
> InlineResponse2013 memberOrdersUpdateOneConfirm(memberId, orderId)

Confirm paid order

Confirms order, creating purchase items and changing order status to CONFIRMED.  This operation is only allowed if order is in PAID status.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberOrdersUpdateOneSubmit"></a>
# **memberOrdersUpdateOneSubmit**
> InlineResponse2013 memberOrdersUpdateOneSubmit(memberId, orderId)

Submit paid order

Submits order, freezing order items (cart) and changing order status to SUBMITTED.  This operation is only allowed if order is in OPEN status.  This operation is restricted to auth member id and elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let orderId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | order id

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
 **memberId** | [**String**](.md)| member id | 
 **orderId** | [**String**](.md)| order id | 

### Return type

[**InlineResponse2013**](InlineResponse2013.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberPurchaseItemsFulfillmentStatusUpdateOne"></a>
# **memberPurchaseItemsFulfillmentStatusUpdateOne**
> InlineResponse20023 memberPurchaseItemsFulfillmentStatusUpdateOne(memberId, purchaseItemId, opts)

Update one member purchase item, update fulfillment status

Updates fulfillment status on specified member purchase item.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let purchaseItemId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | purchase item id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.PurchaseItemIdFulfillmentStatusBody() // PurchaseItemIdFulfillmentStatusBody | 
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
 **memberId** | [**String**](.md)| member id | 
 **purchaseItemId** | [**String**](.md)| purchase item id | 
 **body** | [**PurchaseItemIdFulfillmentStatusBody**](PurchaseItemIdFulfillmentStatusBody.md)|  | [optional] 

### Return type

[**InlineResponse20023**](InlineResponse20023.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="memberPurchaseItemsList"></a>
# **memberPurchaseItemsList**
> InlineResponse20022 memberPurchaseItemsList(memberId, opts)

List member purchase items

Returns all member purchase items.  If param filterStatus is provided the results will be filtered by given status.  This operation is restricted to auth memberId or elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let opts = { 
  'filterStatus': new MyOhioAssemblycomPublicApi.ShopPurchaseItemFulfillmentStatus(), // ShopPurchaseItemFulfillmentStatus | member id
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
 **memberId** | [**String**](.md)| member id | 
 **filterStatus** | [**ShopPurchaseItemFulfillmentStatus**](.md)| member id | [optional] 
 **includeDeleted** | **Boolean**|  | [optional] 

### Return type

[**InlineResponse20022**](InlineResponse20022.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="memberPurchaseItemsUpdateOne"></a>
# **memberPurchaseItemsUpdateOne**
> InlineResponse20023 memberPurchaseItemsUpdateOne(memberId, purchaseItemId, opts)

Update one member purchase item

Updates specified member purchase item.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let memberId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | member id
let purchaseItemId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | purchase item id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.PurchaseItemsPurchaseItemIdBody() // PurchaseItemsPurchaseItemIdBody | 
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
 **memberId** | [**String**](.md)| member id | 
 **purchaseItemId** | [**String**](.md)| purchase item id | 
 **body** | [**PurchaseItemsPurchaseItemIdBody**](PurchaseItemsPurchaseItemIdBody.md)|  | [optional] 

### Return type

[**InlineResponse20023**](InlineResponse20023.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="shopItemsCreate"></a>
# **shopItemsCreate**
> InlineResponse2012 shopItemsCreate(opts)

Create shop item

Create shop item.  This operation is restricted to elevated roles.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.ShopItemsBody() // ShopItemsBody | 
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
 **body** | [**ShopItemsBody**](ShopItemsBody.md)|  | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="shopItemsDeleteOne"></a>
# **shopItemsDeleteOne**
> InlineResponse20017 shopItemsDeleteOne(itemId)

Delete shop item

Delete shop item.  This operation is restricted to users with elevated role.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let itemId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | item id

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
 **itemId** | [**String**](.md)| item id | 

### Return type

[**InlineResponse20017**](InlineResponse20017.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="shopItemsList"></a>
# **shopItemsList**
> InlineResponse20016 shopItemsList(opts)

List shop items

Returns all items available via shop.  This operation is restricted to elevated roles

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
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

[**InlineResponse20016**](InlineResponse20016.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="shopItemsUpdateOne"></a>
# **shopItemsUpdateOne**
> InlineResponse2012 shopItemsUpdateOne(itemId, opts)

Update shop item

Update shop item.  This operation is restricted to users with elevated role.

### Example
```javascript
import {MyOhioAssemblycomPublicApi} from 'my_ohio_assemblycom_public_api';
let defaultClient = MyOhioAssemblycomPublicApi.ApiClient.instance;


let apiInstance = new MyOhioAssemblycomPublicApi.ShopApi();
let itemId = "38400000-8cf0-11bd-b23e-10b96e4ef00d"; // String | item id
let opts = { 
  'body': new MyOhioAssemblycomPublicApi.ItemsItemIdBody() // ItemsItemIdBody | 
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
 **itemId** | [**String**](.md)| item id | 
 **body** | [**ItemsItemIdBody**](ItemsItemIdBody.md)|  | [optional] 

### Return type

[**InlineResponse2012**](InlineResponse2012.md)

### Authorization

[bearerTokenAuth](../README.md#bearerTokenAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

