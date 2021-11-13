import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import cartService from "../../services/CartService";
import { addToCartSuccess, addToCartFail } from "../actions/Cart";
import { CART_ADD_ITEM } from "../constants/Cart";

export const getCart = (state) => state.cart;

export function* addToCart() {}

export function* handleAddToCart() {}

export default function* rootSaga() {
  yield all([fork(handleAddToCart)]);
}