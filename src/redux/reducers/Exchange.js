import {
  COUNT_WANT_PURCHASE_FAIL,
  COUNT_WANT_PURCHASE_REQUEST,
  COUNT_WANT_PURCHASE_SUCCESS,
  EXCHANGE_FAIL,
  EXCHANGE_REQUEST,
  EXCHANGE_SUCCESS,
  RESET_EXCHANGE_TYPE,
  WANT_PURCHASE_FAIL,
  WANT_PURCHASE_REQUEST,
  WANT_PURCHASE_SUCCESS,
  WANT_SELL_FAIL,
  WANT_SELL_REQUEST,
  WANT_SELL_SUCCESS,
} from '../constants/Exchange';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
};

const exchange = (state = initState, action) => {
  switch (action.type) {
    case WANT_PURCHASE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case WANT_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        wantPurchase: action.product,
        type: action.type,
      };
    case WANT_PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case WANT_SELL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case WANT_SELL_SUCCESS:
      return {
        ...state,
        loading: false,
        wantSell: action.product,
        type: action.type,
      };
    case WANT_SELL_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case EXCHANGE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        exchangeMsg: action.exchangeMsg,
        type: action.type,
      };
    case EXCHANGE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case COUNT_WANT_PURCHASE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case COUNT_WANT_PURCHASE_SUCCESS:
      return {
        ...state,
        loading: false,
        wantPurchaseCount: action.product,
        type: action.type,
      };
    case COUNT_WANT_PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case RESET_EXCHANGE_TYPE:
      return {
        ...state,
        type: null,
      };
    default:
      return state;
  }
};

export default exchange;
