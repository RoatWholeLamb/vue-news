const express = require('express');
const router = express.Router();
const product=require('../../services/admin/product')
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

router.post('/add',upload.single('file'), product.add);
router.get('/get', product.get);
router.post('/del', product.del);
router.post('/edit',upload.single('file'), product.edit);


module.exports = router;