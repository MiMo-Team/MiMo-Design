import Mock from 'mockjs';
import $store from '../../../store/index.js'

const lineChart_revenueUrl = $store.state.mock.url.lineChart_revenueUrl;

const lineChart_revenue = {
    'success': true,
    data: {
        title: {
            text: '每日营收统计（百）',
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [{
            name: '营业收入',
            itemStyle: {
                normal: {
                    areaStyle: {}
                }
            },
            data: [367, 325, 446, 420, 367, 386, 338],
        },
            {
                name: '营业成本',
                itemStyle: {
                    normal: {
                        color: 'rgba(2, 197, 233, 0.2)',
                        lineStyle: {
                            color: 'rgba(2, 197, 233, 0.2)'
                        },
                        areaStyle: {
                            color: 'rgba(99,194,255, 0.6)'
                        }
                    }
                },
                data: [165, 146, 208, 182, 162, 202, 181],
            }
        ]
    }
};

/**
 * mockTest_lineChart_revenue
 * @param url
 * @param tem
 */
const mockTest_lineChart_revenue = function (url, tem) {
    Mock.mock(url, tem);
};

export {lineChart_revenueUrl, lineChart_revenue, mockTest_lineChart_revenue}




