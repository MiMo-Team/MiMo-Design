/*
 * Router config for Vue
 * ---------------------------------------------------------------------------------------------------------------------
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
// 引入路由配置文件
import routes from './routes'

import store from '../../store/index'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js'

import {replaceClass} from '../../utils/index';
import NProgress from 'nprogress';          // Progress 进度条
import 'nprogress/nprogress.css';           // Progress 进度条 样式

// 使用配置文件规则
const router = new VueRouter({
    mode: 'history', //切换路径模式，变成history模式
    scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});

/* 页面刷新的时候，若localStorage中存在token值，则向Cookies获取加密的当前登录用户信息，拿token作为解密秘钥解密信息，
 最后转换成object格式，最后启用vuex中Login方法，重新赋值user信息 */
if (window.localStorage.getItem('mimo_broccoliSpringGcx_t_s')) {
    const token = window.localStorage.getItem('mimo_broccoliSpringGcx_t_s');
    //有当前用户信息，挂载信息，没有则挂载token
    if (Cookies.get('userInfo')) {
        const result = CryptoJS.AES.decrypt(Cookies.get('userInfo'), token).toString(CryptoJS.enc.Utf8);
        store.dispatch('Login', JSON.parse(result));
    }
    else {
        store.dispatch('Set_token', token);
    }
}

// 全局导航钩子
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    //判断页面是否有登录访问限制
    if (to.meta.requireAuth) {
        const info = store.state.user.info;
        // console.log(info);
        // console.log(info.status);
        // console.log(to.meta);
        console.log('当前页面有约束');
        //判断用户是否登录，是否信息完整没被破坏
        if (window.localStorage.getItem('mimo_broccoliSpringGcx_t_s') && Cookies.get('userInfo')) {
            //判断当前页面是否被限制权限访问
            if (to.meta.limit) {
                //判断是否为管理员访问
                to.meta.limit.indexOf('admin') >= 0 && info.status === 'admin' ?
                    next() : next({
                    path: '/errorpage/401', query: {noGoBack: false}
                });
            }
            else {
                next();
            }
        }
        else {
            console.log('info 没有值');
            next({path: '/errorpage/401', query: {noGoBack: true}});
        }
    }
    else {
        console.log('当前页面没有约束');
        if (to.meta.type === 'front') {
            replaceClass(document.body, 'custom-theme-normal');
        }
        next();
    }
});
router.afterEach(() => {
    NProgress.done(); // 结束Progress
});

//判断object是否为空
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

export default router;





