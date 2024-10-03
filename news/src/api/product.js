// 导入request对象
import axiosrequest from "@/utils/request";

// 添加产品函数
export function productAdd(data) {
    return axiosrequest({
        url: '/product/add',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

// 获取产品函数
export function productGet() {
    return axiosrequest({
        url: '/product/get',
        method: 'get',
    });
}

// 删除用户产品函数
export function productDel(id) {
    const data = {
        id
    }
    return axiosrequest({
        url: '/product/del',
        method: 'post',
        data,
    });
}

// 编辑产品函数
export function productEdit(data) {
    return axiosrequest({
        url: '/product/edit',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data,
    });
}

// 前台获取产品函数
export function webProductGet() {
    return axiosrequest({
        url: '/webproduct/get',
        method: 'get',
    });
}