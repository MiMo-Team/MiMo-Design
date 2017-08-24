import Mock from 'mockjs';
import $store from '../../../store/index.js'

/* ================= Define url params ================= */
const adminSidebarNavUrl = $store.state.mock.url.adminSidebarNavUrl;

/* ================= Data generation template（you can custom）================= */
const adminSidebarNav = {
    'success': true,
    'data': {
        'permissions': [
            {
                modulegroup: "账户管理",
                icon: "group",
                modulegroup_order: '1',
                module: [
                    {id: "1-1", "display_name": "账户管理", "moduleorder": "1", "path": "/adm"},
                    {id: "1-2", "display_name": "用户列表", "moduleorder": "2", "path": "/adm/admin"},
                    {id: "1-3", "display_name": "添加新用户", "moduleorder": "3", "path": "/adm/add"},
                    {id: "1-3", "display_name": "通告管理", "moduleorder": "4", "path": "/adm/adminac"},
                ]
            },
            {
                modulegroup: "个人中心",
                icon: "addressbook",
                modulegroup_order: '2',
                module: [
                    {id: "2-1", "display_name": "个人信息", "moduleorder": "1", "path": "/user/usere"},
                    {id: "2-2", "display_name": "消息", "moduleorder": "2", "path": "/user/msg"},
                    {id: "2-3", "display_name": "内部通告", "moduleorder": "3", "path": "/user/ac"},
                ]
            },
            {
                modulegroup: "产品企划",
                icon: "task",
                modulegroup_order: '3',
                module: [
                    {id: "3-1", "display_name": "产品企划方案", "moduleorder": "1", "path": "/product-Planning/index"}
                ]
            },
            {
                modulegroup: "面辅料仓库",
                icon: "flip",
                modulegroup_order: '4',
                module: [
                    {id: "4-1", "display_name": "分类管理", "moduleorder": "1", "path": "/storage/classify"},
                    {id: "4-2", "display_name": "面辅料目录", "moduleorder": "2", "path": "/storage/accessoriesList"},
                    {id: "4-3", "display_name": "入库单", "moduleorder": "3", "path": "/storage/depotin"},
                    {id: "4-4", "display_name": "出库单", "moduleorder": "4", "path": "/storage/depotout"},
                    {id: "4-5", "display_name": "月度结余", "moduleorder": "5", "path": "/storage/add"},
                ]
            },
            {
                modulegroup: "款式研发",
                icon: "stealth",
                modulegroup_order: '4',
                module: [
                    {id: "5-1", "display_name": "款式初稿", "moduleorder": "1", "path": "/bench"},
                    {id: "5-2", "display_name": "初稿审核", "moduleorder": "2", "path": "/front/login",},
                    {id: "5-3", "display_name": "配面辅料", "moduleorder": "3", "path": "/front/login",},
                    {id: "5-4", "display_name": "面辅料评审", "moduleorder": "4", "path": "/front/login",},
                    {id: "5-5", "display_name": "款式制版", "moduleorder": "5", "path": "/front/login",},
                    {id: "5-6", "display_name": "裁剪面料", "moduleorder": "6", "path": "/front/login",},
                    {id: "5-7", "display_name": "缝制样衣", "moduleorder": "7", "path": "/front/login",},
                    {id: "5-8", "display_name": "版型评审", "moduleorder": "8", "path": "/front/login",}
                ]
            },

            {
                modulegroup: "流程管理",
                icon: "flip",
                modulegroup_order: '6',
                module: [
                    {
                        id: "6-1",
                        "display_name": "流程管理",
                        "moduleorder": "1",
                        "path": "/front/login",
                    }
                ]
            },
            {
                modulegroup: "设置",
                icon: "setup",
                modulegroup_order: '7',
                module: [
                    {
                        id: "7-1",
                        "display_name": "修改密码",
                        "moduleorder": "1",
                        "path": "/setting/modifypass",
                    },
                    {
                        id: "7-2",
                        "display_name": "切换皮肤",
                        "moduleorder": "2",
                        "path": "/setting/skin",
                    },
                ]
            },
            {
                modulegroup: "图库",
                icon: "picture",
                modulegroup_order: '8',
                module: [
                    {
                        id: "8-1",
                        "display_name": "图片素材",
                        "moduleorder": "1",
                        "path": "/p/index"
                    },
                    {
                        id: "8-2",
                        "display_name": "时装周",
                        "moduleorder": "2",
                        "path": "/p/fw"
                    },
                    {
                        id: "8-3",
                        "display_name": "原始代码",
                        "moduleorder": "4",
                        "path": "/p/fw2"
                    },
                    {
                        id: "8-4",
                        "display_name": "测试",
                        "moduleorder": "4",
                        "path": "/p/t"
                    }
                ]
            },
        ]
    }
};

/**
 * mockTest_adminSidebarNav
 * @param url
 * @param tem             数据定义模板
 */
const mockTest_adminSidebarNav = function (url, tem) {
    Mock.mock(url, tem);
};
//将对应变量值以 mockUrl、defData、mockTest 变量标识符形式暴露给其他文件而被读取到
export {adminSidebarNavUrl, adminSidebarNav, mockTest_adminSidebarNav}

/*这里说明一下:
 1、若如果模拟的接口为 mockUrl，则直接输出export {roleMenuData, mockTest}即可。
 2、如果模拟的接口不为 mockUrl，而是需要拼接添加其他部分的话，这里还需要将mockUrl输出出去，在应用页面中去重新改写新的url
 再作为参数给mockTest*/




