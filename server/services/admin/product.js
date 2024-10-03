const db = require('../../mysql')
const moment = require('moment');

// 添加产品
exports.add = (req, res) => {
    const product = req.body;
    const file = req.file;
    product.cover = '/productuploads/' + file.filename;
    const date = new Date();
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let sql = "insert into product set productname=?,simple=?,complex=?,cover=?,createTime=?"
    db.query(sql, [product.productname, product.simple, product.complex, product.cover, time], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.affectedRows !== 1) {
            return res.send({ message: '添加失败' })
        }
        res.send({
            message: 'ok'
        })
    })
}

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

// 删除产品
exports.del = (req, res) => {
    const { id } = req.body
    let sql = "delete from product where id=?";
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

// 编辑产品
exports.edit = (req, res) => {
    const product = req.body;
    const file = req.file;
    if (file) {
        product.cover = '/productuploads/' + file.filename;
    }
    const date = new Date();
    const time = moment(date).format('YYYY-MM-DD HH:mm:ss');
    let sql = "update product set productname=?,simple=?,complex=?,cover=?,createTime=? where id=?"
    db.query(sql, [product.productname, product.simple, product.complex,product.cover, time, product.id], (err, result) => {
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