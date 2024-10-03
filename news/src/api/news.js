import axiosrequest from '@/utils/request'

// admin

// 创建新闻
export function newsAdd(data) {
    return axiosrequest({
        url: '/news/add',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
}

// 获取新闻
export function newsGet() {
    return axiosrequest({
        url: '/news/get',
        method: 'get',
    });
}

// 后台id获取新闻
export function newsIdGet(id) {
    const data={
        id
    }
    return axiosrequest({
        url: '/news/idget',
        method: 'post',
        data
    });
}

// 更新发布状态
export function newsPublish(id, isPublish) {
    const data = {
        id, isPublish
    }
    return axiosrequest({
        url: '/news/publish',
        method: 'put',
        data
    });
}

// 删除新闻
export function newsDel(id) {
    const data={
        id
    }
    return axiosrequest({
        url: '/news/del',
        method: 'post',
        data,
    });
}

// 编辑新闻
export function newsEdit(data) {
    return axiosrequest({
        url: '/news/edit',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data,
    });
}

// web

// 获取已发布新闻
export function webNewsGet() {
    return axiosrequest({
        url: '/webnews/get',
        method: 'get',
    });
}

// 前台id获取新闻
export function webNewsIdGet(id) {
    const data={
        id
    }
    return axiosrequest({
        url: '/webnews/idget',
        method: 'post',
        data
    });
}