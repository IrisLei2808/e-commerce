import {
  AVATAR_UPLOAD_FAIL,
  AVATAR_UPLOAD_REQUEST,
  AVATAR_UPLOAD_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
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
  dob,
  fileList
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
    fileList,
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

export const getProfile = (data) => {
  return {
    type: GET_PROFILE_REQUEST,
    data,
  };
};

export const getProfileSuccess = (user) => {
  return {
    type: GET_PROFILE_SUCCESS,
    balance: user && user.balance,
  };
};

export const getProfileFailure = (error) => {
  return {
    type: GET_PROFILE_FAIL,
    error,
  };
};

export const signOut = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const avatarUpload = (data) => {
  return {
    type: AVATAR_UPLOAD_REQUEST,
    data,
  };
};
export const avatarUploadSuccess = (file) => {
  return {
    type: AVATAR_UPLOAD_SUCCESS,
    fileList: file.data,
  };
};

export const avatarUploadFailed = (message) => {
  return {
    type: AVATAR_UPLOAD_FAIL,
    message,
  };
};

export const resetAuthType = () => {
  return {
    type: RESET_AUTH_TYPE,
  };
};
