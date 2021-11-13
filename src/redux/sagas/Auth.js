import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import {
  AVATAR_UPLOAD_REQUEST,
  GET_PROFILE_REQUEST,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
} from "../constants/Auth";
import {
  signInSuccess,
  signInFailure,
  registerSuccess,
  registerFailure,
  getProfileSuccess,
  getProfileFailure,
  avatarUploadSuccess,
  avatarUploadFailed,
} from "../actions/Auth";
import authService from "../../services/AuthService";

export function* signIn() {
  yield takeEvery(USER_LOGIN_REQUEST, function* ({ username, password }) {
    try {
      const user = yield call(authService.login, {
        userName: username,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(user.data));
      yield put(signInSuccess(user.data));
    } catch (err) {
      yield put(signInFailure(err.response && err.response.data));
    }
  });
}

export function* register() {
  yield takeEvery(
    USER_REGISTER_REQUEST,
    function* ({
      username,
      password,
      address,
      phone,
      fullName,
      gender,
      dob,
      fileList,
    }) {
      try {
        const user = yield call(authService.register, {
          userName: username,
          password,
          address,
          phone,
          fullName,
          gender,
          dob,
          avatar: fileList,
        });
        localStorage.setItem("userInfo", JSON.stringify(user.data));
        yield put(registerSuccess(user.data));
      } catch (err) {
        yield put(registerFailure(err.response && err.response.data));
      }
    }
  );
}

export function* getProfile() {
  yield takeEvery(GET_PROFILE_REQUEST, function* ({ data }) {
    try {
      const user = yield call(authService.getProfile, data);
      yield put(getProfileSuccess(user.data));
    } catch (err) {
      yield put(getProfileFailure(err.response && err.response.data));
    }
  });
}

export function* avatarUpload() {
  yield takeEvery(AVATAR_UPLOAD_REQUEST, function* (data) {
    const uploadData = {
      image: data.data,
    };
    try {
      const res = yield call(authService.addAvatarImage, uploadData);
      yield put(avatarUploadSuccess(res));
    } catch (error) {
      yield put(avatarUploadFailed(error));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(signIn),
    fork(register),
    fork(avatarUpload),
    fork(getProfile),
  ]);
}
