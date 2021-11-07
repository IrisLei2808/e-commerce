import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  RESET_CART_TYPE,
} from "../constants/Cart";

const cartStorage = localStorage.getItem("productCartItems")
  ? JSON.parse(localStorage.getItem("productCartItems"))
  : [];

const initState = {
  loading: false,
  message: "",
  showMessage: false,
  cartItems: [],
  cartItemsFromStorage: [],
};

const cart = (state = initState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      let item = action.productDetails;
      let qty = action.qty;
      item.qty = qty;
      let existedItem = state.cartItems.find(
        (x) => x.idProduct === item.idProduct
      );
      if (existedItem) {
        console.log("Trùng");
        return {
          ...state,
          type: action.type,
          cartItems: state.cartItems.map((x) =>
            x.idProduct === existedItem.idProduct ? item : x
          ),
        };
      } else {
        console.log("Không trùng");
        return {
          ...state,
          type: action.type,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      const product = action.productId;
      return {
        ...state,
        type: action.type,
        cartItems: state.cartItems.filter((x) => x.idProduct !== product),
      };
    case RESET_CART_TYPE:
      return {
        ...state,
        type: null,
      };
    default:
      return state;
  }
};

export default cart;
