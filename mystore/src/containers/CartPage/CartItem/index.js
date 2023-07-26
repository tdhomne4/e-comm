import React,{useState} from 'react'
import './style.css';
import { useDispatch } from "react-redux";
import {deleteCartItems,getCartItems} from '../../../actions/cart.action';

const CartItem = (props) => {
	const dispatch = useDispatch();
	const [qty,setQty] = useState(props.cartItems.qty);

	const {_id,name,price,img } = props.cartItems;
	console.log(_id);

	const onQuantityIncrement = () => {
		setQty(qty + 1);
		props.onQuantityInc(_id,qty + 1);
	}
	const onQuantityDecrement = () => {
		if(qty <= 1) return;
		setQty(qty - 1);
		props.onQuantityDec(_id,qty - 1);
	}
	const deleteCartItem = () => {
		if(dispatch(deleteCartItems(_id))){
			dispatch(getCartItems());
			window.location.reload();
		}
	}
	return(
		<>
				<div className='cartItemContainer' style={{alignItems:'flex-start'}}>
					<div className="flexRow">
								<div className="cartProImgContainer">
									<img src={`http://localhost/learning/react-js/e-comm-first-project/backend/src/uploads/${img}`} />
								</div>
								<div className="cartItemDetails">
									<div>
										<p>{name}</p>
										<p>Rs : {price}</p>
									</div>
									<div>Delivery in 3 - 5 days</div>
								</div>
					</div>
					<div style={{
						display:'flex',
						margin : '5px 0'
					}}>
						<div className="quantityControl">
							<button onClick={onQuantityDecrement}>-</button>
							<input value={qty} readOnly />
							<button onClick={onQuantityIncrement}>+</button>
						</div>
						<button className="cartActionBtn">save for later</button>
						<button className="cartActionBtn" onClick={deleteCartItem}>Remove</button>
					</div>
				</div>		
		</>
	 )

 }
 export default CartItem;