const express = require('express');
const router = express.Router();
const user=require('../../services/admin/user')
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })


router.post('/login', user.login);
router.post('/change',upload.single('file'), user.change);
router.post('/add',upload.single('file'), user.add);
router.get('/get', user.get);
router.post('/del', user.del);
router.post('/edit', user.edit);

module.exports = router;
