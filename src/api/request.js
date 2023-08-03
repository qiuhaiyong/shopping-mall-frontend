// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from 'nprogress';
import "nprogress/nprogress.css";
// start() 进度条开始 done：进度条结束
// console.log(nprogress);

// 利用axios对象的发方法create，去创建一个axios实例
const requests = axios.create({
  // 基础路径,发送请求的时候，路径当中会出现api
  baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  // 超时时间
  timeout: 5000,
});

//添加请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在发送请求之前做一些事情
requests.interceptors.request.use(function (config) {
  // config 配置对象，对象里面有一个属性很重要，header请求头
  // 在发送请求之前做些什么
  let uuid = localStorage.getItem('UUIDTOKEN')
  if (uuid) {
    config.headers.userTempId = uuid
  }
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  // 需要携带token带给服务器

  // 进度条开始动
  nprogress.start()
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


// 添加响应拦截器
requests.interceptors.response.use(function (response) {
  // 成功的回调函数：服务器相应数据回来一首，响应拦截器可以检测到，可以做一些事情
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  // console.log('--------');
  // console.log(response);

  // 进度条结束
  nprogress.done()
  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 对外暴露
export default requests;