import axios from 'axios';
import {Message} from 'element-ui'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  config.aaa = 'aaa';
  return config;
}, function (error) {
  console.error('request err.');
  alert(error)
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.ReturnCode != '0000') {
    Message({
      showClose: true,
      message: response.data.ReturnMsg,
      duration: 3000,
      type: 'error'
    });
  }
  return response;
}, function (error) {
  console.error(error)
  alert(error);
  return Promise.reject(error);
});