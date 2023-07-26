const express = require('express');
const router = express.Router();
const {createProduct,getProductBySlug, getProductDetailsById} = require('../controller/product');
const {requireSignin,adminMiddleware} = require('../common-middleware');
const multer = require('multer');
const shortId = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
	destination : function(req,file,cb) {
		cb(null,path.join(path.dirname(__dirname),'uploads'))
	},
	filename : function (req,file,cb){
		cb(null,shortId.generate() + '-' + 	file.originalname)
	}
});

const upload = multer({storage});


router.post('/create/product',requireSignin,adminMiddleware,upload.array('productPictures',9000),createProduct);
router.get('/products/:slug',getProductBySlug);
router.get('/product/:productId',getProductDetailsById);

module.exports= router;