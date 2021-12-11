import axios from 'axios';
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from '../configs/AppConfig';

const productService = {};

productService.createProduct = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/products`,
    data,
  });
};

productService.feedbackProduct = function (data, jwtToken) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/users/feedback`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

productService.addProductImage = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/products/image`,
    data,
  });
};

productService.removeProductImage = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/products/image/remove`,
    data,
  });
};

productService.getProduct = function (data) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/products`,
    data,
  });
};

productService.getProductOwn = function (jwtToken) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/users/product`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

productService.getAllCategory = function (data) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/categories/category/brand`,
    data,
  });
};

productService.getProductByCategoryId = function (categoryId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/categories/${categoryId}`,
  });
};

productService.getProductByBrand = function (brandId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/products/brand/${brandId}`,
  });
};

productService.getProductDetails = function (productId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/products/${productId}`,
  });
};

productService.getCategoryByBrand = function () {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/brand`,
  });
};

productService.getCategoryName = function (categoryId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/categories/name/${categoryId}`,
  });
};

productService.getFeedback = function (productId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/feedback/listFeedback/${productId}`,
  });
};

productService.suggestPrice = function (data) {
  return axios({
    url: `${API_ENDPOINT}/api/crawlData/suggestPrice`,
    method: 'post',
    data,
  });
};

export default productService;
