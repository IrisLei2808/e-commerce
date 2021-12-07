import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import orderService from '../../services/OrderService';
import {
  acceptOrderFail,
  acceptOrderSuccess,
  acceptRefundFail,
  acceptRefundSuccess,
  cancelledFail,
  cancelledSuccess,
  cancelOrderFail,
  cancelOrderSuccess,
  cancelRefundFail,
  cancelRefundSuccess,
  completeDeliveryFail,
  completeDeliverySuccess,
  countCancelledFail,
  countCancelledSuccess,
  countCompleteDeliveryFail,
  countCompleteDeliverySuccess,
  countDeliveryFail,
  countDeliverySuccess,
  countPurchaseFail,
  countPurchaseSuccess,
  countRefundRequestFail,
  countRefundRequestSuccess,
  countSellCancelledFail,
  countSellCancelledSuccess,
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
  getRefundRequestFail,
  getRefundRequestSuccess,
  orderRequestFail,
  orderRequestSuccess,
  purchaseRequestFail,
  purchaseRequestSuccess,
  receiveProductFail,
  receiveProductSuccess,
  refundProductFail,
  refundProductSuccess,
  sellCancelledFail,
  sellCancelledSuccess,
  sellCompleteDeliveryFail,
  sellCompleteDeliverySuccess,
  sellCountCompleteDeliveryFail,
  sellCountCompleteDeliverySuccess,
  sellCountDeliveryFail,
  sellCountDeliverySuccess,
  sellDeliveryFail,
  sellDeliverySuccess,
  sellRequestFail,
  sellRequestSuccess,
  sellWaitingDeliveryFail,
  sellWaitingDeliverySuccess,
  waitingDeliveryRequestFail,
  waitingDeliveryRequestSuccess,
} from '../actions/Order';
import {
  ACCEPT_ORDER_REQUEST,
  ACCEPT_REFUND_REQUEST,
  CANCELLED_REQUEST,
  CANCEL_ORDER_REQUEST,
  CANCEL_REFUND_REQUEST,
  COMPLETE_DELIVERY_REQUEST,
  COUNT_CANCELLED,
  COUNT_COMPLETE_DELIVERY,
  COUNT_DELIVERY,
  COUNT_PURCHASE,
  COUNT_REFUND_REQUEST,
  COUNT_SELL,
  COUNT_SELL_CANCELLED,
  COUNT_SELL_COMPLETE_DELIVERY,
  COUNT_SELL_WAITING_DELIVERY,
  COUNT_WAITING_DELIVERY,
  DELIVERY_INFO_REQUEST,
  DELIVERY_REQUEST,
  GET_REFUND_REQUEST,
  ORDER_CREATE_REQUEST,
  PURCHASE_REQUEST,
  RECEIVE_PRODUCT_REQUEST,
  REFUND_PRODUCT_REQUEST,
  SELL_CANCELLED_REQUEST,
  SELL_COMPLETE_DELIVERY,
  SELL_COUNT_DELIVERY,
  SELL_DELIVERY_REQUEST,
  SELL_REQUEST,
  SELL_WAITING_DELIVERY,
  WAITING_DELIVERY_REQUEST,
} from '../constants/Order';

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
      localStorage.removeItem('productCartItems');
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
  yield takeEvery(DELIVERY_REQUEST, function* ({ userId, status, params }) {
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
      yield put(deliveryRequestSuccess(productData));
    } catch (err) {
      yield put(deliveryRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* countDelivery() {
  yield takeEvery(COUNT_DELIVERY, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countPurchase, {
        id: userId,
        status,
      });
      yield put(countDeliverySuccess(productData));
    } catch (err) {
      yield put(countDeliveryFail(err.response && err.response.data.result));
    }
  });
}

export function* completeDelivery() {
  yield takeEvery(
    COMPLETE_DELIVERY_REQUEST,
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
        yield put(completeDeliverySuccess(productData));
      } catch (err) {
        yield put(
          completeDeliveryFail(err.response && err.response.data.result)
        );
      }
    }
  );
}

export function* countCompleteDelivery() {
  yield takeEvery(COUNT_COMPLETE_DELIVERY, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countPurchase, {
        id: userId,
        status,
      });
      yield put(countCompleteDeliverySuccess(productData));
    } catch (err) {
      yield put(
        countCompleteDeliveryFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* cancelled() {
  yield takeEvery(CANCELLED_REQUEST, function* ({ userId, status, params }) {
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
      yield put(cancelledSuccess(productData));
    } catch (err) {
      yield put(cancelledFail(err.response && err.response.data.result));
    }
  });
}

export function* countCancelled() {
  yield takeEvery(COUNT_CANCELLED, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countPurchase, {
        id: userId,
        status,
      });
      yield put(countCancelledSuccess(productData));
    } catch (err) {
      yield put(countCancelledFail(err.response && err.response.data.result));
    }
  });
}

export function* sellDelivery() {
  yield takeEvery(
    SELL_DELIVERY_REQUEST,
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
        yield put(sellDeliverySuccess(productData));
      } catch (err) {
        yield put(sellDeliveryFail(err.response && err.response.data.result));
      }
    }
  );
}

