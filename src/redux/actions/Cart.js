import {
  ADD_MONEY,
  ADD_MONEY_FAIL,
  ADD_MONEY_SUCCESS,
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_ADD_ITEM_SUCCESS,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  RESET_CART_TYPE,
} from '../constants/Cart';

export const addToCart = (productDetails, productId, qty) => {
  return {
    type: CART_ADD_ITEM,
    productDetails,
    productId,
    qty,
  };
};

export const addToCartSuccess = (payload) => {
  return {
    type: CART_ADD_ITEM_SUCCESS,
    payload,
  };
};

export const addToCartFail = (payload) => {
  return {
    type: CART_ADD_ITEM_FAIL,
    payload,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: CART_REMOVE_ITEM,
    productId,
  };
};

export const cartClearItems = () => {
  return {
    type: CART_CLEAR_ITEMS,
  };
};

export const addMoney = (userID, amountMoney) => {
  return {
    type: ADD_MONEY,
    userID,
    amountMoney,
  };
};

export const addMoneySuccess = (product) => {
  return {
    type: ADD_MONEY_SUCCESS,
    product,
  };
};

export const addMoneyFail = (error) => {
  return {
    type: ADD_MONEY_FAIL,
    error,
  };
};

export const resetCartType = () => {
  return {
    type: RESET_CART_TYPE,
  };
};
