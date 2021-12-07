import axios from 'axios';
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from '../configs/AppConfig';

const orderService = {};

orderService.order = function (data, jwtToken) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/order`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

orderService.purchase = function (data, params) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/order/purchase`,
    data,
    params,
  });
};

orderService.countPurchase = function (data, params) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/order/countPurchase`,
    data,
  });
};

orderService.sell = function (data, params) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/order/sell`,
    data,
    params,
  });
};

orderService.countSell = function (data, params) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/order/countSell`,
    data,
  });
};

orderService.accept = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/orderDetail/acceptOrderDetail`,
    data,
  });
};

orderService.cancel = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/orderDetail/cancelOrderDetail`,
    data,
  });
};

orderService.getWantChangePurchase = function (userId, params) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/exchange/listRequestWantChangePurchase/${userId}`,
    params,
  });
};

orderService.getWantChangeSell = function (userId, params) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/exchange/listRequestWantChangeSeller/${userId}`,
    params,
  });
};

orderService.receiveProduct = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/orderDetail/receiveProduct`,
    data,
  });
};

orderService.refundProduct = function (data, jwtToken) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/refund/requestRefund`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

orderService.acceptRefund = function (data, jwtToken) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/orderDetail/acceptRefund`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

orderService.cancelRefund = function (data, jwtToken) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/refund/shopRejectRefund`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export default orderService;
