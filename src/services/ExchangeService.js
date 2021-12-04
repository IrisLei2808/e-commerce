import axios from 'axios';
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from '../configs/AppConfig';

const exchangeService = {};

exchangeService.requestChange = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/exchange/requestChange`,
    data,
  });
};

exchangeService.countWantPurchase = function (userId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/exchange/countListRequestWantChangePurchase/${userId}`,
  });
};

exchangeService.countWantSell = function (userId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/exchange/countListRequestWantChangeSeller/${userId}`,
  });
};

exchangeService.acceptExchange = function (data, jwtToken) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/exchange/acceptChange`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

exchangeService.cancelExchange = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/exchange/cancelExchange`,
    data,
  });
};

export default exchangeService;
