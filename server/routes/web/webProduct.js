const express = require('express');
const router = express.Router();
const webProduct = require('../../services/web/webProduct');

router.get('/get', webProduct.get);

module.exports=router;
