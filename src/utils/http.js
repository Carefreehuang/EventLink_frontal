import axios from "axios";

const httpInstance = axios.create({
    baseURL:'http://localhost:9081',
    timeout: 5000
})

// 请求拦截器：在请求发送前添加 Token
httpInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 添加 Token 到请求头
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器：处理响应错误（如 Token 过期）
httpInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token 过期或未授权，跳转到登录页面
            localStorage.removeItem('token'); // 清除 Token
            window.location.href = '/login'; // 跳转到登录页
        }
        return Promise.reject(error);
    }
);

export default httpInstance