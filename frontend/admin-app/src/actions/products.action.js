import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

export const addProduct = (form) => {
  return async (dispatch) => {
    console.log(form);
    const res = await axiosInstance.post("create/product", form);
  };
};

// export const getSearchProducts = (key) => {
//   console.log(key);
//   return async (dispatch) => {
//     dispatch({ type: productConstants.GET_SERACH_PRODUCT_DATA_REQUEST });

//     const res = await axiosInstance.get(`/psearch/${key}`);
//     console.log(res.data);
//     const products = Array.isArray(res.data) ? res.data : [res.data];
//     if (res.status === 200) {
//       dispatch({
//         type: productConstants.GET_SERACH_PRODUCT_DATA_SUCCESS,
//         payload: products,
//       });
//     } else {
//       dispatch({
//         type: productConstants.GET_SERACH_PRODUCT_DATA_FAILURE,
//         payload: { error: res.data.error },
//       });
//     }
//   };
// };
