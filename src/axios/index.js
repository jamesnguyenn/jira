import axios from 'axios';

export const TOKEN_CYBERSOFT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyMyIsIkhldEhhblN0cmluZyI6IjIwLzEwLzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY2NjIyNDAwMDAwMCIsIm5iZiI6MTYzODExODgwMCwiZXhwIjoxNjY2MzcxNjAwfQ.hoaq9WsA187Q0NvdBYPZsn8c2CRg_ZE4mQO5_lUyAL4';
export const DOMAIN = 'https://jiranew.cybersoft.edu.vn/api';
export const USER_LOGIN = 'userLogin';
export const ACCESSTOKEN = 'accessToken';
const userData = JSON.parse(localStorage.getItem(ACCESSTOKEN)) || {};

//setup axios interceptor
export const http = axios.create({
    baseURL: DOMAIN, //Domain khi request api sẽ được ghép vào với link
    timeout: 30000, //Thời gian tối đa chờ response trả về
});

http.interceptors.request.use(
    (config) => {
        config.headers = {
            ...config.headers, //Lấy lại tất cả các giá trị header qua thuộc tính headers
            Authorization: 'Bearer ' + userData.accessToken,
            TokenCybersoft: TOKEN_CYBERSOFT,
            'Content-type': 'application/json',
        };
        return config;
    },
    (errors) => {
        return Promise.reject({ errors });
    }
);
