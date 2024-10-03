// 导入axios包
import axios from 'axios';
import router from '@/router'

// 基础设置
const axiosrequest = axios.create({
    baseURL: '/adminapi',
    timeout: 2000
});

//http request 拦截器
axiosrequest.interceptors.request.use(
    config => {
        // 获取token
        const token = localStorage.getItem('token');
        config.headers.Authorization = 'Bearer ' + token;
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

//http response 拦截器
axiosrequest.interceptors.response.use(
    response => {
        if (response.data.message === 'loseToken') {
            localStorage.removeItem('token')
            router.replace('/login')
        } else {
            // 在本地存储中设置token
            const { authorization } = response.headers;
            if (authorization) {
                localStorage.setItem('token', authorization);
            }
        }

        return response;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

// 暴露request对象
export default axiosrequest;