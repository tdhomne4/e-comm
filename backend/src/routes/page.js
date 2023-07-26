const express = require('express');
const { upload, requireSignin, adminMiddleware } = require('../common-middleware');
const { createPage, getPage } = require('../controller/page');
const router = express.Router();

router.post('/create/page',upload.fields([
	{name : 'banners'},
	{name : 'products'}
]),requireSignin,adminMiddleware, createPage);

router.get(`/page/:category/:type`,getPage);
module.exports = router;