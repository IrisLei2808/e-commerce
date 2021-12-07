import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import mappingService from '../../services/MappingService';
import orderService from '../../services/OrderService';
import {
  cancelJoinExchangeFail,
  cancelJoinExchangeSuccess,
  countSellRefundFail,
  countSellRefundSuccess,
  getMappingListFail,
  getMappingListSuccess,
  getSuggestListFail,
  getSuggestListSuccess,
  joinExchangeFail,
  joinExchangeSuccess,
  sellRefundRequestFail,
  sellRefundRequestSuccess,
} from '../actions/Mapping';
import {
  CANCEL_JOIN_EXCHANGE_REQUEST,
  COUNT_SELL_REFUND,
  JOIN_EXCHANGE_REQUEST,
  MAPPING_LIST_REQUEST,
  SELL_REFUND_REQUEST,
  SUGGEST_LIST_REQUEST,
} from '../constants/Mapping';

export function* getMappingList() {
  yield takeEvery(MAPPING_LIST_REQUEST, function* ({ jwtToken, params }) {
    const { page, limit } = params;
    const product = {
      page: page,
      limit: limit,
    };
    try {
      const productData = yield call(mappingService.mapping, jwtToken, product);
      yield put(getMappingListSuccess(productData));
    } catch (err) {
      yield put(getMappingListFail(err.response && err.response.data.result));
    }
  });
}

export function* getSuggestList() {
  yield takeEvery(SUGGEST_LIST_REQUEST, function* ({ productId, params }) {
    const { page, limit } = params;
    const product = {
      page: page,
      limit: limit,
    };
    try {
      const productData = yield call(
        mappingService.suggestListProduct,
        productId,
        product
      );
      yield put(getSuggestListSuccess(productData));
    } catch (err) {
      yield put(getSuggestListFail(err.response && err.response.data.result));
    }
  });
}

export function* joinExchange() {
  yield takeEvery(JOIN_EXCHANGE_REQUEST, function* ({ jwtToken, params }) {
    const product = {
      tradeMappingCode: params,
    };
    try {
      const productData = yield call(
        mappingService.joinExchange,
        jwtToken,
        product
      );
      yield put(joinExchangeSuccess(productData));
    } catch (err) {
      yield put(joinExchangeFail(err.response && err.response.data.result));
    }
  });
}

export function* cancelJoinExchange() {
  yield takeEvery(
    CANCEL_JOIN_EXCHANGE_REQUEST,
    function* ({ jwtToken, params }) {
      const product = {
        tradeMappingCode: params,
      };
      try {
        const productData = yield call(
          mappingService.cancelJoinExchange,
          jwtToken,
          product
        );
        yield put(cancelJoinExchangeSuccess(productData));
      } catch (err) {
        yield put(
          cancelJoinExchangeFail(err.response && err.response.data.result)
        );
      }
    }
  );
}

export function* sellRefundRequest() {
  yield takeEvery(SELL_REFUND_REQUEST, function* ({ userId, status, params }) {
    const { page, limit } = params;
    const product = {
      page: page,
      limit: limit,
    };
    try {
      const productData = yield call(
        orderService.sell,
        {
          id: userId,
          status,
        },
        product
      );
      yield put(sellRefundRequestSuccess(productData));
    } catch (err) {
      yield put(
        sellRefundRequestFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* countSellRefund() {
  yield takeEvery(COUNT_SELL_REFUND, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countSell, {
        id: userId,
        status,
      });
      yield put(countSellRefundSuccess(productData));
    } catch (err) {
      yield put(countSellRefundFail(err.response && err.response.data.result));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getMappingList),
    fork(getSuggestList),
    fork(joinExchange),
    fork(cancelJoinExchange),
    fork(sellRefundRequest),
    fork(countSellRefund),
  ]);
}
