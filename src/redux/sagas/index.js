import { all } from 'redux-saga/effects';
import Auth from './Auth';
import Product from './Product';
import Cart from './Cart';
import Order from './Order';
import Exchange from './Exchange';
import Mapping from './Mapping';

export default function* rootSaga(getState) {
  yield all([Auth(), Product(), Cart(), Order(), Exchange(), Mapping()]);
}
