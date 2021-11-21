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

export const waitingDeliveryRequest = (userId, status) => {
  return {
    type: WAITING_DELIVERY_REQUEST,
    userId,
    status,
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

export const deliveryRequest = (userId, status) => {
  return {
    type: DELIVERY_REQUEST,
    userId,
    status,
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

export const sellRequest = (userId, status) => {
  return {
    type: SELL_REQUEST,
    userId,
    status,
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
