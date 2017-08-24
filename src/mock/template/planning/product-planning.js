import Mock from 'mockjs';
import $store from '../../../store/index.js'

const producPlanningUrl = $store.state.mock.url.producPlanningUrl;

const producPlanning = {
    'success': true,
    'producPlanning|50-50': [
        {
            "data": {
                'title|1': [                                                                        // 通告标题
                    'MiMo第一季度服装设计市场策划书',
                    'MiMo第二季度服装设计市场策划书',
                    'MiMo第三季度服装设计市场策划书',
                    'MiMo第四季度服装设计市场策划书',
                    'MiMo夏季天猫爆款推广营销策划书',
                    'MiMo年度供应商合作推广策划书',
                    'MiMo布局三方服装设计服务策划书',
                    'MiMo制造生产效率提升策划方案',
                    'MiMo布局杭州服装设计领发展策划书',
                    '关于MiMo新三板股权分配方案策划书',
                    '关于MiMo融资方案策划书',
                    'MiMo上半年产品市场反馈分析',
                    'MiMo下半年产品市场反馈分析',
                    'MiMo冬季季天猫爆款推广营销策划书',
                    'MiMo春季季天猫爆款推广营销策划书',
                    'MiMo秋季季天猫爆款推广营销策划书',
                    'MiMo与伊芙丽合作市场开发策划',
                ],
                'type|1': ['market', 'marketing', 'design', 'cooperation', 'operate', 'other'],                           // 通告类型
                'author': '@cname',                                                                          // 发布者
                'auditor|1': ['西兰花的春天', '海星和月钱', 'gcx'],                                                                         //审核人
                'importance|1': [1, 2, 3, 4, 5],                                                             //重要性
                'pageviews|1-100': 0,                                                                    //阅读数
                'status|1': ['pass', 'checking', 'unpass'],                                                 //通告状态
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
 * mockTest_producPlanning
 * @param url
 * @param tem
 */
const mockTest_producPlanning = function (url, tem) {
    Mock.mock(url, tem);
};

export {producPlanningUrl, producPlanning, mockTest_producPlanning}




