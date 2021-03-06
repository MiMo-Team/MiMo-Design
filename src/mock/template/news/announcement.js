import Mock from 'mockjs';
import $store from '../../../store/index.js'

const announcementUrl = $store.state.mock.url.announcementUrl;

const announcement = {
    'success': true,
    'announcement|50-50': [
        {
            "data": {
                'title|1': [                                                                        // 通告标题
                    '本月考核确认表',
                    '本月工资发放确认表',
                    '本月绩效考核确认表',
                    '关于本月优秀员工评选征集结果一览',
                    '各部门研讨会结果一览',
                    '年会相关工作准备情况',
                    '下月区领导来我莅临指导安排情况',
                    '第一季度时长营销文案总结汇总',
                    '轻影秀雅市场考察地区研讨结果（一）',
                    '轻影秀雅市场考察地区研讨结果（二）',
                    '市场部-第二分组-杭州地区4月交易数据汇报',
                    '财务部-前三季度-杭州地区4月交易数据汇报',
                    '小组内部方案初步设想',
                    '市场部-第一分组-杭州地区4月交易数据汇报',
                    '市场部-第四分组-杭州地区4月交易数据汇报',
                    '本月部门内部赏罚制度执行结果及工作总结',
                    '关于下半年服装行业分析(一)',
                    '关于下半年服装行业分析(二)',
                    '杭州地区上半年面辅料加工价格走势',
                    '长三角地区服装设计行业增幅说明',
                    '关于本公司与mimo，伊芙丽等品牌合作款式一览',
                    '上半年天猫营收销量一览',
                ],
                'type|1': ['AD', 'DS', 'PD', 'OR', 'WAR', 'CT', 'PI', 'OT'],                           // 通告类型
                'author': '@cname',                                                                          // 发布者
                'auditor|1': ['西兰花的春天', '海星和月钱', 'gcx'],                                                                         //审核人
                'importance|1': [1, 2, 3, 4, 5],                                                             //重要性
                'pageviews|1-100': 0,                                                                    //阅读数
                'status|1': ['published', 'draft', 'off'],                                                 //通告状态
                'content|1': [
                    'MiMo，著名时装品牌，由古Broccoli spring创办。MiMo的产品包括时装、皮具、皮鞋、手表、领带、丝巾、香水、家居用品及宠物用品等，' +
                    'MiMo品牌时装一向以高档、豪华、性感而闻名于世，以“身份与财富之象征”品牌形象成为富有的上流社会的消费宠儿，一向被商界人士垂青，' +
                    '时尚之余不失高雅。',
                ],
                /* =====================  发布日期(YY-MM-DD HH:mm:ss)  =====================  */
                //获取从2010.1.1-2017.8.1的随机一个时间戳  '2005.01.01':1104508800,'2008.01.01':1199116800,'2012.01.01':1325347200,'2008.01.01':1420041600
                'timestamp|1262275200-1501516800': 0,
                'forecast': '',
            }
        }
    ]
};

/**
 * mockTest_announcement
 * @param url
 * @param tem
 */
const mockTest_announcement = function (url, tem) {
    Mock.mock(url, tem);
};

export {announcementUrl, announcement, mockTest_announcement}




