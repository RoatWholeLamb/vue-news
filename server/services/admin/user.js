const db = require('../../mysql')
const JWT = require('../../util')

// 登录
exports.login = (req, res) => {
    const data = req.body;
    let sql = 'select * from user where username=? and password=?';
    db.query(sql, [data.username, data.password], (err, result) => {
        if (err) {
            return res.send(err)
        }
        if (result.length === 0) {
            return res.send({
                message: '用户名密码不匹配'
            })
        } else {
            // 生成token
            const token = JWT.generate({
                id: result[0].id,
                username: result[0].username
            }, '1d');
            res.header('Authorization', token);
            // 返回结果
            return res.send({
                message: 'ok',
                data: {
                    username: result[0].username,
                    gender: result[0].gender,
                    avatar: result[0].avatar,
                    role: result[0].role
                }
            })
        }
    })
}

// 更新
exports.change = (req, res) => {
    const userInfo = req.body;
    const file = req.file;
    const token = req.headers.authorization.split(' ')[1];
    let { id } = JWT.verify(token);
    let sql = 'update user set username=?,gender=?,avatar=? where id=?';
    userInfo.avatar = '/avataruploads/' + file.filename;
    db.query(sql, [userInfo.username, userInfo.gender, userInfo.avatar, id], (err, result) => {
        if (err) {
            return res.send(err)
        }
        // 判断是否更新成功
        if (result.affectedRows !== 1) {
            return res.send({ message: '修改失败' });
        }
        res.send({
            message: 'ok',
            data: {
                username: userInfo.username,
                gender: userInfo.gender,
                avatar: userInfo.avatar,
            }
        })
    })
}

// 添加
exports.add = (req, res) => {
    const userInfo = req.body;
    const file = req.file;
    let sql = "insert into user set username=?,password=?,gender=?,avatar=?,role=?";
    userInfo.avatar = '/avataruploads/' + file.filename;
    db.query(sql, [userInfo.username, userInfo.password, userInfo.gender, userInfo.avatar, userInfo.role], (err, result) => {
        if (err) {
            return res.send(err)
        }
        // 判断是否添加成功
        if (result.affectedRows !== 1) {
            return res.send({ message: '添加失败' });
        }
        res.send({
            message: 'ok',
        })
    })
}

// 获取用户列表
exports.get = (req, res) => {
    let sql = "select id,username,gender,avatar,role from user ";
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
            data: result,
        })
    })
}

// 删除用户
exports.del = (req, res) => {
    const { id } = req.body
    let sql = "delete from user where id=?";
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

// 编辑用户
exports.edit = (req, res) => {
    const data = req.body;
    let sql = '';
    if (data.password === undefined) {
        console.log('aaa');
        sql = 'update user set username=?,role=? where id=?';

        db.query(sql, [data.username,Number(data.role),data.id],(err, result) => {
            if (err) {
                return res.send(err)
            }
            if (result.affectedRows !== 1) {
                return res.send({ message: '编辑失败' });
            }
            res.send({
                message: 'ok'
            })
        })
    } else {
        sql = 'update user set username=?,role=?,password=? where id=?';
        db.query(sql, [data.username,Number(data.role),data.password,data.id],  (err, result) => {
            if (err) {
                return res.send(err)
            }
            if (result.affectedRows !== 1) {
                return res.send({ message: '编辑失败' });
            }
            res.send({
                message: 'ok'
            })
        })
    }

}
