import Mock from 'mockjs';
import $store from '../../../store/index.js'

const fashionWeekListUrl = $store.state.mock.url.fashionWeekListUrl;

const fashionWeekList = {
    'success': true,
    'picList|90-90': [
        {
            "data": {
                /* =====================  图片编号  =====================  */
                "picId": function (n) {
                    return "mimo_pic_fashion_design_" + n.context.currentContext.author + "_" + n.context.currentContext.date + "_s_n" + n.context.currentContext.random;
                },
                'Num|+1': 1,                                                                                //编号，依次增加
                "style|1": [                                                                               //style
                    '波西米亚', '简约', '洛丽塔', 'OL',
                    '学院', '朋克', '简约', '其他', '其他', '其他',
                ],
                'timeStamp': '',
                "author": '@first @middle @last',                                                            //上传作者
                "sex|1": [                                                                                  //性别
                    'male', 'female',
                    'male', 'female', 'male', 'female'
                ],
                "fashionWeek|1": [
                    "巴黎时装周",
                    "纽约时装周",
                    "米兰时装周",
                    "伦敦时装周",
                    "阿姆斯特丹时装周",
                    "东京时装周",
                    "莫斯科时装周",
                    "罗马时装周",
                    "慕尼黑时装周",
                    "上海时装周",
                    //----------------------
                    "巴黎时装周", "纽约时装周", "米兰时装周", "伦敦时装周", "巴黎时装周", "纽约时装周", "米兰时装周", "伦敦时装周"
                ],

                'random|1-920': 1,                                                                           //1-100随机数
                'suffix': /^[a-zA-Z]{1,3}[a-zA-Z0-9]{1,3}$/,                                               //随机编号2
                /* =====================  picture url   =====================  */
                "pic": function (n) {
                    return 'http://otaflb4oo.bkt.clouddn.com/' + 'mimo/p/gallery/fashion_week/fashion_week' + n.context.currentContext.random + '.jpg';
                },
                "pic_thumb": function (n) {
                    return 'http://otaflb4oo.bkt.clouddn.com/' + 'mimo/p/gallery/fashion_week/fashion_week' + n.context.currentContext.random + '.jpg-thumb_m2.2_s300.400';
                },
                "pic_thumb_oz": function (n) {
                    return 'http://otaflb4oo.bkt.clouddn.com/' + 'mimo/p/gallery/fashion_week/fashion_week' + n.context.currentContext.random + '.jpg-thumb_m2.2_s2k.3k';
                },

                /* =====================  日期(YY-MM-DD HH:mm:ss)  =====================  */
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
                "date": function (n) {
                    const date1 = parseInt(n.context.currentContext.year) + "-" + n.context.currentContext.month + "-" + n.context.currentContext.day;
                    return date1 + " " + n.context.currentContext.t;
                },
                /* =====================  图片名字   =====================  */
                'name': function (n) {
                    return n.context.currentContext.year + '-' + n.context.currentContext.fashionWeek + '-' + 'w_' + n.context.currentContext.random + '-' + n.context.currentContext.suffix;
                },
                /* =====================  图片描述   =====================  */
                "remarks": function (n) {
                    return n.context.currentContext.year + '-' + n.context.currentContext.fashionWeek;
                },
            }
        }
    ]
};

/**
 * mockTest_fashionWeekList
 * @param url
 * @param tem
 */
const mockTest_fashionWeekList = function (url, tem) {
    Mock.mock(url, tem);
};

export {fashionWeekListUrl, fashionWeekList, mockTest_fashionWeekList}




