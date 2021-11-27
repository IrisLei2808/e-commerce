import {
  WANT_PURCHASE_REQUEST,
  WANT_PURCHASE_SUCCESS,
  WANT_PURCHASE_FAIL,
  WANT_SELL_REQUEST,
  WANT_SELL_SUCCESS,
  WANT_SELL_FAIL,
  RESET_EXCHANGE_TYPE,
} from '../constants/Exchange';

export const wantChangePurchase = (data, jwtToken) => {
  return {
    type: WANT_PURCHASE_REQUEST,
    data,
    jwtToken,
  };
};

export const wantChangePurchaseSuccess = (product) => {
  return {
    type: WANT_PURCHASE_SUCCESS,
    product: product.data.result,
  };
};

export const wantChangePurchaseFail = (error) => {
  return {
    type: WANT_PURCHASE_FAIL,
    error,
  };
};

export const wantChangeSell = (data, jwtToken) => {
  return {
    type: WANT_SELL_REQUEST,
    data,
    jwtToken,
  };
};

export const wantChangeSellSuccess = (product) => {
  return {
    type: WANT_SELL_SUCCESS,
    product: product.data.result,
  };
};

export const wantChangeSellFail = (error) => {
  return {
    type: WANT_SELL_FAIL,
    error,
  };
};

export const resetExchangeType = () => {
  return {
    type: RESET_EXCHANGE_TYPE,
  };
};
