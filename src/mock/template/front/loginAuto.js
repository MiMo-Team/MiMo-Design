import Mock from 'mockjs';
import $store from '../../../store/index.js'

/* ================= Define url params ================= */
const loginAutoUrl = $store.state.mock.url.loginAutoUrl;

/* ================= Data generation template（you can custom）================= */
const loginAuto = {
    "success":true,
    "flag|1":[                                       //记住密码登录，模拟 返回token状态值
        "loginAuto_success",
        "loginAuto_overdue",
        "loginAuto_error",
        // ------ Allocation probability ------
        "loginAuto_success",
        "loginAuto_success",
        "loginAuto_success",
        "loginAuto_success",
        "loginAuto_success",
    ],
    "data":{
        "userinfo": {
            "jobNum": '@guid',                                                                          //工号
            "status|1": ['00', '01', '02', '03'],                                                       //权限编号
            "account": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,
            "pass": /^[a-zA-Z0-9]{6,10}$/,                                                              //密码
            "name": Mock.Random.cname(),                                                                //随机产生一个中文的姓名
            'token': /^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,     //token值
            'email|1': ["", "@EMAIL", "@EMAIL", "@EMAIL"],                                              //邮箱
            "mobile|1": ["",                                                                            //手机号
                /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/,
                /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/,
                /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/],
            "sex|1-3": 1,                                                                               //性别编号（0,1,2）
            "birthday": '@date("yyyy-MM-dd")',                                                          //出生日期
            "WeChat": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,                                                //微信号
            "remarks|1": ['设计师', '制版师', '行政财务', '客服人员', '服装设计师', '裁缝师', '仓管', '纺织工', '物料管理', '物料裁定'], //备注
            "avatar": function (n) {
                return 'http://otaflb4oo.bkt.clouddn.com/' + 'mimo/p/avatar/cartoon/avatar' + n.context.currentContext.random + '.jpg-thumb_m2.2_s200.200';
            },
            /* =====================  入职日期(YY-MM-DD HH:mm:ss)  =====================  */
            'year|2005-2017': 0,
            'm|0-12': 0,
            'd|0-30': 0,
            "month": function (n) {
                const m = parseInt(n.context.currentContext.m);
                if (m < 10) {
                    return '0' + m;
                }
                else {
                    return m;
                }
            },
            "day": function (n) {
                const d = parseInt(n.context.currentContext.d);
                if (d < 10) {
                    return '0' + d;
                }
                else {
                    return d;
                }
            },
            't': '@time("HH:mm:ss")',
            "entry_date": function (n) {
                const date1 = parseInt(n.context.currentContext.year) + "-" + n.context.currentContext.month + "-" + n.context.currentContext.day;
                return date1 + " " + n.context.currentContext.t;
            }
        }
    }
};

/**
 * mockTest_loginAuto
 * @param url
 * @param tem
 */
const mockTest_loginAuto = function (url, tem) {
    Mock.mock(url, tem);
};
//将对应变量值以 mockUrl、defData、mockTest 变量标识符形式暴露给其他文件而被读取到
export {loginAutoUrl, loginAuto, mockTest_loginAuto}




