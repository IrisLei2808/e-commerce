import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import orderService from "../../services/OrderService";
import {
  orderRequestFail,
  orderRequestSuccess,
  purchaseRequestFail,
  purchaseRequestSuccess,
  saleRequestSuccess,
  sellRequestFail,
  sellRequestSuccess,
} from "../actions/Order";
import {
  ORDER_CREATE_REQUEST,
  PURCHASE_REQUEST,
  SELL_REQUEST,
} from "../constants/Order";

export function* orderRequest() {
  yield takeEvery(ORDER_CREATE_REQUEST, function* ({ data }) {
    const { id, product, token } = data;
    const productArray = [];
    product.map((item) => {
      productArray.push({
        idproduct: item.idProduct,
        quantity: item.qty,
      });
    });
    try {
      const productData = yield call(
        orderService.order,
        {
          id,
          product: productArray,
        },
        token
      );
      yield put(orderRequestSuccess(productData));
      localStorage.removeItem("productCartItems");
    } catch (err) {
      yield put(orderRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* purchaseRequest() {
  yield takeEvery(PURCHASE_REQUEST, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.purchase, {
        id: userId,
        status,
      });
      yield put(purchaseRequestSuccess(productData));
    } catch (err) {
      yield put(purchaseRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* sellRequest() {
  yield takeEvery(SELL_REQUEST, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.sell, {
        id: userId,
        status,
      });
      yield put(sellRequestSuccess(productData));
    } catch (err) {
      yield put(sellRequestFail(err.response && err.response.data.result));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(orderRequest), fork(purchaseRequest), fork(sellRequest)]);
}
