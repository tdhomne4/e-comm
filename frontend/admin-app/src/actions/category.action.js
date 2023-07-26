import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

const getAllCategory = () => {
	return async dispatch => {
		dispatch({type : categoryConstants.GETALLCATEGORY_REQUEST});

		const res = await axiosInstance.get('category/getcategory');
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

export const addCategory = (form) => {

	return async dispatch => {
		dispatch({type : categoryConstants.ADDNEWCATEGORY_REQUEST});
		try{
			const res = await axiosInstance.post('/category/create',form);
			if(res.status === 201){
				dispatch({
					type : categoryConstants.ADDNEWCATEGORY_SUCCESS,
					payload : {category:res.data.category}
				});
			}else{
				dispatch({
					type : categoryConstants.ADDNEWCATEGORY_FAILURE,
					payload : {error : res.data.error}
				})
			}
		}catch(error){
			console.log(error.response);
		}
	}
}


export const updateCategories = (form) => {

	return async dispatch => {
		dispatch({type : categoryConstants.UPDATE_CATEGORIES_REQUEST});
		const res = await axiosInstance.post('/category/update',form);
		if(res.status === 201){
			dispatch({type : categoryConstants.UPDATE_CATEGORIES_SUCCESS});
			dispatch(getAllCategory())
		}else{
			const {error} = res.data;
			dispatch({type : categoryConstants.UPDATE_CATEGORIES_FAILURE,
			payload : error
		})
		}
	}
}

export const deleteCategories = (ids) => {
	return async dispatch => {
		dispatch({type : categoryConstants.DELETE_CATEGORIES_REQUEST});
		const res = await axiosInstance.post('/category/delete',{
			_id : ids
		});
		if(res){
			dispatch(getAllCategory());
			dispatch({type : categoryConstants.DELETE_CATEGORIES_SUCCESS});
		}else{
			const {error} = res.data;
			dispatch({type : categoryConstants.DELETE_CATEGORIES_FAILURE,
				payload : {error}
			})
		}
	}
}

export {
	getAllCategory
}