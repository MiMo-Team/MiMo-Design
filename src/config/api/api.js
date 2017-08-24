/*
 * api for axios
 * You can use this script to request background data, which saves a certain amount of code and faster
 * created: 2017/6/5.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*==========================================================================================================================*/

// 配置API接口地址
const root = process.env.API_ROOT;            //     config/dev.env.js 下的API_ROOT的  接口地址
import axios from 'axios'

/*==========================================================================================================================*/
// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}
/*==========================================================================================================================*/
/**
 * 接口处理函数
 * @param method            方法
 * @param url               路径（后段路径）
 * @param params            发送给后台的参数
 * @param beforeSend        发送前的函数
 * @param success           成功回调的函数
 * @param failure
 */
function apiAxios(method, url, params, beforeSend, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    else {
        params = {};
    }
    console.log(url);
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,               //data是添加到请求体（body）中的， 用于post请求
        params: method === 'GET' || method === 'DELETE' ? params : null,          //params是添加到url的请求字符串中的，用于get请求
        baseURL: root,                                        // 请求根路径
        withCredentials: false,                              // 跨域是否带Token
        timeout: 1000,
        transformRequest: [function (data) {
            if (beforeSend) {
                beforeSend(data);
            }
            else {

            }
        }]
    })
        .then(function (res) {
            if (res.data.success === true) {
                if (success) {
                    success(res.data)
                }
            } else {
                console.log('error: ' + JSON.stringify(res.data));
            }
        })
        .catch(function (err) {
            if (err) {
                let res = err.response;
                failure ? failure(err.data) : console.log('api error:you should found your code again ,maybe err ,or HTTP CODE: ' + res);
            }
        })
}
/*==========================================================================================================================*/


/*==========================================================================================================================*/
// 返回在vue模板中的调用接口
export default {
    // axios,
    get: function (url, params, beforeSend, success, failure) {
        return apiAxios('GET', url, params, beforeSend, success, failure)
    },
    post: function (url, params, beforeSend, success, failure) {
        return apiAxios('POST', url, params, beforeSend, success, failure)
    },
    put: function (url, params, beforeSend, success, failure) {
        return apiAxios('PUT', url, params, beforeSend, success, failure)
    },
    delete: function (url, params, beforeSend, success, failure) {
        return apiAxios('DELETE', url, params, beforeSend, success, failure)
    }
}



