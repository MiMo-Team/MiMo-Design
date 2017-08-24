import Mock from 'mockjs';
import $store from '../../../store/index.js'

const login_firstUrl = $store.state.mock.url.loginFirstUrl;


const login_first = {
    'success': true,
    'flag':'login_success',               //登录模拟，我默认是正常通过账号密码验证的
    'user|1': [
        //邮箱登录
        {
            "data": {
                "grade": 0,
                "account": "",
                "name":'',
                "pass": /^[a-zA-Z0-9]{6,10}$/,
                "jobNum": '@guid',
                'token': /^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,
                'email': "@EMAIL",
                "sex": "",
                "birthday": "",
                "WeChat": "",
                "mobile": "",
                "roles": '',                         //角色
                "remarks": "",
                "sign":'',
                "status": 'normalUser',
                "avatar": '',
                "entry_date":''
            }
        },
        //手机登录
        {
            "data": {
                "grade": 0,
                "account": "",
                "name":'',
                "pass": /^[a-zA-Z0-9]{6,10}$/,
                "jobNum": '@guid',
                'token': /^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,
                'email': "",
                "sex": "",
                "birthday": "",
                "WeChat": "",
                "mobile": /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/,
                "roles": '',                         //角色
                "remarks": "",
                "sign":'',
                "status": 'normalUser',
                "avatar": '',
                "entry_date":''
            }
        },
        //账号登录
        {
            "data": {
                "grade": 0,
                "account": /^[a-zA-Z]{1,3}[a-zA-Z0-9]{5,7}$/,
                "name":'',
                "pass": /^[a-zA-Z0-9]{6,10}$/,
                "jobNum": '@guid',
                'token': /^Gcx_broccoliSpring_[a-zA-Z0-9]{10,12}_HelloNicetoMeetyou_myWechat_lensgcx$/,
                'email': "",
                "sex": "",
                "birthday": "",
                "WeChat": "",
                "mobile": "",
                "roles": '',                         //角色
                "remarks": "",
                "sign":'',
                "status": 'normalUser',
                "avatar": '',
                "entry_date":''
            }
        }
    ]
};
/**
 * mockTest_login_first
 * @param url
 * @param tem
 */
const mockTest_login_first = function (url, tem) {
    Mock.mock(url, tem);
};

export {login_firstUrl, login_first, mockTest_login_first}




