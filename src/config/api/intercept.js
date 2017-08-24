
import axios from 'axios'
import router from '../router/router'
import store from '../../store/index'


/*
注释：
1：全局导航钩子router.beforeEach((to, from, next) => {....},在本项目中，作用为：每次路由分配跳转时，对设置requireAuth: true
  （需要条件访问）的页面检测vuex-store中是是否带有token值（页面刷新时，store.state中的值会实时初始，手动绑定localStorage和
   store.state.token），若没有token值，则返回登录界面，若有，则正常跳转。
2：以上拦截，有纰漏，若用户token过期，但还是存在token，还是可以正常跳转，故加上axios拦截器 axios.interceptors.request 和
   axios.interceptors.response，检测是否有 store.state.token 值，有则，去检测 它的有效性，有效则正常跳转，无效则跳转至登录页面，
   并清除localStorage和store.state的token值。
*/

// http request 拦截器
axios.interceptors.request.use(
    config => {
        //发送请求显示loading
        // stores.dispatch('showLoading');
        // console.log(config);
        if (store.state.user.info.token) {
            config.headers.Authorization = `token ${store.state.user.info.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        //请求回来loading消失
        // stores.dispatch('hideLoading');
        return response;
    },
    error => {
        // alert(error.response);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'front/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    }
);
export default axios;