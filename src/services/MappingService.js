import axios from 'axios';
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from '../configs/AppConfig';

const mappingService = {};

mappingService.mapping = function (jwtToken, params) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/suggestMapping/listProductSuggest`,
    params,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

mappingService.suggestListProduct = function (id, params) {
  return axios({
    method: 'get',
    url: `${API_ENDPOINT}/api/suggestMapping/listSuggestForProduct/${id}`,
    params,
  });
};

export default mappingService;
