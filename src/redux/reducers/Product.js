import {
  ALL_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  CATEGORY_BY_BRAND_FAIL,
  CATEGORY_BY_BRAND_REQUEST,
  CATEGORY_BY_BRAND_SUCCESS,
  CATEGORY_NAME_FAIL,
  CATEGORY_NAME_REQUEST,
  CATEGORY_NAME_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  IMAGE_REMOVE_FAIL,
  IMAGE_REMOVE_REQUEST,
  IMAGE_REMOVE_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
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
    case ALL_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case ALL_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCategory: action.allCategory,
        type: action.type,
      };
    case ALL_CATEGORY_FAIL:
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
        brand: action.brand,
        type: action.type,
      };
    case PRODUCT_BY_BRAND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case CATEGORY_BY_BRAND_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case CATEGORY_BY_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryList: action.categoryList,
        type: action.type,
      };
    case CATEGORY_BY_BRAND_FAIL:
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
    case CATEGORY_NAME_REQUEST:
      return {
        ...state,
        isLoading: true,
        type: action.type,
      };
    case CATEGORY_NAME_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categoryName: action.categoryName,
        type: action.type,
      };
    case CATEGORY_NAME_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.message,
      };
    case IMAGE_UPLOAD_REQUEST: {
      return {
        ...state,
        type: action.type,
        loading: true,
      };
    }
    case IMAGE_UPLOAD_SUCCESS: {
      return {
        ...state,
        type: action.type,
        fileList: action.fileList,
        loading: false,
      };
    }
    case IMAGE_UPLOAD_FAIL: {
      return {
        ...state,
        loading: false,
        type: action.type,
      };
    }
    case IMAGE_REMOVE_REQUEST: {
      return {
        ...state,
        type: action.type,
        loading: true,
      };
    }
    case IMAGE_REMOVE_SUCCESS: {
      return {
        ...state,
        type: action.type,
        cloudinaryId: action.cloudinaryId,
        loading: false,
      };
    }
    case IMAGE_REMOVE_FAIL: {
      return {
        ...state,
        loading: false,
        type: action.type,
      };
    }
    case CREATE_PRODUCT_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        newProductId: action.product,
        type: action.type,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        type: action.type,
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
