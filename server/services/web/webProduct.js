const db = require('../../mysql')

// 获取产品
exports.get = (req, res) => {
    let sql = "select * from product ";
    db.query(sql, (err, result) => {
        if (err) {
            return res.send(err)
        }
        // 判断是否获取成功
        if (result.length === 0) {
            return res.send({ message: '获取失败' });
        }
        res.send({
            message: 'ok',
            product: result,
        })
    })
}