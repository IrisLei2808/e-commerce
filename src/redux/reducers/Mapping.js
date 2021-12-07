import {
  CANCEL_JOIN_EXCHANGE_FAIL,
  CANCEL_JOIN_EXCHANGE_REQUEST,
  CANCEL_JOIN_EXCHANGE_SUCCESS,
  COUNT_SELL_REFUND,
  COUNT_SELL_REFUND_FAIL,
  COUNT_SELL_REFUND_SUCCESS,
  JOIN_EXCHANGE_FAIL,
  JOIN_EXCHANGE_REQUEST,
  JOIN_EXCHANGE_SUCCESS,
  MAPPING_LIST_FAIL,
  MAPPING_LIST_REQUEST,
  MAPPING_LIST_SUCCESS,
  RESET_MAPPING,
  SELL_REFUND_FAIL,
  SELL_REFUND_REQUEST,
  SELL_REFUND_SUCCESS,
  SUGGEST_LIST_FAIL,
  SUGGEST_LIST_REQUEST,
  SUGGEST_LIST_SUCCESS,
} from '../constants/Mapping';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
};

const mapping = (state = initState, action) => {
  switch (action.type) {
    case MAPPING_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case MAPPING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        mappingList: action.product,
        type: action.type,
      };
    case MAPPING_LIST_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case SUGGEST_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUGGEST_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        suggestList: action.product,
        type: action.type,
      };
    case SUGGEST_LIST_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case JOIN_EXCHANGE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case JOIN_EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        joinResult: action.product,
        type: action.type,
      };
    case JOIN_EXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case CANCEL_JOIN_EXCHANGE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CANCEL_JOIN_EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        cancelResult: action.product,
        type: action.type,
      };
    case CANCEL_JOIN_EXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case SELL_REFUND_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SELL_REFUND_SUCCESS:
      return {
        ...state,
        loading: false,
        sellRefundList: action.product,
        type: action.type,
      };
    case SELL_REFUND_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case COUNT_SELL_REFUND: {
      return {
        ...state,
        loading: true,
      };
    }
    case COUNT_SELL_REFUND_SUCCESS:
      return {
        ...state,
        loading: false,
        countSellRefund: action.product,
        type: action.type,
      };
    case COUNT_SELL_REFUND_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case RESET_MAPPING:
      return {
        ...state,
        type: null,
      };
    default:
      return state;
  }
};

export default mapping;
