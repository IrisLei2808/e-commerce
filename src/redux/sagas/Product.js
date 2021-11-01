import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { PRODUCT_LIST_REQUEST } from "../constants/Product";
import {
  fetchProductListSuccess,
  fetchProductListFailed,
} from "../actions/Product";
import productService from "../../services/ProductService";

export function* fetchProductList() {
  yield takeEvery(PRODUCT_LIST_REQUEST, function* () {
    try {
      const product = yield call(productService.getProduct);
      yield put(fetchProductListSuccess(product));
    } catch (error) {
      yield put(fetchProductListFailed(error));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(fetchProductList)]);
}
