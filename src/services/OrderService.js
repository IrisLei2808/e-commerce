import axios from "axios";
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from "../configs/AppConfig";

const orderService = {};

orderService.order = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/order`,
    data,
  });
};

export default orderService;
