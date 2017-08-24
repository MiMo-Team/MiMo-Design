/**
 * boolean 转换 =》是 - 否
 * @param val
 * @returns {*}
 */
export function booleanTo(val) {
    if (val) {
        return '是';
    }
    else {
        return '否';
    }
}

/**
 * 时间格式转换 （时间戳 => 指定格式（如：{y}-{m}-{d} {h}:{i}:{s}））
 * @param time                  时间戳
 * @param cFormat               格式
 * @returns {*}
 */
export function parseTime(time, cFormat) {
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
}

/**
 *  显示转换 输入key 输出 val值
 * 1、模板对象为obj情况{ xx：yy , zz：ee }，2、模板对象为数组[ { xx:yy },{ zz:ee } ]
 * @param k                             filters 输入值，在选择器中可省略
 * @param obj                           模板对象
 * @returns {boolean}
 * @constructor
 */
export function Display_KeytoVal(k, obj) {
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
}













