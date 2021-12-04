import {
  MAPPING_LIST_FAIL,
  MAPPING_LIST_REQUEST,
  MAPPING_LIST_SUCCESS,
  RESET_MAPPING,
} from '../constants/Mapping';

const initState = {
  loading: false,
  message: '',
  showMessage: false,
};

const mapping = (state = initState, action) => {
  switch (action.type) {
    case MAPPING_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case MAPPING_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        mappingList: action.product,
        type: action.type,
      };
    case MAPPING_LIST_FAIL:
      return {
        ...state,
        loading: false,
        message: action.error,
        type: action.type,
      };
    case RESET_MAPPING:
      return {
        ...state,
        type: null,
      };
    default:
      return state;
  }
};

export default mapping;
