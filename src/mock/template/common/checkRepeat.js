import Mock from 'mockjs';
import $store from '../../../store/index.js'

const checkRepeatUrl = $store.state.mock.url.checkRepeatUrl;

const checkRepeat = {
    "success": true,
    "check":{
        'check_pass|1-10': false,   //feedback_pass 为 false 的概率为1/11，true的概率为10/11.
    }
};
/**
 * mockTest_checkRepeat
 * @param url
 * @param tem
 */
const mockTest_checkRepeat = function (url, tem) {
    Mock.mock(url, tem);
};

export {checkRepeatUrl, checkRepeat, mockTest_checkRepeat}





