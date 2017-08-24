import Mock from 'mockjs';
import $store from '../../../store/index.js'

const login_normalUrl = $store.state.mock.url.loginNormalUrl;

const login_normal = {
    'success': true,
    'flag':'login_success',               //登录模拟，我默认是正常通过账号密码验证的
    'user|1': [
        //邮箱登录
        {
            "data": {
                "grade": 0,
                "account": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,
                "name": '@cname',                                                                //随机产生一个中文的姓名
                "pass": /^[a-zA-Z0-9]{6,10}$/,
                "jobNum": '@guid',
                'token': /^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,
                'email': "@EMAIL",
                "sex|1": [                                                                                  //性别
                    'male', 'female', 'secrecy',
                    'male', 'female', 'male', 'female'
                ],
                "birthday": '@date("yyyy-MM-dd")',                                                          //出生日期
                "WeChat": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,                                                //微信号
                "mobile": /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/,   //手机号
                "roles|1": ['总监', '设计师', '设计师助理', '运营经理', '制版师', '行政财务', '客服', '裁缝师', '纺织工', '物料管理', '仓管', '物料裁定', '其他'],//角色
                "remarks|1": ["新进员工","基层员工","优秀员工","骨干员工","进修员工"], //备注
                "status": 'normalUser',
                "sign":'工作成就价值，价值体现人生',
                'random|1-100': 1,                                                                           //1-100随机数
                "avatar": function (n) {
                    return 'http://otaflb4oo.bkt.clouddn.com/' + 'mimo/p/avatar/cartoon/avatar' + n.context.currentContext.random + '.jpg-thumb_m2.2_s200.200';
                },
                /* =====================  入职日期(YY-MM-DD HH:mm:ss)  =====================  */
                'year|2005-2016': 0,
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
    ]
};
/**
 * mockTest_login_normal
 * @param url
 * @param tem
 */
const mockTest_login_normal = function (url, tem) {
    Mock.mock(url, tem);
};

export {login_normalUrl, login_normal, mockTest_login_normal}




