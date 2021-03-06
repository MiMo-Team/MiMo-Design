import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import carrier from './modules/carrier';

import mock from './modules/mock';
//侧边栏切换
import toggleSideBar from './modules/toggleSideBar';
//浏览页面卡片
import tabView from './modules/tabView';

import getters from './getters';

//测试
import test from './modules/test';


Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        carrier,
        mock,
        toggleSideBar,
        tabView,

        test
    },
    getters
});

export default store
