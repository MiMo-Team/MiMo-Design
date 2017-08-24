/*
 * notice - auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/3.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
export default {
    install: function (Vue, options) {
        /**
         * Pop - input box  module
         * enter in the pop-up box, submit the value to the background to do the appropriate fun
         * @param t                 this
         * @param cont              pop contnet
         * @param tit               pop tit
         * @param rule              input inspection rule
         * @param errmsg            error message
         * @param success           success callback
         * @param cancel            cancel callback
         */
        Vue.prototype.promptInput = function (t, cont, tit, rule, errmsg, success, cancel) {
            t.$prompt(cont, tit, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: rule,
                inputErrorMessage: errmsg
            }).then(
                ({value}) => {
                    success(value)
                }
            ).catch(
                ({value}) => {
                    cancel(value)
                }
            );
        };

        /**
         * based element-ui popups,make changes,so you can integrated popups
         * @param t
         * @param msg
         * @param type
         * @param speed
         * @param cb
         */
        Vue.prototype.unrepeatMsg = function (t, msg, type, speed, cb) {
            t.$message({
                message: msg, type: type, duration: speed, showClose: true,
                onClose: function () {
                    cb(t);
                }
            });
        };
    }
}
;