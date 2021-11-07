import axios from "axios";
import { API_ENDPOINT, LOCAL_API_ENDPOINT } from "../configs/AppConfig";

const authService = {};

authService.login = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/users/login`,
    data,
  });
};

authService.register = function (data) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/users/register`,
    data,
  });
};

authService.getProfile = function (jwtToken) {
  return axios({
    method: "post",
    url: `${API_ENDPOINT}/api/users/profile`,
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export default authService;
