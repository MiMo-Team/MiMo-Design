import Cookies from 'js-cookie';


const baseUrl = "http://BroccoliSpring/gcx/api";
const mock = {
    state: {
        url: {
            baseUrl: "http://BroccoliSpring/gcx/api",

            //重复验证
            checkRepeatUrl: baseUrl + '/check/repeat',
            //提交布尔返回
            bolbackUrl: baseUrl + '/check/b',


            /* ================ 登录 注册 ================ */
            //登录 （第一次登录）
            loginFirstUrl: baseUrl + '/front/loginfirst',
            //登录 （普通用户登录）
            loginNormalUrl: baseUrl + '/front/loginnormal',
            //登录 （管理员登录）
            loginAdminUrl: baseUrl + '/front/loginadmin',
            //注册
            registerUrl: baseUrl + '/check/b',
            //记住密码
            loginAutoUrl: baseUrl + '/front/login2',


            /* ================ 管理员 ================ */
            //管理员 - 用户列表
            userListDataUrl: baseUrl + '/admin/userlist',
            //管理员 - 搜索用户
            userFullDataUrl: baseUrl + '/admin/searchuser',
            //管理员 - 修改用户信息
            userInfoEditUrl:baseUrl + '/check/b',
            //管理员 - 新增用户
            userInfoAddUrl:baseUrl + '/check/b',
            //管理员 - 侧边栏菜单
            adminSidebarNavUrl: baseUrl + '/admin/role/menu',


            /* ================ 个人信息 ================ */
            //个人信息
            personal_infoUrl: baseUrl + '/user/userinfo',
            //普通用户 - 侧边栏菜单
            userSidebarNavUrl: baseUrl + '/user/role/menu',
            //普通用户 - 修改个人信息
            personalInfoEditUrl:baseUrl + '/check/b',
            // ---------- 内部通告 ----------
            // 获取内部通告信息
            announcementUrl: baseUrl + '/user/announcement',
            // 内部通告信息 新增
            announcementCreate: baseUrl + '/check/b',
            // 内部通告信息 修改
            announcementEdit: baseUrl + '/check/b',
            // ---------- 消息 ----------
            // 获取信息
            messageUrl: baseUrl + '/user/message',
            // 消息 发送
            messageSend: baseUrl + '/check/b',
            // 消息 回复
            messageAnswer: baseUrl + '/check/b',


            /* ================ 产品企划 ================ */
            //产品企划
            producPlanningUrl: baseUrl + '/product/planning',


            /* ================ 面辅料仓库 ================ */
            //新增进/出库单（加载基础信息）
            DepotAddUrl: baseUrl + '/store/add',
            //面辅料入库
            DepotList_InUrl: baseUrl + '/store/in/data',
            //面辅料入库 搜索信息
            DepotList_In_SearchUrl: baseUrl + '/store/in/searchdata',
            //面辅料出库
            DepotList_OutUrl: baseUrl + '/store/out/data',
            //面辅料出库 搜索信息
            DepotList_Out_SearchUrl: baseUrl + '/store/out/searchdata',
            //仓储分类 列表
            DepotClassifyUrl: baseUrl + '/store/classify',
            //分类 管理 增加
            DepotClassifyAdd: baseUrl + '/check/b',
            //分类 管理 修改
            DepotClassifyEdit: baseUrl + '/check/b',
            //分类 管理 删除
            DepotClassifyDelete: baseUrl + '/check/b',
            //分类 面辅料 增加
            DepotAccessoriesAdd: baseUrl + '/check/b',
            //分类 面辅料 编辑
            DepotAccessoriesEdit: baseUrl + '/check/b',
            //分类 面辅料 删除
            DepotAccessoriesDelete: baseUrl + '/check/b',


            /* ================ 图库 ================ */
            //图库 - 时装周列表
            fashionWeekListUrl: baseUrl + '/pic/all/upload',
            //图库 - 时装周大图
            fashionWeekDataUrl: baseUrl + '/pic/normal/full',


            /* ================ 设置 ================ */
            //修改密码 - 检查旧密码是否匹配
            checkOldPassUrl: baseUrl + '/check/b',
            //修改密码
            passwordModifyUrl:baseUrl + '/check/b',




            /* ================ 主页可视化数据 ================ */
            //在职人员架构缩略图
            pieChart_staffUrl: baseUrl + '/home/visualization/staff',
            //每日进出库总量
            barChart_billMovingUrl: baseUrl + '/home/visualization/store',
            //每日营收统计
            lineChart_revenueUrl: baseUrl + '/home/visualization/revenue',
        },
    },

    mutations: {},
    actions: {}
};

export default mock;
