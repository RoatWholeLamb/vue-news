const db = require('../../mysql')

// 获取新闻
exports.get = (req, res) => {
    let sql = 'select * from news where isPublish=1 order by createTime desc';
    db.query(sql, (err, result) => {
        if (err) {
            return res.send(err);
        }
        if (result.length === 0) {
            return res.send({ message: '获取新闻失败' })
        }
        res.send({
            message: 'ok',
            news: result,
        })
    })
}

// id获取新闻
exports.idGet = (req, res) => {
    const { id } = req.body
    let sql = "select * from news where id=?";
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.length === 0) {
            return res.send({ message: '获取失败' });
        }
        res.send({
            message: 'ok',
            news: result[0]
        })
    })
}