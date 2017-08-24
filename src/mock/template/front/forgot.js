import Mock from 'mockjs';
import $store from '../../../store/index.js'

/* ================= Define url params ================= */
const baseUrl = $store.state.mock.url.baseUrl;                           //base url
const branchUrl = '/front/fgt';                               //branch url
const forgotUrl = baseUrl + branchUrl;

/* ================= Data generation template（you can custom）================= */
const forgot = {
    'success': true,
    'flag': 'forgot_success',                                 //模拟情况下：  默认 注册 成功，
};

/**
 * mockTest_forgot
 * @param url
 * @param tem
 */
const mockTest_forgot = function (url, tem) {
    Mock.mock(url, tem);
};

export {forgotUrl, forgot, mockTest_forgot}




