/*=====================================================================================================================*/
/*
 * auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/3.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
/*=====================================================================================================================*/
export default {
    install: function (Vue, options) {

        /**
         * Cookie ( set get delete )
         * @type {{set: set, get: get}}
         */
        Vue.prototype.cookie = {
            set: function (key, val, time) {//设置cookie方法
                const date = new Date(); //获取当前时间
                const expiresDays = time;  //将date设置为n天以后的时间
                date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
                document.cookie = key + "=" + val + ";expires=" + date.toGMTString();  //设置cookie
            },
            get: function (key) {//获取cookie方法
                /*获取cookie参数*/
                const getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
                const arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
                let tips;  //声明变量tips
                for (let i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
                    let arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
                    if (key === arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                        tips = arr[1];   //将cookie的值赋给变量tips
                        break;   //终止for循环遍历
                    }
                }
                return tips;
            },
            delete: function (key) { //删除cookie方法
                const date = new Date(); //获取当前时间
                date.setTime(date.getTime() - 10000); //将date设置为过去的时间
                document.cookie = key + "=v; expires =" + date.toGMTString();//设置cookie
            }
        };

        /**
         *  显示转换 输入key 输出 val值
         * 1、模板对象为obj情况{ xx：yy , zz：ee }，2、模板对象为数组[ { xx:yy },{ zz:ee } ]
         * @param k                             filters 输入值，在选择器中可省略
         * @param obj                           模板对象
         * @returns {boolean}
         * @constructor
         */
        Vue.prototype.Display_KeytoVal = function (k, obj) {
            if (typeof obj === 'object') {
                if (Array.isArray(obj)) {
                    for (let i = 0; i < obj.length; i++) {
                        if (obj[i].key === k) {
                            return obj[i].val;
                        }
                    }
                }
                else {
                    return obj[k] ? obj[k] : false;
                }
            }
            else
                return false;
        };

        /**
         * 时间格式转换 （时间戳 => 指定格式（如：{y}-{m}-{d} {h}:{i}:{s}））
         * @param time                  时间戳
         * @param cFormat               格式
         * @returns {*}
         */
        Vue.prototype.parseTime = function (time, cFormat) {
            if (arguments.length === 0) {
                return null;
            }
            const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
            let date;
            if (typeof time === 'object') {
                date = time;
            } else {
                if (('' + time).length === 10) time = parseInt(time) * 1000;
                date = new Date(time);
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay()
            };
            const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
                let value = formatObj[key];
                if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
                if (result.length > 0 && value < 10) {
                    value = '0' + value;
                }
                return value || 0;
            });
            return time_str;
        };

        /**
         * yyyy-mm-dd hh-mm-ss 转换成时间戳
         * @param t
         * @param str
         * @returns {*}
         */
        Vue.prototype.gotTimeStamp = function (t, str) {
            function transdate(endTime) {
                const date = new Date();
                date.setFullYear(endTime.substring(0, 4));
                date.setMonth(endTime.substring(5, 7) - 1);
                date.setDate(endTime.substring(8, 10));
                date.setHours(endTime.substring(11, 13));
                date.setMinutes(endTime.substring(14, 16));
                date.setSeconds(endTime.substring(17, 19));
                return Date.parse(date);
            }

            const d = t.getNum(str);
            if (d.length < 14) {
                console.log("Please check the background code. Please define the data in strict format");
                return false;
            }
            else {
                return transdate(str)
            }
        };

        /**
         * 在字符串中提取数字,输出还是为字符串
         * @param str
         * @returns {string}
         */
        Vue.prototype.getNum = function (str) {
            if (typeof str === 'string') {
                return str.replace(/[^0-9]/ig, "");
            }
            else {
                return false;
            }
        };

        /**
         * 判断数组是否包含某元素
         * @param arr
         * @param obj
         * @returns {boolean}
         */
        Vue.prototype.contains = function (arr, obj) {
            let i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        };

        /**
         * all = > 所有
         * @param str
         * @returns {*}
         */
        Vue.prototype.varyAll = function (str) {
            if (typeof str === 'string') {
                if (str === "all")
                    return "所有";
                else
                    return str
            }
            else {
                return false
            }
        };

    }
}
;