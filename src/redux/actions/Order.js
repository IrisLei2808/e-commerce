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

export const purchaseRequest = (userId, status) => {
  return {
    type: PURCHASE_REQUEST,
    userId,
    status,
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

export const resetOrderType = () => {
  return {
    type: RESET_ORDER_TYPE,
  };
};
