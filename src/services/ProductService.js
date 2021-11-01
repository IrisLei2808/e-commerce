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

export default productService;
