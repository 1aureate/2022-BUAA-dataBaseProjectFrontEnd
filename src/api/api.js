// src\api\api.js
import axios from 'axios'// 导入axios

let host = 'http://127.0.0.1:5000/test'
// 登录
export const login = params => { return axios.post(`${host}/login`, params)}
// 注册
export const register = params => { return axios.post(`${host}/register`, params)}
