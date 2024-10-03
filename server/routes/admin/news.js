const express = require('express');
const router = express.Router();
const news=require('../../services/admin/news')
const multer  = require('multer')
const upload = multer({ dest: 'public/coveruploads/' })

router.post('/add',upload.single('file'), news.add);
router.get('/get', news.get);
router.put('/publish', news.publish);
router.post('/del', news.del);
router.post('/idget', news.idGet);
router.post('/edit',upload.single('file'), news.edit);


module.exports = router;