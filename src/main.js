// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 引入 vue
import Vue from 'vue'
// 引入 入口文件为 src/App.vue 文件
import App from './App.vue'
//引入路由配置文件
import router from './config/router/router'
//引入路由拦截器
import intercept from './config/api/intercept'
// 引入API文件
import axios from './config/api/api'


// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;

//vuex
import store from './store/'

// 导入全局组件
import Global_components from './components'
// 导入view 相关配套组件（ui，动画，附件，脚本.....）
import viewSpt from './views'

//filter 全局挂载
import * as filters from './filters'; // 全局vue filter

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});


//loading Mock
import mock from '../bower_components/mockjs/bin/mock-min'

// register globally
import IconSvg from './components/Icon-svg/index.vue'// svg 组件
Vue.component('icon-svg', IconSvg);

import jquery from 'jquery/dist/jquery.min'


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    //路由拦截器
    intercept,
    //vuex
    store,
    //mock data test
    mock,
    //Global component
    Global_components,
    //view support
    viewSpt,
    filters,

    jquery,

    template: '<App/>',
    components: {App}
});

/*
 在JavaScript ES6中，export与export default均可用于导出常量、函数、文件、模块等，
 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，
 以便能够对其进行使用，但在一个文件或模块中，export、import可以有多个，export default仅有一个。
 */
