import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
	return async dispatch => {
		dispatch({type : categoryConstants.GETALLCATEGORY_REQUEST});

		const res = await axiosInstance.get('category/getcategory');
		console.log(res);
		const {categoryList} = res.data;
		if(res.status === 201){
			dispatch({
				type : categoryConstants.GETALLCATEGORY_SUCCESS,
				payload : { categories : categoryList}
			});
		}else{
			dispatch({
				type : categoryConstants.GETALLCATEGORY_FAILURE,
				payload : {error : res.data.error}
			})
		}
	}
}
