const express = require('express');
const router = express.Router();
const webNews = require('../../services/web/webNews');

router.get('/get', webNews.get);
router.post('/idget', webNews.idGet);



module.exports = router;