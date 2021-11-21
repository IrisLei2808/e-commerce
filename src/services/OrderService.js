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

orderService.purchase = function (data, params) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/order/purchase`,
    data,
    params,
  });
};

orderService.countPurchase = function (data, params) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/order/countPurchase`,
    data,
  });
};

orderService.sell = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/order/sell`,
    data,
  });
};

orderService.accept = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/orderDetail/acceptOrderDetail`,
    data,
  });
};

orderService.cancel = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/orderDetail/cancelOrderDetail`,
    data,
  });
};

export default orderService;
