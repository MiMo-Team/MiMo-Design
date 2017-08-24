const getters = {
    //token
    token: state => state.user.info.token,
    //当前登录用户姓名
    name: state => state.user.info.name,
    //当前登录用户头像
    avatar: state => state.user.info.avatar,
    //当前登录用户角色
    roles: state => state.user.info.roles,
    //当前登录用户权限
    status: state => state.user.info.status,
    //当前登录用户签名
    sign: state => state.user.info.sign,
    //出入库 信息
    depot: state => state.carrier.depot,
    //侧边栏
    sidebar: state => state.toggleSideBar.sidebar,
    //历史访问模块
    visitedViews: state => state.tabView.visitedViews,

    userInfoCarrier: state => state.carrier.userInfoCarrier,
};
export default getters
