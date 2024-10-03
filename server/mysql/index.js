const mysql = require('mysql');

// 建立连接
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password:'yangchen10',
    database: 'vue_news'
});



module.exports = db;