import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import Layout from "../../components/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import "./style.css";
import PriceDetails from "../../components/PriceDetails";
const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};


const  CheckoutPage = () => {
  const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [newAddress,setNewAddress] = useState(false);
  const [address,setAddress] = useState([]);
  const [confirmAddress,setConfirmAddress] = useState(false);
  const [deliveryAddress,setDeliveryAddress] = useState(null);
  const [selectedAddress,setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [orderSummery,setOrderSummery] = useState(false);

  useEffect(() => {
		setCartItems(cart.cartItems);
	},[cart.cartItems])

    //when auth change get cart data
	useEffect(() => {
		if(auth.authenticate){
			dispatch(getCartItems());
		}
	},[auth.authenticate]);

  
  useEffect(() => {
    const address = user.address.map(adr => ({...adr,selected: false, edit : false}));
    setAddress(address);
  },[user.address])
  
  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  },[auth.authenticate]);

  const selectAddress =(addr) => {
    const updatedAddress =  address.map(adr => adr._id === addr._id ? 
                            {...adr,selected:true} : 
                            {...adr,selected:false });
    setAddress(updatedAddress);
  }

  const confirmDeliveryAddress = (addr) => {
    setDeliveryAddress(addr);
    setConfirmAddress(true);
    setOrderSummery(true);
  }

  const enableAddressEditForm = (addr) => {
    const updatedAddress =  address.map(adr => adr._id === addr._id ? 
      {...adr,edit:true} : 
      {...adr,edit:false });
    setAddress(updatedAddress);
  }

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
  }
	return (
		<>
			<Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            active={!auth.authenticate}
						title={auth.authenticate ? "LoggedIn User" : "Not LoggedIn"}
            body={
							auth.authenticate ? (
                <div className="loggedInId">
                   <span className="checkout-login-s">Name : {auth.user.fullName}</span><br />
                   <span className="checkout-login-s">Email : {auth.user.email}</span>
                </div>
              ) : null
            }
          />
          {/*show and select address*/}
          <CheckoutStep
            stepNumber={'2'}
            title = {'Delivery Address'}
            active={!confirmAddress && auth.authenticate}
            body = {
                  <>
                    { confirmAddress ? 
                      (<div>{`${deliveryAddress?.address} - ${deliveryAddress.pinCode}`}</div>)
                    :
                    address.map(adr => 
                      <div className="flexRow addressContainer">
                        <div>
                          <input name="address" type="radio" onClick={() => selectAddress(adr)} />
                        </div>
                        <div className="flexRow sb addressinfo">
                          {!adr.edit ? (
                            <div style={{width:"100%"}}>
                              <div className="addressDetail">
                                <div>
                                  <span className="checkout-login-s">Name : {adr.name}</span><br />
                                  <span  className="checkout-login-s">Type : {adr.addressType}</span><br />
                                  <span  className="checkout-login-s"> Mobile Number :{adr.mobileNumber}</span>
                                </div>
                                {adr.selected && (
                                  <Anchor 
                                    name="Edit"
                                    onClick={() => enableAddressEditForm(adr)}
                                    style={{
                                      fontWeight : '500',
                                      color : '#2874f0'
                                    }} />
                                )}
                              </div>
                              <div className="fullAddress">
                                {adr.address} <br />{" "}
                                {`${adr.state} - ${adr.pinCode}`}
                              </div>
                              {adr.selected &&  (
                                <MaterialButton
                                title="Delivery Here"
                                style={{
                                  width:'250px'
                                }}
                                onClick={() => confirmDeliveryAddress(adr)}
                              />)}
                            </div>
                          ): (
                            <AddressForm
                            withoutLayout={true}
                            address = {adr}
                            onSubmitForm = {onAddressSubmit} 
                            onCancel={() => {}}
                         />
                          )
                          }
                        </div>  
                    </div>
                    )
                }
              </>
            }
          >
          </CheckoutStep>
          { confirmAddress ? null : newAddress ? 
            <AddressForm 
               onCancel={() => {}}
            />
            : 
            <CheckoutStep 
            stepNumber = {'+'}
            title={'Add New Address'}
            active = {false}
            onClick={() => setNewAddress(true)}
            />
          }
            {/**step 3 order summery */}
            <CheckoutStep
              stepNumber={"3"}
              active={!orderSummery}
              title={orderSummery ? "Order Summery" : "Order Summery not found"}
              body={
                orderSummery ?
                    <CartPage getCartForCheckoutPage={true} />
                : null
              }
            />
        </div>
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

export default CheckoutPage