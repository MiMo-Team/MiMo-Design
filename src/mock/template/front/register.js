import Mock from 'mockjs';
import $store from '../../../store/index.js'

/* ================= Define url params ================= */
const registerUrl = $store.state.mock.url.registerUrl;


/* ================= Data generation template（you can custom）================= */
const register = {
    'success': true,
    'flag': 'register_success',                                 //模拟情况下：  默认 注册 成功，
};

/**
 * mockTest_register
 * @param url
 * @param tem
 */
const mockTest_register = function (url, tem) {
    Mock.mock(url, tem);
};

export {registerUrl, register, mockTest_register}




