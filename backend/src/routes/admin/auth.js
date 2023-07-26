const express = require('express');
const {signup,signin,signout} = require('../../controller/admin/auth');
const {requireSignin} = require('../../common-middleware');
const {validateSignupRequest,isRequestvalidated,validateSigninRequest} = require('../../validators/auth');


const router = express.Router();

router.post('/admin/signup',validateSignupRequest,isRequestvalidated,signup);

router.post('/admin/signin',validateSigninRequest,isRequestvalidated,signin);

router.post('/admin/signout',requireSignin,signout);


module.exports = router;