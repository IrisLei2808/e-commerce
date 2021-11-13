import axios from "axios";
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from "../configs/AppConfig";

const orderService = {};

orderService.order = function (data, jwtToken) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/order`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export default orderService;
