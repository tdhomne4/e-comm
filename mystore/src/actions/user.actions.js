import axiosInstance from "../helpers/axios";
import { userConstants } from "./constants"

export const getAddress = () => {
	return async dispatch => {
		try {
			const res =  await axiosInstance.post(`/user/getaddress`);
			console.log('address',res);
			dispatch({type : userConstants.GET_USER_ADDRESS_REQUEST});
			if(res.status == 200){
				const {userAddress : {address},} = res.data;
				dispatch({
					type : userConstants.GET_USER_ADDRESS_SUCCESS,
					payload : {address} 
				});
			}else{
				const {error} = res.data;
				dispatch({
					type : userConstants.GET_USER_ADDRESS_FAILURE,
					payload : {error}
				})
			}	
		}catch(error){
			console.log(error);
		}
		
	}
}

export const addAddress = (payload) => {
	return async dispatch => {
		try {
			const res =  await axiosInstance.post(`/user/address/create`,{payload});
			dispatch({type : userConstants.ADD_USER_ADDRESS_REQUEST});
			if(res.status == 201){
				const {userAddress : {
					address
				},} = res.data;
				dispatch({
					type : userConstants.ADD_USER_ADDRESS_SUCCESS,
					payload : {address} 
				});
			}else{
				const {error} = res.data;
				dispatch({
					type : userConstants.ADD_USER_ADDRESS_FAILURE,
					payload : {error}
				})
			}	
		}catch(error){
			console.log(error);
		}
		
	}
}


export const userSignup = (user) => {
	return async(dispatch) => {
		
		dispatch({
			type : userConstants.USER_REGISTER_REQUEST	
		})

		const res = await axiosInstance.post('/signup',{
			...user
		});
		console.log(res);
		if(res.status === 201){
			const message = res.data;
			dispatch({
				type : userConstants.USER_REGISTER_SUCCESS,
				payload : {message}
			})
		}else{
			if(res.status === 400){
				dispatch({
					type : userConstants.USER_REGISTER_FAILURE,
					payload : {error :res.data.error}
				})
			}
		}
	}
}
