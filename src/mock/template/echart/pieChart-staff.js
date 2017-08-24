import Mock from 'mockjs';
import $store from '../../../store/index.js'

const pieChart_staffUrl = $store.state.mock.url.pieChart_staffUrl;

const pieChart_staff = {
    'success': true,
    data: {
        title: {
            text: '在职人员架构缩略图',
        },
        legend: {
            data: [
                '纺织工、物料裁定、裁缝师、纺织工等', '客服、售后', '制版师', '设计师及设计师助理', '其他',
                '运营经理', '仓储、运维', '行政财务', '总监'
            ]
        },
        series: [
            {
                name: '在职人员架构缩略图',
                data: [
                    {value: 50, name: '纺织工、物料裁定、裁缝师、纺织工等'},
                    {value: 18, name: '客服、售后'},
                    {value: 14, name: '制版师'},
                    {value: 12, name: '设计师及设计师助理'},
                    {value: 10, name: '其他'},
                    {value: 8, name: '运营经理'},
                    {value: 8, name: '仓储、运维'},
                    {value: 6, name: '行政财务'},
                    {value: 2, name: '总监'}
                ]
            }
        ]
    }
};

/**
 * mockTest_pieChart_staff
 * @param url
 * @param tem
 */
const mockTest_pieChart_staff = function (url, tem) {
    Mock.mock(url, tem);
};

export {pieChart_staffUrl, pieChart_staff, mockTest_pieChart_staff}




