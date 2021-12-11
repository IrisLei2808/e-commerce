import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import {
  ALL_CATEGORY_REQUEST,
  CATEGORY_BY_BRAND_REQUEST,
  CATEGORY_NAME_REQUEST,
  CREATE_PRODUCT_REQUEST,
  FEEDBACK_PRODUCT_REQUEST,
  FEED_BACK_REQUEST,
  FETCH_SUGGEST_PRICE_REQUEST,
  IMAGE_REMOVE_REQUEST,
  IMAGE_UPLOAD_REQUEST,
  PRODUCT_BY_BRAND_REQUEST,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_LIST_REQUEST,
  PRODUCT_OWN_REQUEST,
} from '../constants/Product';
import {
  fetchProductListSuccess,
  fetchProductListFailed,
  fetchProductByCategorySuccess,
  fetchProductByCategoryFail,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailed,
  fetchProductByBrandSuccess,
  fetchProductByBrandFail,
  fetchCategoryByBrandSuccess,
  fetchCategoryByBrandFail,
  fetchCategoryNameSuccess,
  fetchCategoryNameFailed,
  imageUploadSuccess,
  imageUploadFailed,
  imageRemoveSuccess,
  imageRemoveFailed,
  createProductSuccess,
  createProductFail,
  getAllCategorySuccess,
  getAllCategoryFail,
  feedbackProductSuccess,
  feedbackProductFail,
  getFeedbackFailed,
  getFeedbackSuccess,
  fetchProductOwnSuccess,
  fetchProductOwnFailed,
  fetchSuggestPriceSuccess,
  fetchSuggestPriceFail,
} from '../actions/Product';
import productService from '../../services/ProductService';

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

export function* fetchProductOwn() {
  yield takeEvery(PRODUCT_OWN_REQUEST, function* ({ params }) {
    try {
      const product = yield call(productService.getProductOwn, params);
      yield put(fetchProductOwnSuccess(product));
    } catch (error) {
      yield put(fetchProductOwnFailed(error));
    }
  });
}

export function* fetchAllCategory() {
  yield takeEvery(ALL_CATEGORY_REQUEST, function* () {
    try {
      const category = yield call(productService.getAllCategory);
      yield put(getAllCategorySuccess(category));
    } catch (error) {
      yield put(getAllCategoryFail(error));
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

export function* fetchCategoryByBrand() {
  yield takeEvery(CATEGORY_BY_BRAND_REQUEST, function* () {
    try {
      const product = yield call(productService.getCategoryByBrand);
      yield put(fetchCategoryByBrandSuccess(product));
    } catch (error) {
      yield put(fetchCategoryByBrandFail(error));
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

export function* getFeedback() {
  yield takeEvery(FEED_BACK_REQUEST, function* (params) {
    const { productId } = params;
    try {
      if (productId !== undefined) {
        const productDetails = yield call(
          productService.getFeedback,
          productId
        );
        yield put(getFeedbackSuccess(productDetails));
      } else {
        yield put(getFeedbackFailed);
      }
    } catch (error) {
      yield put(getFeedbackFailed(error));
    }
  });
}

export function* fetchCategoryName() {
  yield takeEvery(CATEGORY_NAME_REQUEST, function* (params) {
    const { categoryId } = params;
    try {
      const product = yield call(productService.getCategoryName, categoryId);
      yield put(fetchCategoryNameSuccess(product));
    } catch (error) {
      yield put(fetchCategoryNameFailed(error));
    }
  });
}

export function* imageUpload() {
  yield takeEvery(IMAGE_UPLOAD_REQUEST, function* (data) {
    try {
      const res = yield call(productService.addProductImage, data.data);
      yield put(imageUploadSuccess(res));
    } catch (error) {
      yield put(imageUploadFailed(error));
    }
  });
}

export function* imageRemove() {
  yield takeEvery(IMAGE_REMOVE_REQUEST, function* (data) {
    const removeData = {
      public_id: data.data,
    };
    try {
      const res = yield call(productService.removeProductImage, removeData);
      yield put(imageRemoveSuccess(res));
    } catch (error) {
      yield put(imageRemoveFailed(error));
    }
  });
}

export function* createProduct() {
  yield takeEvery(
    CREATE_PRODUCT_REQUEST,
    function* ({
      name,
      description,
      quantity,
      price,
      image,
      own,
      status,
      categoryID,
      categoryChangeID,
    }) {
      try {
        const product = yield call(productService.createProduct, {
          name,
          description,
          quantity,
          price,
          image,
          own,
          status,
          categoryID,
          categoryChangeID,
        });
        yield put(createProductSuccess(product.data));
      } catch (err) {
        yield put(createProductFail(err.response && err.response.data));
      }
    }
  );
}

export function* feedbackProduct() {
  yield takeEvery(
    FEEDBACK_PRODUCT_REQUEST,
    function* ({ productId, orderDetailId, content, image, star, token }) {
      try {
        const product = yield call(
          productService.feedbackProduct,
          {
            productId,
            orderDetailId,
            content,
            image,
            star,
          },
          token
        );
        yield put(feedbackProductSuccess(product.data));
      } catch (err) {
        yield put(feedbackProductFail(err.response && err.response.data));
      }
    }
  );
}

export function* suggestPrice() {
  yield takeEvery(FETCH_SUGGEST_PRICE_REQUEST, function* ({ data }) {
    try {
      const product = yield call(productService.suggestPrice, {
        idCategory: data,
      });
      yield put(fetchSuggestPriceSuccess(product));
    } catch (error) {
      yield put(fetchSuggestPriceFail(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchProductList),
    fork(fetchProductByCategory),
    fork(fetchProductDetails),
    fork(fetchProductByBrand),
    fork(fetchCategoryByBrand),
    fork(fetchCategoryName),
    fork(imageUpload),
    fork(imageRemove),
    fork(createProduct),
    fork(fetchAllCategory),
    fork(feedbackProduct),
    fork(getFeedback),
    fork(fetchProductOwn),
    fork(suggestPrice),
  ]);
}
