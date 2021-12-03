import {
  WANT_PURCHASE_REQUEST,
  WANT_PURCHASE_SUCCESS,
  WANT_PURCHASE_FAIL,
  WANT_SELL_REQUEST,
  WANT_SELL_SUCCESS,
  WANT_SELL_FAIL,
  RESET_EXCHANGE_TYPE,
  EXCHANGE_REQUEST,
  EXCHANGE_SUCCESS,
  EXCHANGE_FAIL,
  COUNT_WANT_PURCHASE_REQUEST,
  COUNT_WANT_PURCHASE_SUCCESS,
  COUNT_WANT_PURCHASE_FAIL,
  COUNT_WANT_SELL_REQUEST,
  COUNT_WANT_SELL_SUCCESS,
  COUNT_WANT_SELL_FAIL,
} from '../constants/Exchange';

export const wantChangePurchase = (jwtToken, params) => {
  return {
    type: WANT_PURCHASE_REQUEST,
    jwtToken,
    params,
  };
};

export const wantChangePurchaseSuccess = (product) => {
  return {
    type: WANT_PURCHASE_SUCCESS,
    product: product.data,
  };
};

export const wantChangePurchaseFail = (error) => {
  return {
    type: WANT_PURCHASE_FAIL,
    error,
  };
};

export const countWantPurchase = (userId) => {
  return {
    type: COUNT_WANT_PURCHASE_REQUEST,
    userId,
  };
};

export const countWantPurchaseSuccess = (product) => {
  return {
    type: COUNT_WANT_PURCHASE_SUCCESS,
    product: product.data.Count,
  };
};

export const countWantPurchaseFail = (error) => {
  return {
    type: COUNT_WANT_PURCHASE_FAIL,
    error,
  };
};

export const wantChangeSell = (jwtToken, params) => {
  return {
    type: WANT_SELL_REQUEST,
    jwtToken,
    params,
  };
};

export const wantChangeSellSuccess = (product) => {
  return {
    type: WANT_SELL_SUCCESS,
    product: product.data,
  };
};

export const wantChangeSellFail = (error) => {
  return {
    type: WANT_SELL_FAIL,
    error,
  };
};

export const countWantSell = (userId) => {
  return {
    type: COUNT_WANT_SELL_REQUEST,
    userId,
  };
};

export const countWantSellSuccess = (product) => {
  return {
    type: COUNT_WANT_SELL_SUCCESS,
    product: product.data.Count,
  };
};

export const countWantSellFail = (error) => {
  return {
    type: COUNT_WANT_SELL_FAIL,
    error,
  };
};

export const exchangeRequest = (userInfo, productId, idProduct) => {
  return {
    type: EXCHANGE_REQUEST,
    userInfo,
    productId,
    idProduct,
  };
};

export const exchangeRequestSuccess = (exchangeMsg) => {
  return {
    type: EXCHANGE_SUCCESS,
    exchangeMsg: exchangeMsg.data.result,
  };
};

export const exchangeRequestFail = (error) => {
  return {
    type: EXCHANGE_FAIL,
    error,
  };
};

export const resetExchangeType = () => {
  return {
    type: RESET_EXCHANGE_TYPE,
  };
};
