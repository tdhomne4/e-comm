import axiosInstance from '../helpers/axios';

const {categoryConstants,initialDataConstants,productConstants} = require('./constants');
export const getInitialdata = () => {
	return async dispatch => {
		const res = await axiosInstance.post('/initialData');
		if(res.status == 200){
			const {categories,products} = res.data;
			dispatch({
				type : categoryConstants.GETALLCATEGORY_SUCCESS,
				payload : {categories}
			})
			dispatch ({
				type : productConstants.GET_ALL_PRODUCTS_DATA_SUCCESS,
				payload : {products}
			})
		}
		console.log(res);
		
	}
}