import React, { useEffect ,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
import CartItem from './CartItem';
import { addAddress, addToCart,getCartItems } from '../../actions';
import { MaterialButton } from '../../components/MaterialUI';
import { useNavigate } from "react-router-dom";
import PriceDetails from '../../components/PriceDetails';
const CartPage = (props) => {
	const cart = useSelector(state => state.cart);
	const auth = useSelector(state => state.auth);
	//const cartItems = cart.cartItems;
	const [cartItems, setCartItems] = useState(cart.cartItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		setCartItems(cart.cartItems);
	},[cart.cartItems])

	//when auth change get cart data
	useEffect(() => {
		if(auth.authenticate){
			dispatch(getCartItems());
		}
	},[auth.authenticate]);


	const onQuantityIncrement = (_id,qty) => {
		const {name,price,img} = cartItems[_id];
		dispatch(addToCart({_id,name,price,img},qty));
	}
	const onQuantityDecrement = (_id,qty) => {
		const {name,price,img} = cartItems[_id];
		dispatch(addToCart({_id,name,price,img},qty));
	}

	const addAddress = () => {
		navigate('/checkout');
	}

	{/**display cart items for the checkout page */}
	if(props.getCartForCheckoutPage){
		return (
			<>
					{
            Object.keys(cartItems).map((key, index) => 
						<CartItem 
								key = {index}
								cartItems = {cartItems[key]}
								onQuantityInc={onQuantityIncrement}
								onQuantityDec={onQuantityDecrement}
								/>
							
						)
          }
			</>
		)
	}
	return (
		<>
			<Layout>
				<div className="cartContainer">
					<Card
						headerLeft = {`My Cart`}
						headerRight = {<div>Deliver to</div>} 
					>
					{
            Object.keys(cartItems).map((key, index) => 
						<CartItem 
								key = {index}
								cartItems = {cartItems[key]}
								onQuantityInc={onQuantityIncrement}
								onQuantityDec={onQuantityDecrement}
								/>
							
						)
          }
					  <div
            style={{
              width: "100%",
             	background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
							marginTop: "23px"
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={ addAddress}
              />
            </div>
          </div>
					</Card>
					<PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
				</div>
			</Layout>
		</>
	)
}

export default CartPage