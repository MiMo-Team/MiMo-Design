import Mock from 'mockjs';
import $store from '../../../store/index.js'

const accessoriesListUrl = $store.state.mock.url.accessoriesListUrl;

const accessoriesList = {
    'success': true,
    'accessoriesList': [
        {
            'data': {
                'key': /^[A-Z]{3,4}[0-9]{1,2}$/,
                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,                                 // 单号
                'accessories': function (n) {                                                         //面辅料名称
                    return '吊牌#' + n.context.currentContext.key;
                },
                'classification': function (n) {                                                        //所属分类
                    return '其他-吊牌-吊牌' + n.context.currentContext.key;
                },
                'measureunit|1': ['米', '码'],                                       // 计量单位
                'stock|1-150': 0,                                                    // 库存
                /* =====================  入库 - 单价  =====================  */
                'ten|18-98': 0,                                                     // 十位数
                'bet|0-9': 0,                                                       // 个位数
                'unitPrice': function (n) {                                         // 单价
                    return n.context.currentContext.ten + "." + n.context.currentContext.bet;
                },
                'sumMoney': function (n) {
                    const sm = Number(n.context.currentContext.unitPrice) * parseFloat(n.context.currentContext.stock);
                    return sm.toFixed(1);
                },

                remarks: function (n) {
                    return '面辅料名称：' + n.context.currentContext.accessories + '，索引编号：' + n.context.currentContext.key +
                        '，所属分类：' + n.context.currentContext.classification + '，库存：' + n.context.currentContext.stock +
                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney;
                }
            },
        },
        {
            'data': {
                'key': /^[A-Z]{3,4}[0-9]{1,2}$/,
                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,                                 // 单号
                'accessories': function (n) {                                                         //面辅料名称
                    return '吊牌#' + n.context.currentContext.key;
                },
                'classification': function (n) {                                                        //所属分类
                    return '其他-吊牌-吊牌' + n.context.currentContext.key;
                },
                'measureunit|1': ['米', '码'],                                       // 计量单位
                'stock|1-150': 0,                                                    // 库存
                /* =====================  入库 - 单价  =====================  */
                'ten|18-98': 0,                                                     // 十位数
                'bet|0-9': 0,                                                       // 个位数
                'unitPrice': function (n) {                                         // 单价
                    return n.context.currentContext.ten + "." + n.context.currentContext.bet;
                },
                'sumMoney': function (n) {
                    const sm = Number(n.context.currentContext.unitPrice) * parseFloat(n.context.currentContext.stock);
                    return sm.toFixed(1);
                },

                remarks: function (n) {
                    return '面辅料名称：' + n.context.currentContext.accessories + '，索引编号：' + n.context.currentContext.key +
                        '，所属分类：' + n.context.currentContext.classification + '，库存：' + n.context.currentContext.stock +
                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney;
                }
            },
        }
    ]
};

/**
 * mockTest_accessoriesList
 * @param url
 * @param tem
 */
const mockTest_accessoriesList = function (url, tem) {
    Mock.mock(url, tem);
};

export {accessoriesListUrl, accessoriesList, mockTest_accessoriesList}




