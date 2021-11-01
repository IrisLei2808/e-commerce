import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { USER_LOGIN_REQUEST, USER_REGISTER_REQUEST } from "../constants/Auth";
import {
  signInSuccess,
  signInFailure,
  registerSuccess,
  registerFailure,
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
    function* ({ username, password, address, fullName, phone, gender, dob }) {
      try {
        const user = yield call(authService.register, {
          userName: username,
          password,
          address,
          phone,
          fullName,
          gender,
          dob,
        });
        localStorage.setItem("userInfo", JSON.stringify(user.data));
        yield put(registerSuccess(user.data));
      } catch (err) {
        yield put(registerFailure(err.response && err.response.data));
      }
    }
  );
}

export default function* rootSaga() {
  yield all([fork(signIn), fork(register)]);
}
