import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import orderService from '../../services/OrderService';
import {
  wantChangePurchaseFail,
  wantChangePurchaseSuccess,
  wantChangeSellFail,
  wantChangeSellSuccess,
} from '../actions/Exchange';
import {
  WANT_PURCHASE_REQUEST,
  WANT_SELL_REQUEST,
} from '../constants/Exchange';

export function* wantPurchaseRequest() {
  yield takeEvery(WANT_PURCHASE_REQUEST, function* ({ userId }) {
    try {
      const productData = yield call(
        orderService.getWantChangePurchase,
        userId
      );
      yield put(wantChangePurchaseSuccess(productData));
    } catch (err) {
      yield put(
        wantChangePurchaseFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* wantSellRequest() {
  yield takeEvery(WANT_SELL_REQUEST, function* ({ userId }) {
    try {
      const productData = yield call(orderService.getWantChangeSell, userId);
      yield put(wantChangeSellSuccess(productData));
    } catch (err) {
      yield put(wantChangeSellFail(err.response && err.response.data.result));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(wantPurchaseRequest), fork(wantSellRequest)]);
}
