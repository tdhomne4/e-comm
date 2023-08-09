import axiosInstance from "../helpers/axios";

const {
  categoryConstants,
  initialDataConstants,
  productConstants,
} = require("./constants");
export const getInitialdata = (page, limit, searchKey) => {
  console.log(searchKey);
  let res;
  return async (dispatch) => {
    if (searchKey) {
      res = await axiosInstance.post(
        `/initialData/${searchKey}?page=${page}&limit=${limit}`
      );
    } else {
      res = await axiosInstance.post(
        `/initialData?page=${page}&limit=${limit}`
      );
    }

    if (res.status == 200) {
      const total = res.data.total;
      const { categories, products } = res.data;
      dispatch({
        type: categoryConstants.GETALLCATEGORY_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_DATA_SUCCESS,
        payload: { products, total },
      });
    }
  };
};
