// 导入request对象
import axiosrequest from "@/utils/request";

// 用户登录函数
export function userLogin(username, password) {
    const data = {
        username,
        password,
    }
    return axiosrequest({
        url: '/user/login',
        method: 'post',
        data
    });
}

// 更新用户信息函数
export function userChange(data) {
    return axiosrequest({
        url: '/user/change',
        method: 'post',
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

// 添加用户函数
export function userAdd(data) {
    return axiosrequest({
        url: '/user/add',
        method: 'post',
        headers:{
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

// 获取用户函数
export function userGet() {
    return axiosrequest({
        url: '/user/get',
        method: 'get',
    });
}

// 删除用户函数
export function userDel(id) {
    const data={
        id
    }
    return axiosrequest({
        url: '/user/del',
        method: 'post',
        data,
    });
}

// 编辑用户函数
export function userEdit(data) {
    return axiosrequest({
        url: '/user/edit',
        method: 'post',
        data,
    });
}