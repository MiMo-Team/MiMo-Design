/*
 * router for vue-view
 */
// ----------------------------------  ** 模板页面引入 ** ----------------------------------
//组件动态添加测试1 测试页面
import componentsTest1 from '../../views/test/componentTest1.vue'
import componentsTest2 from '../../views/test/componentTest2.vue'
import SorTable from '../../views/test/SorTable.vue'
//测试 api 页面
import test from '../../components/test/test.vue'

//测试 mock-default 页面
import mockDefault from '../../components/test/mock/mock-default.vue'
//测试 项目  api-test 页面
import apiTest from '../../components/test/api-test.vue'
//测试 项目  table 页面
import table from '../../components/test/table.vue'
//测试 项目  store 页面
import store from '../../components/test/vuex-Test.vue'
//测试 项目  vue-for 页面
import vuefor from '../../components/test/vuefor.vue'
import vuefor2 from '../../components/test/vuefor2.vue'


//----------------------------------------------------------------------------------------------------------------
/* error page */
import Err404 from '../../views/error/404.vue'
import Err401 from '../../views/error/401.vue'
import unfinished from '../../views/error/unfinished.vue'

import App from '../../App.vue'
// ===========================  Front 登录注册  ============================
//-- 登录注册 总入口 --
import Front from '../../views/front/index.vue'
//-- 登录 --
import login from '../../views/login/login.vue'
//-- 注册 模式选择 --
import handleMode from '../../views/front/handle-mode.vue'
//--  注册 --
import register from '../../views/front/register.vue'


//-- 忘记密码 入口 --
import Fgt from '../../components/front/forgot/index.vue'
//-- 忘记密码 模式选择 --
import fgtMode from '../../components/front/forgot/forgotMode.vue'
import fgtEmail from '../../components/front/forgot/fgt-email/fgtEmail.vue'            // 邮箱找回密码
import fgtMoble from '../../components/front/forgot/fgt-moble/fgtMoble.vue'            // 快速找回密码
import fgtNormal from '../../components/front/forgot/fgt-normal/fgtNormal.vue'         // 常规找回密码

// ===========================  工作界面  ============================

/* ----------  工作台主模块 入口  ---------- */
import Layout from '../../views/layout/Layout.vue'
/* ---  欢迎界面  --- */
import dashboard from '../../views/dashboard/index.vue'

/* ---  个人信息模块  --- */
import userEdit from '../../views/user/userEdit.vue'
/* ---  消息  --- */
import message from '../../views/news/message.vue'
/* ---  内部通告  --- */
import Announcement from '../../views/news/Announcement.vue'


/* ---  管理员模块  --- */
// - 入口 -
import admindex from '../../views/admin/index.vue'
// - 用户列表 -
import admin from '../../views/admin/admin.vue'
// - 新增用户 -
import addUser from '../../views/admin/addUser.vue'
// - 通告管理 -
import adminAnnouncement from '../../views/admin/admin-announcement.vue'
// - 编辑用户 index -
import editUser from '../../views/admin/editUser.vue'

/* ---  产品企划 模块  --- */
import productPlanning from '../../views/planning/product-planning.vue'

/* ---  仓储 模块  --- */
// - 入库单 -
import DepotOutIn from '../../views/storage/Depot-out-in.vue'

// - 新增入库单 -
import addStorageOrder from '../../views/storage/StorageOrder.vue'
// - 新增出库单 -
import addLibraryOrder from '../../views/storage/LibraryOrder.vue'
// - 分类管理 -
import storage_classification from '../../views/storage/classification.vue'
// - 面辅料目录 -
import accessoriesList from '../../views/storage/accessories-list.vue'


/* ---  图库模块  --- */
// - 入口 -
import pindex from '../../views/gallery/index.vue'
//时装周
import fw from '../../views/gallery/fw.vue'
import t from '../../views/gallery/fw.vue'

/* ---  设置  --- */
// - 修改密码 -
import modifypass from '../../views/setting/modify-password.vue'
// - 切换皮肤 -
import skin from '../../views/setting/skin.vue'

// 初始页面定义
const iniView = '/front/login';
const error = '/errorpage/404';


