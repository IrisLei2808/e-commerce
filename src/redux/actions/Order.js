import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  RESET_ORDER_TYPE,
  PURCHASE_REQUEST,
  PURCHASE_FAIL,
  PURCHASE_SUCCESS,
  SELL_REQUEST,
  SELL_SUCCESS,
  SELL_FAIL,
  ACCEPT_ORDER_REQUEST,
  ACCEPT_ORDER_SUCCESS,
  ACCEPT_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  WAITING_DELIVERY_REQUEST,
  WAITING_DELIVERY_SUCCESS,
  WAITING_DELIVERY_FAIL,
  DELIVERY_REQUEST,
  DELIVERY_SUCCESS,
  DELIVERY_FAIL,
  DELIVERY_INFO_REQUEST,
  DELIVERY_INFO_SUCCESS,
  DELIVERY_INFO_FAIL,
  COUNT_PURCHASE,
  COUNT_PURCHASE_SUCCESS,
  COUNT_PURCHASE_FAIL,
  COUNT_SELL,
  COUNT_SELL_SUCCESS,
  COUNT_WAITING_DELIVERY,
  COUNT_WAITING_DELIVERY_SUCCESS,
  COUNT_WAITING_DELIVERY_FAIL,
  SELL_WAITING_DELIVERY,
  SELL_WAITING_DELIVERY_SUCCESS,
  SELL_WAITING_DELIVERY_FAIL,
  COUNT_SELL_WAITING_DELIVERY,
  COUNT_SELL_WAITING_DELIVERY_SUCCESS,
  COUNT_SELL_WAITING_DELIVERY_FAIL,
  COUNT_DELIVERY,
  COUNT_DELIVERY_SUCCESS,
  COUNT_DELIVERY_FAIL,
  SELL_DELIVERY_REQUEST,
  SELL_DELIVERY_SUCCESS,
  SELL_DELIVERY_FAIL,
  SELL_COUNT_DELIVERY,
  SELL_COUNT_DELIVERY_SUCCESS,
  SELL_COUNT_DELIVERY_FAIL,
} from "../constants/Order";

export const orderRequest = (data, jwtToken) => {
  return {
    type: ORDER_CREATE_REQUEST,
    data,
    jwtToken,
  };
};

export const orderRequestSuccess = (product) => {
  return {
    type: ORDER_CREATE_SUCCESS,
    product: product.data.result,
  };
};

export const orderRequestFail = (error) => {
  return {
    type: ORDER_CREATE_FAIL,
    error,
  };
};

export const purchaseRequest = (userId, status, params) => {
  return {
    type: PURCHASE_REQUEST,
    userId,
    status,
    params,
  };
};

export const purchaseRequestSuccess = (product) => {
  return {
    type: PURCHASE_SUCCESS,
    product: product.data,
  };
};

export const purchaseRequestFail = (error) => {
  return {
    type: PURCHASE_FAIL,
    error,
  };
};

export const countPurchase = (userId, status, params) => {
  return {
    type: COUNT_PURCHASE,
    userId,
    status,
    params,
  };
};

export const countPurchaseSuccess = (product) => {
  return {
    type: COUNT_PURCHASE_SUCCESS,
    product: product.data.Count,
  };
};

export const countPurchaseFail = (error) => {
  return {
    type: COUNT_PURCHASE_FAIL,
    error,
  };
};

export const waitingDeliveryRequest = (userId, status, params) => {
  return {
    type: WAITING_DELIVERY_REQUEST,
    userId,
    status,
    params,
  };
};

export const waitingDeliveryRequestSuccess = (product) => {
  return {
    type: WAITING_DELIVERY_SUCCESS,
    product: product.data,
  };
};

export const waitingDeliveryRequestFail = (error) => {
  return {
    type: WAITING_DELIVERY_FAIL,
    error,
  };
};

export const countWaitingDelivery = (userId, status) => {
  return {
    type: COUNT_WAITING_DELIVERY,
    userId,
    status,
  };
};

export const countWaitingDeliverySuccess = (product) => {
  return {
    type: COUNT_WAITING_DELIVERY_SUCCESS,
    product: product.data.Count,
  };
};

export const countWaitingDeliveryFail = (error) => {
  return {
    type: COUNT_WAITING_DELIVERY_FAIL,
    error,
  };
};

export const deliveryRequest = (userId, status, params) => {
  return {
    type: DELIVERY_REQUEST,
    userId,
    status,
    params,
  };
};

export const deliveryRequestSuccess = (product) => {
  return {
    type: DELIVERY_SUCCESS,
    product: product.data,
  };
};

