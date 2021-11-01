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
export const fetchProductListSuccess = (product) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    productList: product.data,
  };
};

export const fetchProductListFailed = (message) => {
  return {
    type: PRODUCT_LIST_FAIL,
    message,
  };
};
