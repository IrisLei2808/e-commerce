import { combineReducers } from 'redux';
import Auth from './Auth';
import Product from './Product';
import Cart from './Cart';
import Order from './Order';
import Exchange from './Exchange';

const reducers = combineReducers({
  auth: Auth,
  product: Product,
  cart: Cart,
  order: Order,
  exchange: Exchange,
});

export default reducers;
