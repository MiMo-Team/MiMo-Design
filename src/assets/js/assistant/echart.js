/*
 * auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/3.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
export default {
    install: function (Vue, options) {


        /**
         * pie - echart data ajax-loading
         * @param t                 this
         * @param url
         * @param param
         * @param filter            call back function
         */
        Vue.prototype.pieChart = function (t, url, param, filter) {
            t.axios.post(url, param, data => {
                },
                r => {
                    let d = r.data;
                    for (let i = 0; i < d.series.length; i++) {
                        d.series[i].type = 'pie';
                        d.series[i].roseType = 'radius';
                        d.series[i].animationEasing = 'cubicInOut';
                        d.series[i].animationDuration = 2600;
                    }
                    t.pie_chart_data = d;
                    filter(r);
                }
            );
        };


        /**
         * bar - echart data ajax-loading
         * @param t                 this
         * @param url
         * @param param
         * @param sbw               series-barWidth
         * @param filter            call back function
         */
        Vue.prototype.barChart = function (t, url, param, sbw, filter) {
            t.axios.post(url, param, data => {
                },
                r => {
                    let d = r.data;
                    for (let i = 0; i < d.xAxis.length; i++) {
                        d.xAxis[i].type = 'category';
                        d.xAxis[i].axisTick = {};
                        d.xAxis[i].axisTick.containLabel = true;
                    }
                    for (let i = 0; i < d.series.length; i++) {
                        d.series[i].type = 'bar';
                        d.series[i].stack = 'vistors';
                        d.series[i].barWidth = sbw;
                    }
                    t.bar_chart_data = d;
                    filter(r);
                }
            );
        };

        /**
         * line - echart data ajax-loading
         * @param t                 this
         * @param url
         * @param param
         * @param filter            call back function
         */
        Vue.prototype.lineChart = function (t, url, param, filter) {
            t.axios.post(url, param, data => {
                },
                r => {
                    let d = r.data;
                    for (let i = 0; i < d.series.length; i++) {
                        d.series[i].smooth = true;
                        d.series[i].type = 'line';
                        d.series[i].animationDuration = 2000;
                        d.series[i].animationEasing = 'quadraticOut';
                    }
                    t.line_chart_data = d;
                    filter(r);
                }
            );
        };


    }
}
;