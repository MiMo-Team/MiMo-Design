import Mock from 'mockjs';
import $store from '../../../store/index.js'

const userListDataUrl = $store.state.mock.url.userListDataUrl;

const userListData = {
    'success': true,
    'user|100-100': [
        {
            "data": {
                'Num|+1': 1,                                                                                //模拟数据编号
                "jobNum": '@guid',                                                                          //工号
                "status|1": [                                                                               //权限
                    'admin', 'normalUser', 'disapply', 'disable',
                    'normalUser', 'normalUser', 'normalUser', 'normalUser', 'normalUser', 'normalUser', 'normalUser', 'normalUser', 'normalUser', 'normalUser',
                    'disapply', 'disable',
                ],
                // "status|1-100": 1,                                                                       //权限编号（概率模拟，通过后续函数处理）
                "account": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,                                               //账号
                "pass": /^[a-zA-Z0-9]{6,10}$/,                                                              //密码
                "name": '@cname',                                                                           //随机产生一个中文的姓名
                'token': /^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,     //token值
                'email': "@EMAIL",                                                                          //邮箱
                "mobile": /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/,   //手机号
                "sex|1": [                                                                                  //性别
                    'male', 'female', 'secrecy',
                    'male', 'female', 'male', 'female'
                ],
                "birthday": '@date("yyyy-MM-dd")',                                                          //出生日期
                "WeChat": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,                                                //微信号
                "role|1": [                                                                                 //角色
                    '总监','总监',
                    '设计师', '设计师助理', '设计师', '设计师助理', '设计师', '设计师助理','设计师', '设计师助理',
                    '运营经理', '运营经理', '运营经理', '运营经理', '运营经理', '运营经理',
                    '制版师', '制版师', '制版师', '制版师', '制版师','制版师','制版师',
                    '行政财务', '行政财务','行政财务','行政财务','行政财务',
                    '客服', '客服', '客服', '客服', '客服', '客服','客服', '客服', '客服', '客服', '客服', '客服',
                    '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师',
                    '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工',
                    '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工',
                    '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工', '裁缝师', '纺织工',
                    '物料管理', '仓管', '物料裁定', '物料管理', '仓管', '物料裁定', '物料管理', '仓管', '物料裁定', '物料管理', '仓管', '物料裁定',
                    '其他','其他','其他','其他','其他','其他'
                ],
                "remarks|1": ["新进员工", "基层员工", "优秀员工", "骨干员工", "进修员工"], //备注
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
 * mockTest_userListData
 * @param url
 * @param tem
 */
const mockTest_userListData = function (url, tem) {
    Mock.mock(url, tem);
};

export {userListDataUrl, userListData, mockTest_userListData}




