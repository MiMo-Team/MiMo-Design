/* ------------------------  示例代码  ------------------------ */
import Mock from 'mockjs';
import $store from '../../store/index.js'

/* ================= Define url params ================= */
const baseUrl = $store.state.mock.url.baseUrl;                                      //base url
const branchUrl = "/check/repeat";                                      //branch url
const temUrl = baseUrl + branchUrl;
/* ================= Data generation template（you can custom）================= */
const tem = {
    "success": true,
    "check": "check_pass",
    'check|1': [
        {
            "num":1,
            "state": "check_pass",
        },
        {
            "num":2,
            "state": "check_notpass",
        },
        {
            "num":3,
            "state": "check_err",
        },
        {
            "num":4,
            "state": "check_pass",
        },
    ]
};

/**
 * mock-Test  模拟数据加载
 * @param tem             数据定义模板
 */
const mockTest_checkRepeat = function (tem) {
    Mock.mock(temUrl, tem);
};
//将对应变量值以 url tem、mockTest_xx 变量标识符形式暴露给其他文件而被读取到
export {temUrl, tem, mockTest_checkRepeat}

/*这里说明一下:
 1、如果模拟的接口不为 mockUrl，而是需要拼接添加其他部分的话，这里还需要将mockUrl输出出去，在应用页面中去重新改写新的url
 再作为参数给mockTest*/




