import axiosInstance from "../helpers/axios";
import { createPageConstants } from "./constants"

export const createPage = (form) => {
	return async dispatch => {
		dispatch({type : createPageConstants.CREATE_PAGE_REQUEST});
		try{
			const res = await axiosInstance.post('create/page',form);
			console.log(res);
			if(res.status === 201){
				dispatch({
					type : createPageConstants.CREATE_PAGE_SUCCESS,
					payload : { page : res.data.page}
				});
			}else{
				dispatch({
					type : createPageConstants.CREATE_PAGE_FAILURE,
					payload : {error : res.data.error}
				});
			}
		}
		catch(error){
			console.log(error);
		}
	
	}
}