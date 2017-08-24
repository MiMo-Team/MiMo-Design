/*
 * regular expression validation
 * you can use this form-validation for this project,as an extension script.
 * created: 2017/6/5.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */

/*===================================== 条件检测  =====================================================================================*/
/**
 * 验证长度为  x-y  的字符串
 * @param val
 * @param start
 * @param end
 * @returns {boolean}
 */
const lengthCheck = (val, start, end) => {
    // let value = val.replace(/\s/g, "");
    // let reg =/^.{6,20}$/;
    let reg = new RegExp("^.{" + start + "," + end + "}$");
    return reg.test(val);
};

/**
 * 验证由数字和26个英文字母组成的字符串
 * @param val
 * @returns {boolean}
 */
const NumEnCheck = (val) => {
    let reg = /^[A-Za-z0-9]+$/;        //验证由数字和26个英文字母组成的字符串
    return reg.test(val);
};
/**
 * 必须 ！同时包含! 数字和26个英文字母
 * @param val
 * @returns {boolean}
 */
const NumEnBothCheck = (val) => {
    let reg =  /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{2,}$/;
    return reg.test(val);
};

/**
 * 不能为纯数字
 * @param val
 * @returns {boolean}
 */
const notAllNumCheck = (val) => {
    let reg =  /^\w*[a-zA-Z]+\w*$/;
    return reg.test(val);
};
/**
 * 数字格式
 * @param val
 * @returns {boolean}
 */
const numCheck = (val) => {
    let reg = /^[0-9.]+$/;        //验证由数字和.组成的字符串
    return reg.test(val);
};

/*===================================== 表单检测  =====================================================================================*/
/**
 * 验证用户名
 * @param val
 * @returns {boolean}
 */
const idCheck = (val) => {
    let reg = /^[a-zA-Z0-9_]{4,16}$/;        //含有数字，英文字母和_，，4-16位
    return reg.test(val);
};

/**
 * 验证密码
 * @param val
 * @returns {boolean}
 */
const passCheck = (val) => {
    // let reg = /^[a-zA-Z0-9_*/.`~]{6,20}$/;                                  //含有数字和英文字母以及特殊字符 _*/.`~    ，6-20位
    // let reg =  /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,20}$/;              //同时含有数字和英文字母，不含特殊字符，6-20位
    let reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9_*/.`~]{6,20}$/;        //同时含有数字和英文字母，可以特殊字符  _*/.`~   ，6-20位
    return reg.test(val);
};
/**
 * 验证邮箱
 * @param val
 * @returns {boolean}
 */
const emailCheck = (val) => {
    let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(val);
};

/**
 * 验证Mobilephone（国内手机）
 * @param val
 * @returns {boolean}
 */
const mobilCheck = (val) => {
    let reg = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/;    //格式：13（1-9），147，15（8-9），18（0-9）。
    return reg.test(val);
};

/**
 * 验证tel固定电话（国内固定电话）
 * @param val
 * @returns {boolean}
 */
const telCheck = (val) => {
    let reg = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;   //格式：XXXX-XXXXXXXX，XXXXXXX，XXX-XXXXXXX。
    return reg.test(val);
};

/**
 * 验证fax传真
 * @param val
 * @returns {boolean}
 */
const faxCheck = (val) => {
    let reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;   //格式：+123 -999 999 ； +123-999 999 ；123 999 999 ；+123 999999 ；05718888888
    return reg.test(val);
};

/**
 * 验证日期格式
 * @param val
 * @returns {boolean}
 */
const dateCheck = (val) => {
    let reg = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;     //格式：xxxx-xx-xx
    return reg.test(val);
};

/**
 * 验证身份证
 * @param val
 * @returns {boolean}
 */
const cardedCheck = (val) => {
    //身份证17或者18位
    let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    return reg.test(val);
};

/**
 * 验证网址
 * @param val
 * @returns {boolean}
 */
const webCheck = (val) => {
    //网址以http://https://开头，或者www开头（不严谨，但考虑用户习惯，这里予以保留，根据项目予以考虑）
    let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|[Ww]{3}.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    return reg.test(val);
};

/**
 * 验证QQ
 * @param val
 * @returns {boolean}
 */
const QQCheck = (val) => {
    let reg = /^[1-9][0-9]{4,14}$/;    //以非零数字开头，从10000开始
    return reg.test(val);
};


/*========================================================================================================================================*/
export {
    lengthCheck,
    NumEnCheck,
    NumEnBothCheck,
    notAllNumCheck,
    numCheck,

    idCheck,
    passCheck,
    emailCheck,
    mobilCheck,
    telCheck,
    faxCheck,
    dateCheck,
    cardedCheck,
    webCheck,
    QQCheck,
}