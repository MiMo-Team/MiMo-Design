import Mock from 'mockjs';
import $store from '../../../store/index.js'

const DepotAddUrl = $store.state.mock.url.DepotAddUrl;

const DepotAdd = {
    'success': true,
    'DepotAdd': {
        "data": {
            'storageNum': /^[A-Z0-9]{5}[0-9]{5}[A-Z]{5}$/,                          // 入库单号
            'signer': '',                                                           // 签收人
            'localarticleNum': '',                                                  // 本地货号
            'supplierarticleNum': '',                                               // 供应商货号
            'accessories': '',                                                      // 面辅料名称
            'measureunit': '',                                                      // 计量单位
            'handleNum': '',                                                        // 操作数量
            'redbill': '',                                                          //红单
            'unitPrice': '',                                                        // 单价
            'sumMoney': '',                                                         //总金额
            "handledate": '',                                                       //日期(YY-MM-DD HH:mm:ss)
            'remarks': '',                                                          //备注
        }
    }
};

/**
 * mockTest_DepotAdd
 * @param url
 * @param tem
 */
const mockTest_DepotAdd = function (url, tem) {
    Mock.mock(url, tem);
};

export {DepotAddUrl, DepotAdd, mockTest_DepotAdd}




