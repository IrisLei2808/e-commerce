import {
  RESET_AUTH_TYPE,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/Auth";

export const signIn = (username, password) => {
  return {
    type: USER_LOGIN_REQUEST,
    username,
    password,
  };
};

export const signInSuccess = (user) => {
  return {
    type: USER_LOGIN_SUCCESS,
    user,
  };
};

export const signInFailure = (error) => {
  return {
    type: USER_LOGIN_FAIL,
    error,
  };
};

export const register = (
  username,
  password,
  address,
  phone,
  fullName,
  gender,
  dob
) => {
  return {
    type: USER_REGISTER_REQUEST,
    username,
    password,
    address,
    phone,
    fullName,
    gender,
    dob,
  };
};

export const registerSuccess = (user) => {
  return {
    type: USER_REGISTER_SUCCESS,
    user,
  };
};

export const registerFailure = (error) => {
  return {
    type: USER_REGISTER_FAIL,
    error,
  };
};

export const signOut = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const resetAuthType = () => {
  return {
    type: RESET_AUTH_TYPE,
  };
};
