import {
  ACCEPT_ORDER_FAIL,
  ACCEPT_ORDER_REQUEST,
  ACCEPT_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  COUNT_PURCHASE,
  COUNT_PURCHASE_FAIL,
  COUNT_PURCHASE_SUCCESS,
  COUNT_SELL,
  COUNT_SELL_FAIL,
  COUNT_SELL_SUCCESS,
  COUNT_SELL_WAITING_DELIVERY,
  COUNT_SELL_WAITING_DELIVERY_FAIL,
  COUNT_SELL_WAITING_DELIVERY_SUCCESS,
  COUNT_WAITING_DELIVERY,
  COUNT_WAITING_DELIVERY_FAIL,
  COUNT_WAITING_DELIVERY_SUCCESS,
  DELIVERY_FAIL,
  DELIVERY_INFO_FAIL,
  DELIVERY_INFO_REQUEST,
  DELIVERY_INFO_SUCCESS,
  DELIVERY_REQUEST,
  DELIVERY_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  PURCHASE_FAIL,
  PURCHASE_REQUEST,
  PURCHASE_SUCCESS,
  SELL_FAIL,
  SELL_REQUEST,
  SELL_SUCCESS,
  SELL_WAITING_DELIVERY,
  SELL_WAITING_DELIVERY_FAIL,
  SELL_WAITING_DELIVERY_SUCCESS,
  WAITING_DELIVERY_FAIL,
  WAITING_DELIVERY_REQUEST,
  WAITING_DELIVERY_SUCCESS,
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
    case COUNT_PURCHASE: {
      return {
        ...state,
        loading: true,
      };
    }
    case COUNT_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        purchaseCount: action.product,
        type: action.type,
      };
    case COUNT_PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case COUNT_SELL: {
      return {
        ...state,
        loading: true,
      };
    }
    case COUNT_SELL_SUCCESS:
      return {
        ...state,
        loading: false,
        sellCount: action.product,
        type: action.type,
      };
    case COUNT_SELL_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case WAITING_DELIVERY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case WAITING_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        waitingDelivery: action.product,
        type: action.type,
      };
    case WAITING_DELIVERY_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case COUNT_WAITING_DELIVERY: {
      return {
        ...state,
        loading: true,
      };
    }
    case COUNT_WAITING_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        purWaitingDeliveryCount: action.product,
        type: action.type,
      };
    case COUNT_WAITING_DELIVERY_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case SELL_WAITING_DELIVERY: {
      return {
        ...state,
        loading: true,
      };
    }
    case SELL_WAITING_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        sellWaitingDelivery: action.product,
        type: action.type,
      };
    case SELL_WAITING_DELIVERY_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case COUNT_SELL_WAITING_DELIVERY: {
      return {
        ...state,
        loading: true,
      };
    }
    case COUNT_SELL_WAITING_DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        purSellWaitingDeliveryCount: action.product,
        type: action.type,
      };
    case COUNT_SELL_WAITING_DELIVERY_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case DELIVERY_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELIVERY_SUCCESS:
      return {
        ...state,
        loading: false,
        delivery: action.product,
        type: action.type,
      };
    case DELIVERY_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case DELIVERY_INFO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELIVERY_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        deliveryInfo: action.product,
        type: action.type,
      };
    case DELIVERY_INFO_FAIL:
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
        sell: action.product,
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
