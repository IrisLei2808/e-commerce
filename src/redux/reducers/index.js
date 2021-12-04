import { combineReducers } from 'redux';
import Auth from './Auth';
import Product from './Product';
import Cart from './Cart';
import Order from './Order';
import Exchange from './Exchange';
import Mapping from './Mapping';

const reducers = combineReducers({
  auth: Auth,
  product: Product,
  cart: Cart,
  order: Order,
  exchange: Exchange,
  mapping: Mapping,
});

export default reducers;
