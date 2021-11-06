import {
  PRODUCT_BY_BRAND_FAIL,
  PRODUCT_BY_BRAND_REQUEST,
  PRODUCT_BY_BRAND_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  RESET_PRODUCT_TYPE,
} from "../constants/Product";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
};

const product = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.productList,
        type: action.type,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case PRODUCT_BY_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.productList,
        type: action.type,
      };
    case PRODUCT_BY_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case PRODUCT_BY_BRAND_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case PRODUCT_BY_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.productList,
        type: action.type,
      };
    case PRODUCT_BY_BRAND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        productDetails: action.productDetails,
        type: action.type,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case RESET_PRODUCT_TYPE:
      return {
        ...state,
        type: null,
      };
    default:
      return state;
  }
};

export default product;
