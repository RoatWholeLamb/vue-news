const db = require('../../mysql')
const moment = require('moment');

// 创建新闻
exports.add = (req, res) => {
    const news = req.body;
    const file = req.file;
    news.cover = '/coveruploads/' + file.filename;
    const date = new Date();
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let sql = "insert into news set title=?,content=?,cover=?,category=?,isPublish=?,createTime=?"
    db.query(sql, [news.title, news.content, news.cover, news.category, news.isPublish, time], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.affectedRows !== 1) {
            return res.send({ message: '创建失败' })
        }
        res.send({
            message: 'ok'
        })
    })
}

// 获取新闻
exports.get = (req, res) => {
    let sql = 'select * from news order by createTime desc';
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

// 更新新闻发布状态
exports.publish = (req, res) => {
    const news = req.body;
    const date = new Date()
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let sql = "update news set isPublish=?,createTime=? where id=?"
    db.query(sql, [news.isPublish, time, news.id], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.affectedRows !== 1) {
            return res.send({ message: '更新失败' })
        }
        res.send({
            message: 'ok',
            newNews: {
                createTime: time,
                isPublish: news.isPublish,
            }
        })
    })
}

// 删除新闻
exports.del = (req, res) => {
    const { id } = req.body
    let sql = "delete from news where id=?";
    db.query(sql, id, (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.affectedRows !== 1) {
            return res.send({ message: '删除失败' });
        }
        res.send({
            message: 'ok',
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

// 编辑新闻
exports.edit = (req, res) => {
    const news = req.body;
    const file = req.file;
    if (file) {
        news.cover = '/coveruploads/' + file.filename;
    }
    const date = new Date();
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let sql = "update news set title=?,content=?,cover=?,category=?,isPublish=?,createTime=? where id=?"
    db.query(sql, [news.title, news.content, news.cover, news.category, news.isPublish, time, news.id], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.affectedRows !== 1) {
            return res.send({ message: '编辑失败' })
        }
        res.send({
            message: 'ok'
        })
    })
}