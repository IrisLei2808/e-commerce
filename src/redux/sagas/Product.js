import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  PRODUCT_BY_BRAND_REQUEST,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_LIST_REQUEST,
} from "../constants/Product";
import {
  fetchProductListSuccess,
  fetchProductListFailed,
  fetchProductByCategorySuccess,
  fetchProductByCategoryFail,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailed,
  fetchProductByBrandSuccess,
  fetchProductByBrandFail,
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

export function* fetchProductByCategory() {
  yield takeEvery(PRODUCT_BY_CATEGORY_REQUEST, function* (params) {
    const { categoryId } = params;
    try {
      const product = yield call(
        productService.getProductByCategoryId,
        categoryId
      );
      yield put(fetchProductByCategorySuccess(product));
    } catch (error) {
      yield put(fetchProductByCategoryFail(error));
    }
  });
}

export function* fetchProductByBrand() {
  yield takeEvery(PRODUCT_BY_BRAND_REQUEST, function* (params) {
    const { brandId } = params;
    try {
      const product = yield call(productService.getProductByBrand, brandId);
      yield put(fetchProductByBrandSuccess(product));
    } catch (error) {
      yield put(fetchProductByBrandFail(error));
    }
  });
}

export function* fetchProductDetails() {
  yield takeEvery(PRODUCT_DETAILS_REQUEST, function* (params) {
    const { productId } = params;
    try {
      if (productId !== undefined) {
        const productDetails = yield call(
          productService.getProductDetails,
          productId
        );
        yield put(fetchProductDetailsSuccess(productDetails));
      } else {
        yield put(fetchProductDetailsFailed);
      }
    } catch (error) {
      yield put(fetchProductDetailsFailed(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchProductList),
    fork(fetchProductByCategory),
    fork(fetchProductDetails),
    fork(fetchProductByBrand),
  ]);
}
