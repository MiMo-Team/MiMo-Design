/*
 * Filter data - auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/12.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
export default {
    install: function (Vue, options) {

        /**
         * 删选 - 适用于固定值
         * @param order
         * @param val
         */
        Array.prototype.filter_fixedVal = function (order, val) {
            let arr = [];
            if (val === 'all' || val === undefined || !val) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else {
                for (let i = 0; i < this.length; i++) {
                    if (this[i].data[order] === val) {
                        arr.push(this[i]);
                    }
                }

            }

            return arr;
        };

        /**
         * 删选 - 适用于区间值
         * @param order
         * @param val
         */
        Array.prototype.filter_section = function (order, val) {
            let arr = [];
            if (val === 'all' || val === undefined) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else {
                const sv = val.split('-');
                if (sv.length > 2) {
                    console.log('在此函数适用范围区间删选对象，若信号值不为"all",则传入的参数必须符合规范，参照：起始xx-结束xx');
                    return false
                }
                else {
                    let n;
                    let min = parseFloat(sv[0]);
                    let max = parseFloat(sv[1]);
                    if (min > max) {
                        n = min;
                        min = max;
                        max = n;
                    }
                    for (let i = 0; i < this.length; i++) {
                        if (this[i].data[order] > min && this[i].data[order] <= max) {
                            arr.push(this[i]);
                        }
                    }
                }
            }
            return arr;
        };

        /**
         * 删选 - 不定时间段删选 （xxxx-xx-xx  -  xxxx-xx-xx ）
         * @param order
         * @param val
         * @returns {boolean}
         */
        Array.prototype.filter_Data_section = function (order, val) {
            let arr = [];
            if (val === 'all' || val === undefined) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else if (!val[0] && !val[1]) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else {
                if (val.length !== 2) {
                    console.log('此函数适用于时间区间删选，若信号值不为"all",则必须含有起始时间和结束时间，请检查传入参数');
                    return false
                }
                else {
                    const stamp = 24 * 60 * 60 * 1000;
                    let stamp_min = parseFloat(val[0].getTime());
                    let stamp_max = parseFloat(val[1].getTime() + stamp);
                    let n;
                    if (stamp_min > stamp_max) {
                        n = stamp_min;
                        stamp_min = stamp_max;
                        stamp_max = n;
                    }
                    for (let i = 0; i < this.length; i++) {
                        const stamp_this = this[i].data[order] * 1000;
                        // console.log('start ------------------------------------ ');
                        // console.log(stamp_min);
                        // console.log(stamp_max);
                        // console.log(stamp_this);
                        // console.log('finish ------------------------------------ ');
                        if (stamp_this > stamp_min && stamp_this <= stamp_max) {
                            arr.push(this[i]);
                        }
                    }
                }
            }
            // console.log(arr);
            return arr;
        };

        /**
         * 删选 - 固定日期时间段删选（范围为给定值）
         * @param order
         * @param val
         */
        Array.prototype.filter_Data_fixed = function (order, val) {
            /**
             * judgment condition of output time stamp
             */
            function require(ts, val) {
                const ts_range = {
                    ts2018: gotTimeStamp('2017-12-31 23:59:59'),
                    ts2017: gotTimeStamp('2016-12-31 23:59:59'),
                    ts2016: gotTimeStamp('2015-12-31 23:59:59'),
                    ts2015: gotTimeStamp('2014-12-31 23:59:59'),
                    ts2014: gotTimeStamp('2013-12-31 23:59:59'),
                    ts2013: gotTimeStamp('2012-12-31 23:59:59'),
                    ts2012: gotTimeStamp('2011-12-31 23:59:59'),
                    ts2011: gotTimeStamp('2010-12-31 23:59:59'),
                    ts2010: gotTimeStamp('2009-12-31 23:59:59')
                };
                //根据选择对象，输出布尔值作为条件判断的依据
                switch (val) {
                    case '2016-2017':
                        return ts >= ts_range.ts2016 && ts < ts_range.ts2018;
                        break;
                    case '2014-2015':
                        return ts >= ts_range.ts2014 && ts < ts_range.ts2016;
                        break;
                    case '2012-2013':
                        return ts >= ts_range.ts2012 && ts < ts_range.ts2014;
                        break;
                    case '2010-2011':
                        return ts >= ts_range.ts2010 && ts < ts_range.ts2012;
                        break;
                    case '2010以前':
                        return ts < ts_range.ts2010;
                        break;
                    default:
                        return false;
                }
            }

            if (val === 'all' || val === undefined) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else {
                for (let i = 0; i < this.length; i++) {
                    const ts = gotTimeStamp(this[i].data[order]);
                    if (require(ts, val)) {
                        arr.push(this[i]);
                    }
                }
            }
            return arr;
        };


        /**
         * 删选 - 数组包含删选（面辅料删选）
         * @param order
         * @param val
         */
        Array.prototype.filter_arrValue_accs = function (order, val) {
            function contains(arr, obj) {
                let i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return true;
                    }
                }
                return false;
            }

            let arr = [];
            if (val === 'all' || val === undefined) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else {
                let style = [];
                switch (val) {
                    case '毛':
                        style = ['羊绒', '羊毛', '兔毛', '羊驼毛', '马海毛'];
                        break;
                    case '麻':
                        style = ['黄麻', '亚麻', '大麻'];
                        break;
                    case '棉':
                        style = ['人棉'];
                        break;
                    case '丝':
                        style = ['人丝', '真丝', '金属丝', '桑蚕丝', '榨蚕丝'];
                        break;
                    case '合成材料':
                        style = ['腈纶', '氨纶', '莱卡', '尼龙', '涂层', '莫代尔'];
                        break;
                    case '其他':
                        style = ['竹纤维'];
                        break;
                    default:
                        style = [];
                }
                for (let i = 0; i < this.length; i++) {
                    if (contains(style, this[i].data[order])) {
                        arr.push(this[i]);
                    }
                }
            }
            return arr;
        };

        /**
         * 删选 - 数组包含删选（职能删选）
         * @param order
         * @param val
         */
        Array.prototype.filter_arrValue_role = function (order, val) {
            function contains(arr, obj) {
                let i = arr.length;
                while (i--) {
                    if (arr[i] === obj) {
                        return true;
                    }
                }
                return false;
            }
            let arr = [];
            if (val === 'all' || val === undefined) {
                for (let i = 0; i < this.length; i++) {
                    arr.push(this[i]);
                }
            }
            else {
                let style = [];
                switch (val) {
                    case '总监':
                        style = ['总监'];
                        break;
                    case '设计及制版':
                        style = ['设计师', '设计师助理', '制版师'];
                        break;
                    case '行政财务':
                        style = ['行政财务'];
                        break;
                    case '物料管理及仓管':
                        style = ['物料管理', '仓管', '物料裁定'];
                        break;
                    case '客服':
                        style = ['客服'];
                        break;
                    case '制造':
                        style = ['裁缝师', '纺织工'];
                        break;
                    default:
                        style = ['其他'];
                }
                for (let i = 0; i < this.length; i++) {
                    if (contains(style, this[i].data[order])) {
                        arr.push(this[i]);
                    }
                }
            }
            return arr;
        };
        /**
         * yyyy-mm-dd hh-mm-ss 转换成时间戳
         * @param str
         * @returns {*}
         */
        function gotTimeStamp(str) {
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
        }
    }
}

