import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import mappingService from '../../services/MappingService';
import { getMappingListFail, getMappingListSuccess } from '../actions/Mapping';
import { MAPPING_LIST_REQUEST } from '../constants/Mapping';

export function* getMappingList() {
  yield takeEvery(MAPPING_LIST_REQUEST, function* ({ jwtToken, params }) {
    const { page, limit } = params;
    const product = {
      page: page,
      limit: limit,
    };
    try {
      const productData = yield call(mappingService.mapping, jwtToken, product);
      yield put(getMappingListSuccess(productData));
    } catch (err) {
      yield put(getMappingListFail(err.response && err.response.data.result));
    }
  });
}

export default function* rootSaga() {
  yield all([fork(getMappingList)]);
}
