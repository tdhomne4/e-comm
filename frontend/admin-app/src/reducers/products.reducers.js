import { productConstants } from "../actions/constants";
const initialState = {
  products: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_DATA_SUCCESS:
      state = {
        ...state,
        products: action.payload,
      };
      break;
  }
  return state;
};
