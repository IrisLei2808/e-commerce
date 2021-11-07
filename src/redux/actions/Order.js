import { PRODUCT_LIST_REQUEST, RESET_ORDER_TYPE } from "../constants/Order";

export const fetchProductList = (params) => {
  return {
    type: PRODUCT_LIST_REQUEST,
    params,
  };
};

export const resetProductType = () => {
  return {
    type: RESET_ORDER_TYPE,
  };
};
