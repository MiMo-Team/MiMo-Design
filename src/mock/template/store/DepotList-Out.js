import Mock from 'mockjs';
import $store from '../../../store/index.js'

const DepotList_OutUrl = $store.state.mock.url.DepotList_OutUrl;

const DepotList_Out = {
    'success': true,
    'DepotList|200-210': [
        {
            "data": {
                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,                                // 出库单号
                'signer': '@cname',                                                            // 签收人
                'localarticleNum': /^[A-Z0-9]{15}$/,                                          // 本地货号
                'supplierarticleNum': '',                                                     // 供应商货号
                'accessories|1': [                                                            // 面辅料名称
                    '羊绒', '羊毛', '兔毛', '羊驼毛', '人丝', '真丝', '黄麻', '亚麻', '大麻', '腈纶', '氨纶', '码',
                    '莱卡', '尼龙', '金属丝', '涂层', '竹纤维', '莫代尔', '桑蚕丝', '人棉', '榨蚕丝', '驼毛', '马海毛'
                ],
                'measureunit|1': ['米', '码'],                                              // 计量单位
                'handleNum|1-150': 0,                                                    // 操作数量
                'redbill|1-10':true,                                                    //redbill 为 false 的概率为1/11，true的概率为10/11.
                /* =====================  出库 - 单价  =====================  */
                'ten|18-98': 0,                                                 // 十位数
                'bet|0-9': 0,                                                   // 个位数
                'unitPrice': function (n) {                                     // 单价
                    return n.context.currentContext.ten + "." + n.context.currentContext.bet;
                },
                /* =====================  总金额  =====================  */
                'sumMoney': function (n) {
                    const sm = Number(n.context.currentContext.unitPrice) * parseFloat(n.context.currentContext.handleNum);
                    return sm.toFixed(1);
                },
                //获取从2010.1.1-2017.8.1的随机一个时间戳  '2005.01.01':1104508800,'2008.01.01':1199116800,'2012.01.01':1325347200,'2008.01.01':1420041600
                'handledate|1262275200-1501516800': 0,
                /* =====================  备注  =====================  */
                'remarks': function (n) {                                                                    // 备注
                    return n.context.currentContext.handledate + " 出库，面辅料名称：" +
                        n.context.currentContext.accessories + " 数量：" +
                        n.context.currentContext.handleNum + " 单价：" +
                        n.context.currentContext.unitPrice + " 总金额：" +
                        n.context.currentContext.sumMoney + " 本次操作由：" +
                        n.context.currentContext.signer + " 经手操办。"
                },
            }
        }
    ]
};

/**
 * mockTest_DepotList_Out
 * @param url
 * @param tem
 */
const mockTest_DepotList_Out = function (url, tem) {
    Mock.mock(url, tem);
};

export {DepotList_OutUrl, DepotList_Out, mockTest_DepotList_Out}




