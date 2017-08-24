import Mock from 'mockjs';
import $store from '../../../store/index.js'

/* ================= Define url params ================= */
const loginDataUrl = $store.state.mock.url.loginUrl;

/* ================= Data generation template（you can custom）================= */
const loginData = {
    'success':true,
    'flag':'login_success',               //登录模拟，我默认是正常通过账号密码验证的
    'data':{
      'token':/^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,
    }
};

/**
 * mockTest_loginData
 * @param url
 * @param tem
 */
const mockTest_loginData = function (url, tem) {
    Mock.mock(url, tem);
};
//将对应变量值以 mockUrl、defData、mockTest 变量标识符形式暴露给其他文件而被读取到
export {loginDataUrl, loginData, mockTest_loginData}




