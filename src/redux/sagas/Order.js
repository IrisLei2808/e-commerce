import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import orderService from "../../services/OrderService";
import {
  acceptOrderFail,
  acceptOrderSuccess,
  cancelOrderFail,
  cancelOrderSuccess,
  deliveryInfoRequestFail,
  deliveryInfoRequestSuccess,
  deliveryRequestFail,
  deliveryRequestSuccess,
  orderRequestFail,
  orderRequestSuccess,
  purchaseRequestFail,
  purchaseRequestSuccess,
  saleRequestSuccess,
  sellRequestFail,
  sellRequestSuccess,
  waitingDeliveryRequestFail,
  waitingDeliveryRequestSuccess,
} from "../actions/Order";
import {
  ACCEPT_ORDER_REQUEST,
  CANCEL_ORDER_REQUEST,
  DELIVERY_INFO_REQUEST,
  DELIVERY_REQUEST,
  ORDER_CREATE_REQUEST,
  PURCHASE_REQUEST,
  SELL_REQUEST,
  WAITING_DELIVERY_REQUEST,
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

export function* waitingDelivery() {
  yield takeEvery(WAITING_DELIVERY_REQUEST, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.purchase, {
        id: userId,
        status,
      });
      yield put(waitingDeliveryRequestSuccess(productData));
    } catch (err) {
      yield put(
        waitingDeliveryRequestFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* delivery() {
  yield takeEvery(DELIVERY_REQUEST, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.purchase, {
        id: userId,
        status,
      });
      yield put(deliveryRequestSuccess(productData));
    } catch (err) {
      yield put(deliveryRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* deliveryInfo() {
  yield takeEvery(DELIVERY_INFO_REQUEST, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.purchase, {
        id: userId,
        status,
      });
      yield put(deliveryInfoRequestSuccess(productData));
    } catch (err) {
      yield put(
        deliveryInfoRequestFail(err.response && err.response.data.result)
      );
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

export function* acceptOrder() {
  yield takeEvery(ACCEPT_ORDER_REQUEST, function* ({ idOrderDetail }) {
    try {
      const productData = yield call(orderService.accept, {
        idOrderDetail,
      });
      yield put(acceptOrderSuccess(productData));
    } catch (err) {
      yield put(acceptOrderFail(err.response && err.response.data.result));
    }
  });
}

export function* cancelOrder() {
  yield takeEvery(CANCEL_ORDER_REQUEST, function* ({ idOrderDetail }) {
    try {
      const productData = yield call(orderService.cancel, {
        idOrderDetail,
      });
      yield put(cancelOrderSuccess(productData));
    } catch (err) {
      yield put(cancelOrderFail(err.response && err.response.data.result));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(orderRequest),
    fork(purchaseRequest),
    fork(waitingDelivery),
    fork(delivery),
    fork(sellRequest),
    fork(acceptOrder),
    fork(cancelOrder),
    fork(deliveryInfo),
  ]);
}