export const deliveryRequestFail = (error) => {
  return {
    type: DELIVERY_FAIL,
    error,
  };
};

export const countDelivery = (userId, status) => {
  return {
    type: COUNT_DELIVERY,
    userId,
    status,
  };
};

export const countDeliverySuccess = (product) => {
  return {
    type: COUNT_DELIVERY_SUCCESS,
    product: product.data.Count,
  };
};

export const countDeliveryFail = (error) => {
  return {
    type: COUNT_DELIVERY_FAIL,
    error,
  };
};

export const sellDelivery = (userId, status, params) => {
  return {
    type: SELL_DELIVERY_REQUEST,
    userId,
    status,
    params,
  };
};

export const sellDeliverySuccess = (product) => {
  return {
    type: SELL_DELIVERY_SUCCESS,
    product: product.data,
  };
};

export const sellDeliveryFail = (error) => {
  return {
    type: SELL_DELIVERY_FAIL,
    error,
  };
};

export const sellCountDelivery = (userId, status) => {
  return {
    type: SELL_COUNT_DELIVERY,
    userId,
    status,
  };
};

export const sellCountDeliverySuccess = (product) => {
  return {
    type: SELL_COUNT_DELIVERY_SUCCESS,
    product: product.data.Count,
  };
};

export const sellCountDeliveryFail = (error) => {
  return {
    type: SELL_COUNT_DELIVERY_FAIL,
    error,
  };
};

export const deliveryInfoRequest = (userId, status) => {
  return {
    type: DELIVERY_INFO_REQUEST,
    userId,
    status,
  };
};

export const deliveryInfoRequestSuccess = (product) => {
  return {
    type: DELIVERY_INFO_SUCCESS,
    product: product.data,
  };
};

export const deliveryInfoRequestFail = (error) => {
  return {
    type: DELIVERY_INFO_FAIL,
    error,
  };
};

export const sellRequest = (userId, status, params) => {
  return {
    type: SELL_REQUEST,
    userId,
    status,
    params,
  };
};

export const sellRequestSuccess = (product) => {
  return {
    type: SELL_SUCCESS,
    product: product.data,
  };
};

export const sellRequestFail = (error) => {
  return {
    type: SELL_FAIL,
    error,
  };
};

export const countSell = (userId, status, params) => {
  return {
    type: COUNT_SELL,
    userId,
    status,
    params,
  };
};

export const countSellSuccess = (product) => {
  return {
    type: COUNT_SELL_SUCCESS,
    product: product.data.Count,
  };
};

export const countSellFail = (error) => {
  return {
    type: COUNT_PURCHASE_FAIL,
    error,
  };
};

export const sellWaitingDeliveryRequest = (userId, status, params) => {
  return {
    type: SELL_WAITING_DELIVERY,
    userId,
    status,
    params,
  };
};

export const sellWaitingDeliverySuccess = (product) => {
  return {
    type: SELL_WAITING_DELIVERY_SUCCESS,
    product: product.data,
  };
};

export const sellWaitingDeliveryFail = (error) => {
  return {
    type: SELL_WAITING_DELIVERY_FAIL,
    error,
  };
};

export const countSellWaitingDelivery = (userId, status, params) => {
  return {
    type: COUNT_SELL_WAITING_DELIVERY,
    userId,
    status,
    params,
  };
};

export const countSellWaitingDeliverySuccess = (product) => {
  return {
    type: COUNT_SELL_WAITING_DELIVERY_SUCCESS,
    product: product.data.Count,
  };
};

export const countSellWaitingDeliveryFail = (error) => {
  return {
    type: COUNT_SELL_WAITING_DELIVERY_FAIL,
    error,
  };
};

export const acceptOrder = (idOrderDetail) => {
  return {
    type: ACCEPT_ORDER_REQUEST,
    idOrderDetail,
  };
};

export const acceptOrderSuccess = (product) => {
  return {
    type: ACCEPT_ORDER_SUCCESS,
    product: product.data,
  };
};

export const acceptOrderFail = (error) => {
  return {
    type: ACCEPT_ORDER_FAIL,
    error,
  };
};

export const cancelOrder = (idOrderDetail) => {
  return {
    type: CANCEL_ORDER_REQUEST,
    idOrderDetail,
  };
};

export const cancelOrderSuccess = (product) => {
  return {
    type: CANCEL_ORDER_SUCCESS,
    product: product.data,
  };
};

export const cancelOrderFail = (error) => {
  return {
    type: CANCEL_ORDER_FAIL,
    error,
  };
};

export const resetOrderType = () => {
  return {
    type: RESET_ORDER_TYPE,
  };
};
