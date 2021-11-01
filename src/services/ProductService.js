import axios from "axios";
import { API_ENDPOINT } from "../configs/AppConfig";

const productService = {};

productService.getViewOtp = function (params) {
  return axios({
    method: "get",
    url: `${API_ENDPOINT}/${API_URI}/methods/${token}`,
    headers: {
      Authorization: bearerToken,
    },
  });
};

export default productService;
