import { combineReducers } from "redux";
import Auth from "./Auth";
import Product from "./Product";

const reducers = combineReducers({
  auth: Auth,
  product: Product,
});

export default reducers;
