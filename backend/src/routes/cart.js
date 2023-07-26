const express = require('express');
const router = express.Router();
const {addItemToCart,getCartItems,deleteCartItem} = require('../controller/cart');
const {requireSignin,userMiddleware} = require('../common-middleware');

router.post('/user/add-to-cart',requireSignin,userMiddleware,addItemToCart);

router.post('/user/getCartItems',requireSignin,userMiddleware,getCartItems);

router.post('/user/deleteCartItem',requireSignin,userMiddleware,deleteCartItem);

module.exports= router;