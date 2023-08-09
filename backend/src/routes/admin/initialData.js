const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  initialData,
  getSearchData,
} = require("../../controller/admin/initialData");
const router = express.Router();

router.post("/initialData/:key", requireSignin, adminMiddleware, initialData);

router.post("/initialData", requireSignin, adminMiddleware, initialData);

//router.get("/psearch/:key", requireSignin, adminMiddleware, getSearchData);
module.exports = router;
