import { combineReducers } from "redux";
import Auth from "./Auth";
import Product from "./Product";
import Cart from "./Cart";

const reducers = combineReducers({
  auth: Auth,
  product: Product,
  cart: Cart,
});

export default reducers;
