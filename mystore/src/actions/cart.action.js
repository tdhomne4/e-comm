import { cartConstants } from "./constants";
import store from '../store';
import axios from '../helpers/axios';


const getCartItems = () => {
	return async dispatch => {
		try {
			dispatch({type : cartConstants.ADD_TO_CART_REQUEST});
			const res = await axios.post(`/user/getCartItems`);
			if(res.status == 200){
				const {cartItems} = res.data;
				console.log({getCartItems : cartItems})
				if(cartItems){
					dispatch({
						type : cartConstants.ADD_TO_CART_SUCCESS,
						payload : {cartItems}
					});
				}
			}
		}catch(error){
			console.log(error);
		}
	}
}


export const addToCart = (product,newQty) => {
	return async dispatch => {
		const {cart : {
			cartItems
		},auth} = store.getState();
	const qty = 	product.quantity ? product.quantity : cartItems[product._id] ? newQty :1;
		
	cartItems[product._id] = {
			...product,
			qty
		};
		if(auth.authenticate){
			dispatch({type : cartConstants.ADD_TO_CART_REQUEST});
			const payload = {
				cartItems : [{
					product : product._id,
					quantity : qty
				}]
			};
			console.log(payload);
			const res  = await axios.post(`/user/add-to-cart`,payload);
			if(res.status == 201){
				dispatch(getCartItems());
			}
		}else{
			localStorage.setItem('cart',JSON.stringify(cartItems));
		}
		dispatch({
			type : cartConstants.ADD_TO_CART_SUCCESS,
			payload : {cartItems}
		});
	}
}

export const updateCart = () => {
	return async dispatch => {
		const {cart : {
			cartItems
		},auth} = store.getState();
		// const cartItems  = localStorage.getItem('cart') ? 
		// 							JSON.parse(localStorage.getItem('cart')) : null;

		if(auth.authenticate){
				localStorage.removeItem('cart');//because we already get cart from localstorage
				if(cartItems){
					const payload = {
						cartItems : Object.keys(cartItems).map((key,index) => {
							return {
								quantity : cartItems[key].qty,
								product : cartItems[key]._id
							}
						})
					};
					if(Object.keys(cartItems).length > 0){
						const res = await axios.post(`/user/add-to-cart`,payload);
						if(res.status == 201){
							dispatch(getCartItems());
						}
					}
				}
		}else{
			if(cartItems){
				dispatch({
					type : cartConstants.ADD_TO_CART_SUCCESS,
					payload : {cartItems}
				})
			}
		}
	}
}

 export const deleteCartItems = (_id) => {
	console.log(_id);
	return async dispatch => {
		dispatch({type : cartConstants.REMOVE_ADD_TO_CART_REQUEST});
		const res = await axios.post('/user/deleteCartItem',{
			_id : _id
		});
		if(res){
			dispatch(getCartItems());
			dispatch({type : cartConstants.REMOVE_ADD_TO_CART_SUCCESS});
		}else{
			const {error} = res.data;
			dispatch({type : cartConstants.REMOVE_ADD_TO_CART_FAILURE,
				payload : {error}
			})
		}
	}
 }

export {
	getCartItems
}