import Mock from 'mockjs';
import $store from '../../../store/index.js'

const bolbackUrl = $store.state.mock.url.bolbackUrl;

const bolback = {
    "success": true,
    "check":{
        'feedback_pass|1-20': false,   //feedback_pass 为 false 的概率为1/21，true的概率为20/21.
    }
};
/**
 * mockTest_feedback
 * @param url
 * @param tem
 */
const mockTest_bolback = function (url, tem) {
    Mock.mock(url, tem);
};

export {bolbackUrl, bolback, mockTest_bolback}




