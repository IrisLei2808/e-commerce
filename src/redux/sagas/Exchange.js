import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import orderService from '../../services/OrderService';
import exchangeService from '../../services/ExchangeService';
import {
  wantChangePurchaseFail,
  wantChangePurchaseSuccess,
  wantChangeSellFail,
  wantChangeSellSuccess,
  exchangeRequestSuccess,
  exchangeRequestFail,
  countWantPurchaseSuccess,
  countWantPurchaseFail,
} from '../actions/Exchange';
import {
  COUNT_WANT_PURCHASE_REQUEST,
  EXCHANGE_REQUEST,
  WANT_PURCHASE_REQUEST,
  WANT_SELL_REQUEST,
} from '../constants/Exchange';

export function* wantPurchaseRequest() {
  yield takeEvery(WANT_PURCHASE_REQUEST, function* ({ jwtToken, params }) {
    const { page, limit } = params;
    const product = {
      page: page,
      limit: limit,
    };
    try {
      const productData = yield call(
        orderService.getWantChangePurchase,
        jwtToken,
        product
      );
      yield put(wantChangePurchaseSuccess(productData));
    } catch (err) {
      yield put(
        wantChangePurchaseFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* countWantPurchase() {
  yield takeEvery(COUNT_WANT_PURCHASE_REQUEST, function* ({ userId }) {
    try {
      const productData = yield call(exchangeService.countWantPurchase, userId);
      yield put(countWantPurchaseSuccess(productData));
    } catch (err) {
      yield put(
        countWantPurchaseFail(err.response && err.response.data.result)
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

export function* exchangeRequest() {
  yield takeEvery(
    EXCHANGE_REQUEST,
    function* ({ idProduct, productId, userInfo }) {
      try {
        const productData = yield call(exchangeService.requestChange, {
          id: userInfo,
          idProductChange: idProduct,
          idProductWantChange: productId,
        });
        yield put(exchangeRequestSuccess(productData));
      } catch (err) {
        yield put(
          exchangeRequestFail(err.response && err.response.data.result)
        );
      }
    }
  );
}

export default function* rootSaga() {
  yield all([
    fork(wantPurchaseRequest),
    fork(wantSellRequest),
    fork(exchangeRequest),
    fork(countWantPurchase),
  ]);
}
