import {
  ALL_CATEGORY_FAIL,
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  CATEGORY_BY_BRAND_FAIL,
  CATEGORY_BY_BRAND_REQUEST,
  CATEGORY_BY_BRAND_SUCCESS,
  CATEGORY_NAME_FAIL,
  CATEGORY_NAME_REQUEST,
  CATEGORY_NAME_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  FEEDBACK_PRODUCT_FAIL,
  FEEDBACK_PRODUCT_REQUEST,
  FEEDBACK_PRODUCT_SUCCESS,
  IMAGE_REMOVE_FAIL,
  IMAGE_REMOVE_REQUEST,
  IMAGE_REMOVE_SUCCESS,
  IMAGE_UPLOAD_FAIL,
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  PRODUCT_BY_BRAND_FAIL,
  PRODUCT_BY_BRAND_REQUEST,
  PRODUCT_BY_BRAND_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  RESET_PRODUCT_TYPE,
  FEED_BACK_REQUEST,
  FEED_BACK_SUCCESS,
  FEED_BACK_FAIL,
  PRODUCT_OWN_REQUEST,
  PRODUCT_OWN_SUCCESS,
  PRODUCT_OWN_FAIL,
  FETCH_SUGGEST_PRICE_REQUEST,
  FETCH_SUGGEST_PRICE_SUCCESS,
  FETCH_SUGGEST_PRICE_FAIL,
  COUNT_PRODUCT_BY_CATEGORY_REQUEST,
  COUNT_PRODUCT_BY_CATEGORY_SUCCESS,
  COUNT_PRODUCT_BY_CATEGORY_FAIL,
  COUNT_PRODUCT_BY_BRAND_REQUEST,
  COUNT_PRODUCT_BY_BRAND_SUCCESS,
  COUNT_PRODUCT_BY_BRAND_FAIL,
} from '../constants/Product';

export const fetchProductList = (params) => {
  return {
    type: PRODUCT_LIST_REQUEST,
    params,
  };
};

export const fetchProductListSuccess = (product) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    productList: product.data,
  };
};

export const fetchProductListFailed = (message) => {
  return {
    type: PRODUCT_LIST_FAIL,
    message,
  };
};

export const fetchProductOwn = (params) => {
  return {
    type: PRODUCT_OWN_REQUEST,
    params,
  };
};

export const fetchProductOwnSuccess = (product) => {
  return {
    type: PRODUCT_OWN_SUCCESS,
    productList: product.data,
  };
};

export const fetchProductOwnFailed = (message) => {
  return {
    type: PRODUCT_OWN_FAIL,
    message,
  };
};

export const createProduct = (
  name,
  description,
  quantity,
  price,
  image,
  own,
  status,
  categoryID,
  categoryChangeID
) => {
  return {
    type: CREATE_PRODUCT_REQUEST,
    name,
    description,
    quantity,
    price,
    image,
    own,
    status,
    categoryID,
    categoryChangeID,
  };
};

export const createProductSuccess = (product) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    product,
  };
};

export const createProductFail = (error) => {
  return {
    type: CREATE_PRODUCT_FAIL,
    error,
  };
};

export const feedbackProduct = (
  productId,
  orderDetailId,
  content,
  image,
  star,
  token
) => {
  return {
    type: FEEDBACK_PRODUCT_REQUEST,
    productId,
    orderDetailId,
    content,
    image,
    star,
    token,
  };
};

export const feedbackProductSuccess = (product) => {
  return {
    type: FEEDBACK_PRODUCT_SUCCESS,
    product,
  };
};

export const feedbackProductFail = (error) => {
  return {
    type: FEEDBACK_PRODUCT_FAIL,
    error,
  };
};

export const fetchProductByCategory = (categoryId, params) => {
  return {
    type: PRODUCT_BY_CATEGORY_REQUEST,
    categoryId,
    params,
  };
};
export const fetchProductByCategorySuccess = (product) => {
  return {
    type: PRODUCT_BY_CATEGORY_SUCCESS,
    productList: product.data,
  };
};

export const fetchProductByCategoryFail = (message) => {
  return {
    type: PRODUCT_BY_CATEGORY_FAIL,
    message,
  };
};

export const countProductByCategory = (categoryId) => {
  return {
    type: COUNT_PRODUCT_BY_CATEGORY_REQUEST,
    categoryId,
  };
};

export const countProductByCategorySuccess = (product) => {
  return {
    type: COUNT_PRODUCT_BY_CATEGORY_SUCCESS,
    product: product.data.Count,
  };
};

export const countProductByCategoryFail = (error) => {
  return {
    type: COUNT_PRODUCT_BY_CATEGORY_FAIL,
    error,
  };
};

