import Mock from 'mockjs';
import $store from '../../../store/index.js'

const barChart_billMovingUrl = $store.state.mock.url.barChart_billMovingUrl;

const barChart_billMoving = {
    'success': true,
    data: {
        title: {
            text: '每日进出库总量'
        },
        xAxis: [
            {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            }
        ],
        series: [
            {
                name: '仓库存量总数',
                data: [200, 250, 250, 290, 400, 330, 280],
            },
            {
                name: '入库总数',
                data: [80, 52, 100, 232, 150, 230, 60],
            },
            {
                name: '出库总数',
                data: [30, 52, 60, 122, 220, 280, 60],
            }
        ]
    }
};

/**
 * mockTest_barChart_billMoving
 * @param url
 * @param tem
 */
const mockTest_barChart_billMoving = function (url, tem) {
    Mock.mock(url, tem);
};

export {barChart_billMovingUrl, barChart_billMoving, mockTest_barChart_billMoving}




