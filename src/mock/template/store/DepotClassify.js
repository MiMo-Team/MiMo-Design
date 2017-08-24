import Mock from 'mockjs';
import $store from '../../../store/index.js'

const DepotClassifyUrl = $store.state.mock.url.DepotClassifyUrl;

const DepotClassify = {
    'success': true,
    'DepotClassify': {
        'data': [
            //面料
            {
                classification: '面料',
                accessories: '面料',
                storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                remarks:'一级大类',
                measureunit:'-',
                stock:'-',
                unitPrice:'-',
                sumMoney:'-',
                children: [
                    {
                        classification: '面料-毛',
                        accessories: '毛',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|5': [
                            {
                                'accessories|+1': ['羊绒', '羊毛', '兔毛', '羊驼毛', '马海毛'],
                                classification: function (n) {
                                    return '面料-毛-' + n.context.currentContext.accessories
                                },
                                'measureunit|1': ['米', '码'],
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '面料-棉',
                        accessories: '棉',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|4':[
                            {
                                'accessories|+1': ['人棉','长绒棉','脱脂棉','公仔棉'],
                                classification: function (n) {
                                    return '面料-棉-' + n.context.currentContext.accessories
                                },
                                'measureunit|1': ['米', '码'],
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '面料-麻',
                        accessories: '麻',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|3': [
                            {
                                'accessories|+1': ['黄麻', '亚麻', '大麻'],
                                classification: function (n) {
                                    return '面料-麻-' + n.context.currentContext.accessories
                                },
                                'measureunit|1': ['米', '码'],
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '面料-丝',
                        accessories: '丝',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|4': [
                            {
                                'accessories|+1': ['人丝', '真丝', '金属丝', '桑蚕丝'],
                                classification: function (n) {
                                    return '面料-丝-' + n.context.currentContext.accessories
                                },
                                'measureunit|1': ['米', '码'],
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '面料-合成材料',
                        accessories: '合成材料',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|6': [
                            {
                                'accessories|+1': ['腈纶', '氨纶', '莱卡', '尼龙', '榨蚕丝', '莫代尔'],
                                classification: function (n) {
                                    return '面料-合成材料-' + n.context.currentContext.accessories
                                },
                                'measureunit|1': ['米', '码'],
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '面料-其他',
                        accessories: '其他',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|2': [
                            {
                                'accessories|+1': ['竹纤维', '涂层'],
                                classification: function (n) {
                                    return '面料-其他-' + n.context.currentContext.accessories
                                },
                                'measureunit|1': ['米', '码'],
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                ]
            },
            //辅料
            {
                classification: '辅料',
                accessories: '辅料',
                storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                remarks:'一级大类',
                measureunit:'-',
                stock:'-',
                unitPrice:'-',
                sumMoney:'-',
                children: [
                    {
                        classification: '辅料-拉链',
                        accessories: '拉链',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|4-5': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return '拉链#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '辅料-拉链-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['袋', '米'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|5-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '辅料-纽扣',
                        accessories: '纽扣',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|2-3': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return '纽扣#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '辅料-纽扣-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['袋', '公斤'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|10-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '辅料-皮筋',
                        accessories: '皮筋',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|1-3': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return '皮筋#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '辅料-皮筋-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['袋', '米'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|5-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                ]
            },
            //其他
            {
                classification: '其他',
                accessories: '其他',
                storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                remarks:'一级大类',
                measureunit:'-',
                stock:'-',
                unitPrice:'-',
                sumMoney:'-',
                children: [
                    {
                        classification: '其他-吊牌',
                        accessories: '吊牌',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|2-4': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return '吊牌#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '其他-吊牌-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['袋', '盒'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|5-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '其他-LOGO',
                        accessories: 'LOGO',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|2-4': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return 'LOGO#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '其他-LOGO-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['袋', '盒'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|5-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '其他-包装（纸板）',
                        accessories: '包装（纸板）',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|1-3': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return '包装（纸板）#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '其他-包装（纸板）-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['捆', '公斤'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|5-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    },
                    {
                        classification: '其他-包装（袋）',
                        accessories: '包装（袋）',
                        storageNum: /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                        key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                        remarks:'二级大类',
                        measureunit:'-',
                        stock:'-',
                        unitPrice:'-',
                        sumMoney:'-',
                        'children|1-3': [
                            {
                                key: /^[A-Z]{3,4}[0-9]{1,2}$/,
                                'accessories': function (n) {
                                    return '包装（袋）#' + n.context.currentContext.key;
                                },
                                'classification': function (n) {
                                    return '其他-包装（袋）-' + n.context.currentContext.accessories;
                                },
                                'measureunit|1': ['捆', '公斤'],
                                'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,
                                'stock|1-150': 0,
                                operator: '@cname',
                                /* =====================  入库 - 单价  =====================  */
                                'ten|5-98': 0,                                                     // 十位数
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
                                        '，单价：' + n.context.currentContext.unitPrice + '，库存总额：' + n.context.currentContext.sumMoney ;
                                }
                            }
                        ]
                    }
                ]
            }],
    }
};

/**
 * mockTest_DepotClassify
 * @param url
 * @param tem
 */
const mockTest_DepotClassify = function (url, tem) {
    Mock.mock(url, tem);
};

export {DepotClassifyUrl, DepotClassify, mockTest_DepotClassify}