// meta: {requireAuth: true}有约束，必须指向准确的子路由，加载到父路由，to.meta.requireAuth 则为undefind
// 配置路由
export default[
    {path: '/test', component: test},

    {path: '/mockDefault', component: mockDefault},

    {path: '/apiTest', component: apiTest},
    {path: '/table', component: table},
    {path: '/store', component: store},
    {path: '/vuefor', component: vuefor},
    {path: '/vuefor2', component: vuefor2},

    // 错误页面
    {
        path: '/errorpage',
        component: App,
        redirect: 'noredirect',
        name: '错误页面',
        children: [
            {path: '401', component: Err401, name: '401'},
            {path: '404', component: Err404, name: '404'}
        ]
    },
    // 前台登录
    {
        path: '/front',
        component: Front,
        redirect: '/front/login',
        name: "前台",
        children: [
            {path: 'login', component: login, name: '登录',meta: {type: 'front'}},
            {path: 'handlemode', component: handleMode, name: '注册模式选择',meta: {type: 'front'}},
            {path: 'reg', component: register, name: '注册',meta: {type: 'front'}},
        ]
    },
    // 主页
    {
        path: '/',
        component: Layout,
        redirect: iniView,
        name: "首页",
        children: [
            {path: 'index', component: Layout, redirect: '/dashboard', meta: {requireAuth: true}},
            {path: 'dashboard', component: dashboard, meta: {requireAuth: true}},
            {path: 'unfinished', component: unfinished, meta: {requireAuth: true}},
        ]
    },
    // 用户
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        name: "个人中心模块",
        children: [
            {path: 'index', component: userEdit, meta: {requireAuth: true}, name: '个人中心'},
            {path: 'usere', component: userEdit, meta: {requireAuth: true}, name: '编辑个人信息'},
            {path: 'msg', component: message, meta: {requireAuth: true}, name: '消息'},
            {path: 'ac', component: Announcement, meta: {requireAuth: true}, name: '内部通告'},
        ]

    },
    // 管理员模块
    {
        path: '/adm',
        component: Layout,
        redirect: '/adm/index',
        name: "管理员模块",
        children: [
            {path: 'index', component: admindex, meta: {requireAuth: true, limit: ['admin']}, name: '账户管理'},
            {path: 'admin', component: admin, meta: {requireAuth: true, limit: ['admin']}, name: '用户列表'},
            {path: 'add', component: addUser, meta: {requireAuth: true, limit: ['admin']}, name: '新增用户'},
            {path: 'adminac', component: adminAnnouncement, meta: {requireAuth: true, limit: ['admin']}, name: '通告管理'},
            {path: 'edit', component: editUser, meta: {requireAuth: true, limit: ['admin']}, name: '编辑当前用户'},
        ]
    },

    // 产品企划
    {
        path: '/product-Planning',
        component: Layout,
        redirect: '/product-Planning/index',
        name: "产品企划模块",
        children: [
            {path: 'index', component: productPlanning, meta: {requireAuth: true}, name: '产品企划'},
        ]
    },


    // 面辅料仓库
    {
        path: '/storage',
        component: Layout,
        redirect: '/storage/index',
        name: "面辅料仓库模块",
        children: [
            // {path: '/', component: storage, meta: {requireAuth: true}},
            {path: 'depotin', component: DepotOutIn, meta: {requireAuth: true}, name: "入库单"},
            {path: 'depotout', component: DepotOutIn, meta: {requireAuth: true}, name: "出库单"},
            {path: 'classify', component: storage_classification, meta: {requireAuth: true}, name: "分类管理"},
            {path: 'accessoriesList', component: accessoriesList, meta: {requireAuth: true}, name: "面辅料目录"},

            {path: 'addso', component: addStorageOrder, meta: {requireAuth: true}, name: "新增(编辑)入库单"},
            {path: 'addlo', component: addLibraryOrder, meta: {requireAuth: true}, name: "新增(编辑)出库单"},
        ]
    },

    //图片库
    {
        path: '/p',
        component: Layout,
        redirect: '/p/index',
        name: "素材库",
        children: [
            {path: 'index', component: pindex, meta: {requireAuth: true}, name: '图片素材'},
            {path: 'fw', component: fw, meta: {requireAuth: true}, name: '时装周'},
            {path: 't', component: t, meta: {requireAuth: true}, name: '其他'},
        ]
    },
    // 设置
    {
        path: '/setting',
        component: Layout,
        redirect: null,
        name: "设置",
        children: [
            {path: 'modifypass', component: modifypass, meta: {requireAuth: true}, name: '修改密码'},
            {path: 'skin', component: skin, meta: {requireAuth: true}, name: '切换皮肤'},
        ]
    },

    // 测试
    {
        path: '/test',
        component: Layout,
        redirect: null,
        name: "测试",
        children: [
            {path: 'componentsTest1', component: componentsTest1, meta: {requireAuth: true}, name: '测试组件1'},
            {path: 'componentsTest2', component: componentsTest2, meta: {requireAuth: true}, name: '测试组件2'},
            {path: 'sorTable', component: SorTable, meta: {requireAuth: true}, name: '测试父组件内换位'},


        ]
    },

    // 初始状态路由匹配
    {path: '/', redirect: iniView},
    {path: '*', redirect: error},

];