export function* sellCountDelivery() {
  yield takeEvery(SELL_COUNT_DELIVERY, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countSell, {
        id: userId,
        status,
      });
      yield put(sellCountDeliverySuccess(productData));
    } catch (err) {
      yield put(
        sellCountDeliveryFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* sellCompleteDelivery() {
  yield takeEvery(
    SELL_COMPLETE_DELIVERY,
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
        yield put(sellCompleteDeliverySuccess(productData));
      } catch (err) {
        yield put(
          sellCompleteDeliveryFail(err.response && err.response.data.result)
        );
      }
    }
  );
}

export function* sellCountCompleteDelivery() {
  yield takeEvery(COUNT_SELL_COMPLETE_DELIVERY, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countSell, {
        id: userId,
        status,
      });
      yield put(sellCountCompleteDeliverySuccess(productData));
    } catch (err) {
      yield put(
        sellCountCompleteDeliveryFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* sellCancelled() {
  yield takeEvery(
    SELL_CANCELLED_REQUEST,
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
        yield put(sellCancelledSuccess(productData));
      } catch (err) {
        yield put(sellCancelledFail(err.response && err.response.data.result));
      }
    }
  );
}

export function* sellCountCancell() {
  yield takeEvery(COUNT_SELL_CANCELLED, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countSell, {
        id: userId,
        status,
      });
      yield put(countSellCancelledSuccess(productData));
    } catch (err) {
      yield put(
        countSellCancelledFail(err.response && err.response.data.result)
      );
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

export function* receiveProduct() {
  yield takeEvery(RECEIVE_PRODUCT_REQUEST, function* ({ idOrderDetail }) {
    try {
      const productData = yield call(orderService.receiveProduct, {
        idOrderDetail,
      });
      yield put(receiveProductSuccess(productData));
    } catch (err) {
      yield put(receiveProductFail(err.response && err.response.data.result));
    }
  });
}

export function* refundProduct() {
  yield takeEvery(
    REFUND_PRODUCT_REQUEST,
    function* ({ reason, idOrderDetail, image, token }) {
      try {
        const product = yield call(
          orderService.refundProduct,
          {
            reason,
            idOrderDetail,
            image,
          },
          token
        );
        yield put(refundProductSuccess(product.data));
      } catch (err) {
        yield put(refundProductFail(err.response && err.response.data));
      }
    }
  );
}

export function* getRefundRequest() {
  yield takeEvery(GET_REFUND_REQUEST, function* ({ userId, status, params }) {
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
      yield put(getRefundRequestSuccess(productData));
    } catch (err) {
      yield put(getRefundRequestFail(err.response && err.response.data.result));
    }
  });
}

export function* countRefundRequest() {
  yield takeEvery(COUNT_REFUND_REQUEST, function* ({ userId, status }) {
    try {
      const productData = yield call(orderService.countPurchase, {
        id: userId,
        status,
      });
      yield put(countRefundRequestSuccess(productData));
    } catch (err) {
      yield put(
        countRefundRequestFail(err.response && err.response.data.result)
      );
    }
  });
}

export function* acceptRefund() {
  yield takeEvery(
    ACCEPT_REFUND_REQUEST,
    function* ({ idOrderDetail, jwtToken }) {
      try {
        const productData = yield call(
          orderService.acceptRefund,
          {
            idOrderDetail,
          },
          jwtToken
        );
        yield put(acceptRefundSuccess(productData));
      } catch (err) {
        yield put(acceptRefundFail(err.response && err.response.data.result));
      }
    }
  );
}

export function* cancelRefund() {
  yield takeEvery(
    CANCEL_REFUND_REQUEST,
    function* ({ idOrderDetail, reasonReject, token }) {
      console.log(idOrderDetail, reasonReject);
      try {
        const productData = yield call(
          orderService.cancelRefund,
          {
            idOrderDetail,
            reasonReject,
          },
          token
        );
        yield put(cancelRefundSuccess(productData));
      } catch (err) {
        yield put(cancelRefundFail(err.response && err.response.data.result));
      }
    }
  );
}

export default function* rootSaga() {
  yield all([
    fork(orderRequest),
    fork(purchaseRequest),
    fork(waitingDelivery),
    fork(delivery),
    fork(countDelivery),
    fork(sellRequest),
    fork(acceptOrder),
    fork(cancelOrder),
    fork(deliveryInfo),
    fork(countPurchase),
    fork(countSell),
    fork(countWaitingDelivery),
    fork(sellWaitingDelivery),
    fork(countSellWaitingDelivery),
    fork(sellDelivery),
    fork(sellCountDelivery),
    fork(completeDelivery),
    fork(countCompleteDelivery),
    fork(cancelled),
    fork(countCancelled),
    fork(sellCompleteDelivery),
    fork(sellCountCompleteDelivery),
    fork(sellCancelled),
    fork(sellCountCancell),
    fork(receiveProduct),
    fork(refundProduct),
    fork(getRefundRequest),
    fork(countRefundRequest),
    fork(acceptRefund),
    fork(cancelRefund),
  ]);
}
