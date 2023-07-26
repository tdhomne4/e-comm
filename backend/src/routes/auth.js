const express = require('express');
const {signup,signin,signout} = require('../controller/auth');
const {requireSignin} = require('../common-middleware');
const {validateSignupRequest,isRequestvalidated,validateSigninRequest} = require('../validators/auth');
const router = express.Router();

router.post('/signup',validateSignupRequest,isRequestvalidated,signup);

router.post('/signin',validateSigninRequest,isRequestvalidated,signin);

router.post('/signout',requireSignin,signout);




module.exports = router;