import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import orderService from "../../services/OrderService";
import {
  acceptOrderFail,
  acceptOrderSuccess,
  cancelOrderFail,
  cancelOrderSuccess,
  countPurchaseFail,
  countPurchaseSuccess,
  countSellFail,
  countSellSuccess,
  countSellWaitingDeliveryFail,
  countSellWaitingDeliverySuccess,
  countWaitingDeliveryFail,
  countWaitingDeliverySuccess,
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
  sellWaitingDeliveryFail,
  sellWaitingDeliverySuccess,
  waitingDeliveryRequestFail,
  waitingDeliveryRequestSuccess,
} from "../actions/Order";
import {
  ACCEPT_ORDER_REQUEST,
  CANCEL_ORDER_REQUEST,
  COUNT_PURCHASE,
  COUNT_SELL,
  COUNT_SELL_WAITING_DELIVERY,
  COUNT_WAITING_DELIVERY,
  DELIVERY_INFO_REQUEST,
  DELIVERY_REQUEST,
  ORDER_CREATE_REQUEST,
  PURCHASE_REQUEST,
  SELL_REQUEST,
  SELL_WAITING_DELIVERY,
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
  yield takeEvery(PURCHASE_REQUEST, function* ({ userId, status, params }) {
    const { page, limit } = params;
    const product = {
      page: page,
      limit: limit,
    };
    try {
      const productData = yield call(
        orderService.purchase,
        {
          id: userId,
          status,
        },
        product
      );
      yield put(purchaseRequestSuccess(productData));
    } catch (err) {
      yield put(purchaseRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* countPurchase() {
  yield takeEvery(COUNT_PURCHASE, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countPurchase, {
        id: userId,
        status,
      });
      yield put(countPurchaseSuccess(productData));
    } catch (err) {
      yield put(countPurchaseFail(err.response && err.response.data.result));
    }
  });
}

export function* waitingDelivery() {
  yield takeEvery(
    WAITING_DELIVERY_REQUEST,
    function* ({ userId, status, params }) {
      const { page, limit } = params;
      const product = {
        page: page,
        limit: limit,
      };
      try {
        const productData = yield call(
          orderService.purchase,
          {
            id: userId,
            status,
          },
          product
        );
        yield put(waitingDeliveryRequestSuccess(productData));
      } catch (err) {
        yield put(
          waitingDeliveryRequestFail(err.response && err.response.data.result)
        );
      }
    }
  );
}

export function* countWaitingDelivery() {
  yield takeEvery(COUNT_WAITING_DELIVERY, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countPurchase, {
        id: userId,
        status,
      });
      yield put(countWaitingDeliverySuccess(productData));
    } catch (err) {
      yield put(
        countWaitingDeliveryFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* sellWaitingDelivery() {
  yield takeEvery(
    SELL_WAITING_DELIVERY,
    function* ({ userId, status, params }) {
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
        yield put(sellWaitingDeliverySuccess(productData));
      } catch (err) {
        yield put(
          sellWaitingDeliveryFail(err.response && err.response.data.result)
        );
      }
    }
  );
}

export function* countSellWaitingDelivery() {
  yield takeEvery(COUNT_SELL_WAITING_DELIVERY, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countSell, {
        id: userId,
        status,
      });
      yield put(countSellWaitingDeliverySuccess(productData));
    } catch (err) {
      yield put(
        countSellWaitingDeliveryFail(err.response && err.response.data.result)
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
  yield takeEvery(SELL_REQUEST, function* ({ userId, status, params }) {
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
      yield put(sellRequestSuccess(productData));
    } catch (err) {
      yield put(sellRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* countSell() {
  yield takeEvery(COUNT_SELL, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countSell, {
        id: userId,
        status,
      });
      yield put(countSellSuccess(productData));
    } catch (err) {
      yield put(countSellFail(err.response && err.response.data.result));
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
    fork(countPurchase),
    fork(countSell),
    fork(countWaitingDelivery),
    fork(sellWaitingDelivery),
    fork(countSellWaitingDelivery),
  ]);
}
