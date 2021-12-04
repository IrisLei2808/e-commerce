import {
  MAPPING_LIST_FAIL,
  MAPPING_LIST_REQUEST,
  MAPPING_LIST_SUCCESS,
  RESET_MAPPING,
} from '../constants/Mapping';

export const getMappingList = (jwtToken, params) => {
  return {
    type: MAPPING_LIST_REQUEST,
    jwtToken,
    params,
  };
};

export const getMappingListSuccess = (product) => {
  return {
    type: MAPPING_LIST_SUCCESS,
    product: product.data,
  };
};

export const getMappingListFail = (error) => {
  return {
    type: MAPPING_LIST_FAIL,
    error,
  };
};

export const resetProductType = () => {
  return {
    type: RESET_MAPPING,
  };
};
