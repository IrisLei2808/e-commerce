import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  RESET_CART_TYPE,
  CART_CLEAR_ITEMS,
  ADD_MONEY,
  ADD_MONEY_SUCCESS,
  ADD_MONEY_FAIL,
} from '../constants/Cart';

const cartStorage = localStorage.getItem('productCartItems')
  ? JSON.parse(localStorage.getItem('productCartItems'))
  : [];

const initState = {
  loading: false,
  message: '',
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
        return {
          ...state,
          type: action.type,
          cartItems: state.cartItems.map((x) =>
            x.idProduct === existedItem.idProduct ? item : x
          ),
        };
      } else {
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
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case ADD_MONEY: {
      return {
        ...state,
        transactionLoading: true,
      };
    }
    case ADD_MONEY_SUCCESS:
      return {
        ...state,
        transactionLoading: false,
        url: action.product,
        type: action.type,
      };
    case ADD_MONEY_FAIL:
      return {
        ...state,
        transactionLoading: false,
        error: action.error,
        type: action.type,
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
