import {productConstants } from "../actions/constants";

const initialState = {
	products : [],
	productsByPrice : {
		under5k : [],
		under10k : [],
		under20k : [],
		under30k : []
	},
	pageRequest : false,
	page : {},
	error : null,
	loading : false
};
export default (state =initialState,action) => {
	switch(action.type){
		case productConstants.GET_PRODUCT_BT_SLUG : 
			state = {
				...state,
				products : action.payload.products,
				productsByPrice : {...action.payload.productsByPrice}
			}
			break;
		
		case productConstants.GET_PRODUCT_PAGE_REQUEST : 
		state = {
			...state,
			pageRequest:true
		}
		break;
		case productConstants.GET_PRODUCT_PAGE_SUCCESS : 
		state = {
			...state,
			page : action.payload.page,
			pageRequest : false
		}
		break;
		case productConstants.GET_PRODUCT_PAGE_FAILURE : 
		state = {
			...state,
			pageRequest : false,
			error : action.payload.error
		}
		break;
		case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST : 
		state = {
			...state,
			loading : true
		}
		break;
		case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS : 
		state = {
			...state,
			loading : false,
			productDetails : action.payload.productDetails
		}
		break;
		case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE : 
		state = {
			...state,
			loading :false,
			error : action.payload.error
		}
		break;
}
	return state;
}