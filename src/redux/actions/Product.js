import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_BY_CATEGORY_REQUEST,
  PRODUCT_BY_CATEGORY_SUCCESS,
  PRODUCT_BY_CATEGORY_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_BY_BRAND_REQUEST,
  PRODUCT_BY_BRAND_SUCCESS,
  PRODUCT_BY_BRAND_FAIL,
  RESET_PRODUCT_TYPE,
  CATEGORY_BY_BRAND_REQUEST,
  CATEGORY_BY_BRAND_SUCCESS,
  CATEGORY_BY_BRAND_FAIL,
  CATEGORY_NAME_REQUEST,
  CATEGORY_NAME_SUCCESS,
  CATEGORY_NAME_FAIL,
} from "../constants/Product";

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

export const fetchProductByCategory = (categoryId) => {
  return {
    type: PRODUCT_BY_CATEGORY_REQUEST,
    categoryId,
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

export const fetchProductByBrand = (brandId) => {
  return {
    type: PRODUCT_BY_BRAND_REQUEST,
    brandId,
  };
};
export const fetchProductByBrandSuccess = (product) => {
  return {
    type: PRODUCT_BY_BRAND_SUCCESS,
    productList: product.data && product.data[0],
    brand: product.data && product.data,
  };
};

export const fetchProductByBrandFail = (message) => {
  return {
    type: PRODUCT_BY_BRAND_FAIL,
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
    productDetails: product.data && product.data[0],
  };
};

export const fetchProductDetailsFailed = (message) => {
  return {
    type: PRODUCT_DETAILS_FAIL,
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

export const resetProductType = () => {
  return {
    type: RESET_PRODUCT_TYPE,
  };
};
