import Mock from 'mockjs';
import $store from '../../../store/index.js'

/* ================= Define url params ================= */
const userSidebarNavUrl = $store.state.mock.url.userSidebarNavUrl;

/* ================= Data generation template（you can custom）================= */
const userSidebarNav = {
    'success': true,
    'data': {
        'permissions': [
            {
                modulegroup: "个人中心",
                icon: "addressbook",
                modulegroup_order: '1',
                module: [
                    {id: "1-1", "display_name": "个人信息", "moduleorder": "1", "path": "/user/usere"},
                    {id: "1-2", "display_name": "消息", "moduleorder": "2", "path": "/user/msg"},
                    {id: "1-3", "display_name": "内部通告", "moduleorder": "3", "path": "/user/ac"},
                ]
            },
            {
                modulegroup: "产品企划",
                icon: "task",
                modulegroup_order: '2',
                module: [
                    {id: "2-1", "display_name": "产品企划方案", "moduleorder": "1", "path": "/product-Planning/index"}
                ]
            },
            {
                modulegroup: "面辅料仓库",
                icon: "flip",
                modulegroup_order: '3',
                module: [
                    {id: "3-1", "display_name": "分类管理", "moduleorder": "1", "path": "/storage/classify"},
                    {id: "3-2", "display_name": "面辅料目录", "moduleorder": "2", "path": "/storage/accessoriesList"},
                    {id: "3-3", "display_name": "入库单", "moduleorder": "3", "path": "/storage/depotin"},
                    {id: "3-4", "display_name": "出库单", "moduleorder": "4", "path": "/storage/depotout"},
                    {id: "3-5", "display_name": "月度结余", "moduleorder": "5", "path": "/unfinished"},
                ]
            },
            {
                modulegroup: "款式研发",
                icon: "stealth",
                modulegroup_order: '4',
                module: [
                    {id: "4-1", "display_name": "款式初稿", "moduleorder": "1", "path": "/unfinished"},
                    {id: "4-2", "display_name": "初稿审核", "moduleorder": "2", "path": "/unfinished",},
                    {id: "4-3", "display_name": "配面辅料", "moduleorder": "3", "path": "/unfinished",},
                    {id: "4-4", "display_name": "面辅料评审", "moduleorder": "4", "path": "/unfinished",},
                    {id: "4-5", "display_name": "款式制版", "moduleorder": "5", "path": "/unfinished",},
                    {id: "4-6", "display_name": "裁剪面料", "moduleorder": "6", "path": "/unfinished",},
                    {id: "4-7", "display_name": "缝制样衣", "moduleorder": "7", "path": "/unfinished",},
                    {id: "4-8", "display_name": "版型评审", "moduleorder": "8", "path": "/unfinished",}
                ]
            },

            {
                modulegroup: "流程管理",
                icon: "flip",
                modulegroup_order: '5',
                module: [
                    {
                        id: "5-1",
                        "display_name": "流程管理",
                        "moduleorder": "1",
                        "path": "/unfinished",
                    }
                ]
            },
            {
                modulegroup: "设置",
                icon: "setup",
                modulegroup_order: '6',
                module: [
                    {
                        id: "6-1",
                        "display_name": "修改密码",
                        "moduleorder": "1",
                        "path": "/setting/modifypass",
                    },
                    {
                        id: "6-2",
                        "display_name": "切换皮肤",
                        "moduleorder": "2",
                        "path": "/setting/skin",
                    },
                ]
            },
            {
                modulegroup: "图库",
                icon: "picture",
                modulegroup_order: '7',
                module: [
                    {
                        id: "7-1",
                        "display_name": "图片素材",
                        "moduleorder": "1",
                        "path": "/p/index"
                    },
                    {
                        id: "7-2",
                        "display_name": "时装周",
                        "moduleorder": "2",
                        "path": "/p/fw"
                    },
                    {
                        id: "7-3",
                        "display_name": "原始代码",
                        "moduleorder": "4",
                        "path": "/p/fw2"
                    },
                    {
                        id: "7-4",
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
 * mockTest_userSidebarNav
 * @param url
 * @param tem             数据定义模板
 */
const mockTest_userSidebarNav = function (url, tem) {
    Mock.mock(url, tem);
};
//将对应变量值以 mockUrl、defData、mockTest 变量标识符形式暴露给其他文件而被读取到
export {userSidebarNavUrl, userSidebarNav, mockTest_userSidebarNav}

/*这里说明一下:
 1、若如果模拟的接口为 mockUrl，则直接输出export {roleMenuData, mockTest}即可。
 2、如果模拟的接口不为 mockUrl，而是需要拼接添加其他部分的话，这里还需要将mockUrl输出出去，在应用页面中去重新改写新的url
 再作为参数给mockTest*/




