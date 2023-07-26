import { productConstants } from "./constants";

const { default: axiosInstance } = require("../helpers/axios")

export const getProductBySlug = (slug) => {
	return async dispatch => {
		const res = await axiosInstance.get(`/products/${slug}`);
		if(res.status===200){
			dispatch({
				type : productConstants.GET_PRODUCT_BT_SLUG,
				payload : res.data
			})
		}else{
			
		}
	}
}

export const getProductPage = (payload) => {
	return async dispatch => {
		try {
			const {cid,type} = payload.params;
			const res =  await axiosInstance.get(`/page/${cid}/${type}`);
			dispatch({type : productConstants.GET_PRODUCT_PAGE_REQUEST});
			if(res.status == 200){
				const {page} = res.data;
				dispatch({
					type : productConstants.GET_PRODUCT_PAGE_SUCCESS,
					payload : {page} 
				});
			}else{
				const {error} = res.data;
				dispatch({
					type : productConstants.GET_PRODUCT_PAGE_FAILURE,
					payload : {error}
				})
			}
			console.log(res);
		}catch(error){
			console.log(error);
		}
		
	}
}

export const getProductDetailsById = (payload) => {
	return async dispatch => {
		dispatch({type : productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST});
		let res;
		try {
			res =  await axiosInstance.get(`/product/${payload}`);
			console.log(res);
			dispatch({
				type : productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
					payload : {productDetails : res.data.product} 
				});
		}catch(error){
			console.log(error);
			dispatch({
				type : productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
				payload : {error: res.data.error}
			})
		}
		
	}
}