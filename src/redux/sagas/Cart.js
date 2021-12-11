import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { addMoneyFail, addMoneySuccess } from '../actions/Cart';
import { ADD_MONEY } from '../constants/Cart';
import cartService from '../../services/CartService';

export const getCart = (state) => state.cart;

export function* addToCart() {}

export function* handleAddToCart() {}

export function* addMoney() {
  yield takeEvery(ADD_MONEY, function* ({ userID, amountMoney }) {
    try {
      const product = yield call(cartService.addMoney, {
        userID,
        amountMoney,
      });
      yield put(addMoneySuccess(product.data));
    } catch (err) {
      yield put(addMoneyFail(err.response && err.response.data));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(handleAddToCart), fork(addMoney)]);
}
