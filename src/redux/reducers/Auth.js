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

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  redirect: "",
  userInfoFromStorage: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        type: action.type,
        userInfoFromStorage: localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case USER_LOGOUT:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        userInfoFromStorage: null,
      };
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
        type: action.type,
        userInfoFromStorage: localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : null,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        balance: action.balance,
        type: action.type,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case RESET_AUTH_TYPE: {
      return {
        ...state,
        type: null,
      };
    }
    case AVATAR_UPLOAD_REQUEST: {
      return {
        ...state,
        type: action.type,
        loading: true,
      };
    }
    case AVATAR_UPLOAD_SUCCESS: {
      return {
        ...state,
        type: action.type,
        fileList: action.fileList,
        loading: false,
      };
    }
    case AVATAR_UPLOAD_FAIL: {
      return {
        ...state,
        type: action.type,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default auth;
