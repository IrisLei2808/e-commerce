import axios from "axios";
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from "../configs/AppConfig";

const productService = {};

productService.createProduct = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/products`,
    data,
  });
};

productService.feedbackProduct = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/users/feedback`,
    data,
  });
};

productService.addProductImage = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/products/image`,
    data,
  });
};

productService.removeProductImage = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/products/image/remove`,
    data,
  });
};

productService.getProduct = function (data) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/products`,
    data,
  });
};

productService.getAllCategory = function (data) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/categories/category/brand`,
    data,
  });
};

productService.getProductByCategoryId = function (categoryId) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/categories/${categoryId}`,
  });
};

productService.getProductByBrand = function (brandId) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/products/brand/${brandId}`,
  });
};

productService.getProductDetails = function (productId) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/products/${productId}`,
  });
};

productService.getCategoryByBrand = function () {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/brand`,
  });
};

productService.getCategoryName = function (categoryId) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/categories/name/${categoryId}`,
  });
};

export default productService;
