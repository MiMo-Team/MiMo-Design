/**
 * Created by 西兰花的春天 on 2017/6/6.
 */
/*  说明：
 *  插件demo，供学习使用
 *  本页面用于提供各种处理服务
 *  作者：王冬   QQ：20004604
 * */
export default {
    install: function (Vue, options) {
        // 1. 添加全局方法或属性
        // 略

        // 2. 添加全局资源
        //  时间格式化过滤器，输入内容是number或者Date对象，输出是YYYY-MM-DD HH-MM-SS
        Vue.filter('formatTime', function (value) {
            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            return new Date(value).Format("yyyy-MM-dd hh:mm:bench");
        })

        // 2. 添加全局资源
        //  添加注入组件时，是否利用console.log来通知的判断条件，也是组件实例属性
        Vue.prototype.NOTICE = true;


        // 3. 注入组件
        //  注入组件，插件加载开始前提示
        Vue.mixin({
            created: function () {
                if (this.NOTICE)
                    console.log("组件开始加载")
            },
            methods: {
                test: function () {
                    console.log("mixin test");
                }
            }
        })


        // 4. 添加实例方法
        //  返回数字是输入数字的两倍，如果不是数字或者不能隐式转换为数字，则输出null
        //  组件实例方法
        Vue.prototype.doubleNumber = function (val) {
            if (typeof val === 'number') {
                return val * 2;
            } else if (!isNaN(Number(val))) {
                return Number(val) * 2;
            } else {
                return null
            }
        }

        // 4. 添加实例方法
        //  服务组，将实例方法整合到$service中，避免命名冲突
        Vue.prototype.$service = {
            //电话号码合法性检查
            telNumberCheck: function (tel) {
                var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
                return pattern.test(tel)
            }
        }
    }
};