export const fetchProductByBrand = (brandId, params) => {
  return {
    type: PRODUCT_BY_BRAND_REQUEST,
    brandId,
    params,
  };
};
export const fetchProductByBrandSuccess = (product) => {
  return {
    type: PRODUCT_BY_BRAND_SUCCESS,
    productList: product.data && product.data.products,
    brand: product.data && product.data.brandname,
  };
};

export const fetchProductByBrandFail = (message) => {
  return {
    type: PRODUCT_BY_BRAND_FAIL,
    message,
  };
};

export const countProductByBrand = (brandId) => {
  return {
    type: COUNT_PRODUCT_BY_BRAND_REQUEST,
    brandId,
  };
};

export const countProductByBrandSuccess = (product) => {
  return {
    type: COUNT_PRODUCT_BY_BRAND_SUCCESS,
    product: product.data.Count,
  };
};

export const countProductByBrandFail = (error) => {
  return {
    type: COUNT_PRODUCT_BY_BRAND_FAIL,
    error,
  };
};

export const getAllCategory = (brandId) => {
  return {
    type: ALL_CATEGORY_REQUEST,
    brandId,
  };
};
export const getAllCategorySuccess = (product) => {
  return {
    type: ALL_CATEGORY_SUCCESS,
    allCategory: product.data && product.data,
  };
};

export const getAllCategoryFail = (message) => {
  return {
    type: ALL_CATEGORY_FAIL,
    message,
  };
};

export const fetchCategoryByBrand = () => {
  return {
    type: CATEGORY_BY_BRAND_REQUEST,
  };
};
export const fetchCategoryByBrandSuccess = (category) => {
  return {
    type: CATEGORY_BY_BRAND_SUCCESS,
    categoryList: category.data,
  };
};

export const fetchCategoryByBrandFail = (message) => {
  return {
    type: CATEGORY_BY_BRAND_FAIL,
    message,
  };
};

export const fetchProductDetails = (productId) => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
    productId,
  };
};
export const fetchProductDetailsSuccess = (product) => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    productDetails: product && product.data,
  };
};

export const fetchProductDetailsFailed = (message) => {
  return {
    type: PRODUCT_DETAILS_FAIL,
    message,
  };
};

export const getFeedback = (productId) => {
  return {
    type: FEED_BACK_REQUEST,
    productId,
  };
};
export const getFeedbackSuccess = (product) => {
  return {
    type: FEED_BACK_SUCCESS,
    productDetails: product && product.data,
  };
};

export const getFeedbackFailed = (message) => {
  return {
    type: FEED_BACK_FAIL,
    message,
  };
};

export const fetchCategoryName = (categoryId) => {
  return {
    type: CATEGORY_NAME_REQUEST,
    categoryId,
  };
};
export const fetchCategoryNameSuccess = (category) => {
  return {
    type: CATEGORY_NAME_SUCCESS,
    categoryName: category && category.data && category.data.name,
  };
};

export const fetchCategoryNameFailed = (message) => {
  return {
    type: CATEGORY_NAME_FAIL,
    message,
  };
};

export const imageUpload = (data) => {
  return {
    type: IMAGE_UPLOAD_REQUEST,
    data,
  };
};
export const imageUploadSuccess = (file) => {
  return {
    type: IMAGE_UPLOAD_SUCCESS,
    fileList: file.data,
  };
};

export const imageUploadFailed = (message) => {
  return {
    type: IMAGE_UPLOAD_FAIL,
    message,
  };
};

export const imageRemove = (data) => {
  return {
    type: IMAGE_REMOVE_REQUEST,
    data,
  };
};
export const imageRemoveSuccess = (file) => {
  return {
    type: IMAGE_REMOVE_SUCCESS,
    cloudinaryId: file.data.cloudinaryId,
  };
};

export const imageRemoveFailed = (message) => {
  return {
    type: IMAGE_REMOVE_FAIL,
    message,
  };
};

export const fetchSuggestPrice = (data) => {
  return {
    type: FETCH_SUGGEST_PRICE_REQUEST,
    data,
  };
};
export const fetchSuggestPriceSuccess = (suggestPrice) => {
  return {
    type: FETCH_SUGGEST_PRICE_SUCCESS,
    suggestPrice: suggestPrice.data.priceSuggest,
  };
};

export const fetchSuggestPriceFail = (message) => {
  return {
    type: FETCH_SUGGEST_PRICE_FAIL,
    message,
  };
};

export const resetProductType = () => {
  return {
    type: RESET_PRODUCT_TYPE,
  };
};
