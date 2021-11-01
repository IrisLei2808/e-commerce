import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
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
    default:
      return state;
  }
};

export default product;
