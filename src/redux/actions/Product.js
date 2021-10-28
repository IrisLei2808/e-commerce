import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/Product";

export const fetchProductList = (params) => {
  return {
    type: PRODUCT_LIST_REQUEST,
    params,
  };
};
export const fetchProductListSuccess = (payload) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    contractType: payload.data.data,
  };
};

export const fetchProductListFailed = (message) => {
  return {
    type: PRODUCT_LIST_FAIL,
    message,
  };
};
