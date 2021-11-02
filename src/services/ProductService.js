import axios from "axios";
import { API_ENDPOINT } from "../configs/AppConfig";

const productService = {};

productService.getProduct = function (data) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/api/products`,
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

export default productService;
