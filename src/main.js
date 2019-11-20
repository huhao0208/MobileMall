import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/vant'
import './assets/css/globle.css'
import path from "path"

Vue.config.productionTip = false

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'aGZLR7VmMH3wMg9uql21kHFhQ2Um0Omo'
})

// 日期格式化
Vue.filter("formDate",function(date){
  let dd = new Date(date);
  return dd.getFullYear()+'-'+(dd.getMonth()/1+1)+'-'+dd.getDate()
})
// 配置默认host
axios.defaults.baseURL='http://www.liulongbin.top:3005/'

//请求拦截
axios.interceptors.request.use(config => {
  
  return config;
  },error => {
  // Do something with request error
  return Promise.reject(error);
  });

// 挂载axios
Vue.prototype.$http = axios



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
