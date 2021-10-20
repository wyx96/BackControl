/* 
  统一axios请求入口，方便管理项目的axios
*/
import axios from "axios";
export default function (config) {
  // 创建axios 实例对象 
  const instance = axios.create({
    baseURL: '/api',
    // baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000,
  });
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    if (config.url != '/login'  && sessionStorage.getItem('token')) {
      config.headers['Authorization'] = sessionStorage.getItem('token');
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
    // return;
  });

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


  return instance(config);
}