import {
  ACCEPT_ORDER_FAIL,
  ACCEPT_ORDER_REQUEST,
  ACCEPT_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  PURCHASE_FAIL,
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  SELL_FAIL,
  SELL_REQUEST,
  SELL_SUCCESS,
} from "../constants/Order";
import { RESET_ORDER_TYPE } from "../constants/Order";

const initState = {
  loading: false,
  message: "",
  showMessage: false,
};

const order = (state = initState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.product,
        type: action.type,
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case PURCHASE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchase: action.product,
        type: action.type,
      };
    case PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case SELL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SELL_SUCCESS:
      return {
        ...state,
        loading: false,
        purchase: action.product,
        type: action.type,
      };
    case SELL_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case ACCEPT_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACCEPT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchase: action.product,
        type: action.type,
      };
    case ACCEPT_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case CANCEL_ORDER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchase: action.product,
        type: action.type,
      };
    case CANCEL_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case RESET_ORDER_TYPE:
      return {
        ...state,
        type: null,
      };
    default:
      return state;
  }
};

export default order;
