import axios from 'axios';
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from '../configs/AppConfig';

const cartService = {};

cartService.addToCart = function (productId) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/products/${productId}`,
  });
};

cartService.addMoney = function (data) {
  return axios({
    method: 'post',
    url: `${API_ENDPOINT}/api/wallet/momo`,
    data,
  });
};

export default cartService;
