/*  ----- Vuex 模块 ----  */
/*
 Vuex 是一个专门为 Vue.js 应用设计的 状态管理模型 + 库。
 Vuex操作简述:
 页面动作触发actions，提交需要做什么操作（commit）给mutations，然后由mutations去让数据（state）发生
 变化（mutate），继而，页面上view层就会相应更新。
 流程：
 页面操作  =>  actions ( commit )=>  mutations ( mutate )=>  state  =>  更新view层
 */

/*  ----- 加载模块 ----  */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //安装store插件

//引入动作行为
import actions from './actions'
// 引入变化（突变）模块
import mutations from './mutations/mutations'
import toggleSidebar from './mutations/toggleSidebar'
import visitedViews from './mutations/visitedViews'
import getters from './getters'
import Cookies from 'js-cookie';

//项目中只需维护actions，mutations，getters 即可


//定义值
const state = {
    count: 20,
    token: null,
    adminleftnavnum: '1',
    user: {
        userinfo: {
            userInfoCarrier: '',
            tokenCarrier: '',
        }
    },
    data: {
        current: '',
    },
    //
    // sidebar: {
    //     opened: !+Cookies.get('sidebarStatus'),
    // },
    visitedViews: [],
    //这里只是分配路径
    mock: {
        //mock - test  测试路径
        base: "http://BroccoliSpring/gcx/api",
        branch: {
            test: {
                mockDef: '/test/mockDef',
                mockForm: '/test/mockForm'
            },
            // user: {
            //     userinfo: '/user/userinfo'
            // },
            // front: {
            //     login: '/front/login',
            //     reg: '/front/reg',
            //     regCheck: '/front/regCheck'
            // },
            bench: {
                roleMenu: '/role/menu'
            }
        }
    }

};

/*  ----- 导出Store 对象 ----  */
export default new Vuex.Store({

    state,
    actions,
    mutations,
    toggleSidebar,
    visitedViews,
    getters,

    strict: true //严格的state模式,乱改会有警告
})
