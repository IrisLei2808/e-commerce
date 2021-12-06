import {
  CANCEL_JOIN_EXCHANGE_FAIL,
  CANCEL_JOIN_EXCHANGE_REQUEST,
  CANCEL_JOIN_EXCHANGE_SUCCESS,
  JOIN_EXCHANGE_FAIL,
  JOIN_EXCHANGE_REQUEST,
  JOIN_EXCHANGE_SUCCESS,
  MAPPING_LIST_FAIL,
  MAPPING_LIST_REQUEST,
  MAPPING_LIST_SUCCESS,
  RESET_MAPPING,
  SUGGEST_LIST_FAIL,
  SUGGEST_LIST_REQUEST,
  SUGGEST_LIST_SUCCESS,
} from '../constants/Mapping';

export const getMappingList = (jwtToken, params) => {
  return {
    type: MAPPING_LIST_REQUEST,
    jwtToken,
    params,
  };
};

export const getMappingListSuccess = (product) => {
  return {
    type: MAPPING_LIST_SUCCESS,
    product: product.data,
  };
};

export const getMappingListFail = (error) => {
  return {
    type: MAPPING_LIST_FAIL,
    error,
  };
};

export const getSuggestList = (productId, params) => {
  return {
    type: SUGGEST_LIST_REQUEST,
    productId,
    params,
  };
};

export const getSuggestListSuccess = (product) => {
  return {
    type: SUGGEST_LIST_SUCCESS,
    product: product.data,
  };
};

export const getSuggestListFail = (error) => {
  return {
    type: SUGGEST_LIST_FAIL,
    error,
  };
};

export const joinExchange = (jwtToken, params) => {
  return {
    type: JOIN_EXCHANGE_REQUEST,
    jwtToken,
    params,
  };
};

export const joinExchangeSuccess = (product) => {
  return {
    type: JOIN_EXCHANGE_SUCCESS,
    product: product.data.result,
  };
};

export const joinExchangeFail = (error) => {
  return {
    type: JOIN_EXCHANGE_FAIL,
    error,
  };
};

export const cancelJoinExchange = (jwtToken, params) => {
  return {
    type: CANCEL_JOIN_EXCHANGE_REQUEST,
    jwtToken,
    params,
  };
};

export const cancelJoinExchangeSuccess = (product) => {
  return {
    type: CANCEL_JOIN_EXCHANGE_SUCCESS,
    product: product.data,
  };
};

export const cancelJoinExchangeFail = (error) => {
  return {
    type: CANCEL_JOIN_EXCHANGE_FAIL,
    error,
  };
};

export const resetMappingType = () => {
  return {
    type: RESET_MAPPING,
  };
};
