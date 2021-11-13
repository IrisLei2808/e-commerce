import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  RESET_ORDER_TYPE,
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

export const resetOrderType = () => {
  return {
    type: RESET_ORDER_TYPE,
  };
};
