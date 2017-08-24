/*
 * tableDateHandle - auxiliary for Vue
 * With the wrapper function below, you can use the Vue extension function more quickly
 * created: 2017/7/3.
 * author: Broccoli spring( 高仓雄 - gcx )
 * copyright (c) 2017 Broccoli spring( gcx )
 */
export default {
    install: function (Vue, options) {
        /**
         * getList for Vue( 获取列表数据 *** )
         * In this Vue project, this function is used to load data information. When in use,
         * make sure the relevant parameters are correct according to the function standard.
         * The custom part of the function is written in the extension function
         * !! ------------------------------------------------------------------------------------------------------
         * 注意：此方法适用于：
         * 1、列表中有分页模块的（具备3个参数：当前页数，页码尺寸条目，数据总数）
         * 2、列表建议具备删选功能，若无需删选，则在 filter 函数中置空即可
         * 3、若同时具备翻页和删选功能，请将删选功能参数和翻页参数写入同一父级对象中，格式：
         * Fuilter:{
         *    xxxxxxx:xxxxxx
         *    xxxxxxx:xxxxxx
         *    listpage: {
                        currentPage: xx,
                        pageSize: xx,
                        dataTotal: xx,
                    }
         * }
         * !! ------------------------------------------------------------------------------------------------------
         * @param t                 t = this
         * @param url
         * @param param
         * @param cp                currentPage
         * @param ps                pageSize
         * @param filter            filter func
         * @param cb                call back
         */
        Vue.prototype.getList = function (t, url, param, cp, ps, filter, cb) {
            //storageData -存储数据  currentPageData - 当前页数据  depotBillData - 表格展现数据容器
            //empty arr
            t.storageData = [];
            t.axios.post(url, param,
                data => {
                },
                r => {
                    filter(r);
                    //filter data function, if you do not need to filter, then empty
                    t.Filter.listpage.dataTotal = t.storageData.length;                                //all data length
                    let start = (cp - 1) * ps;
                    let len;
                    ps <= t.Filter.listpage.dataTotal - start ? len = ps : len = t.Filter.listpage.dataTotal - start;       //select min length
                    t.currentPageData = [];
                    for (let i = start; i < start + len; i++) {
                        t.currentPageData.push(t.storageData[i].data);
                    }
                    cb(r);                                             //      这个回调函数主要为 listLoading 模块服务
                    console.log('getList 加载完毕！！！');
                }
            );
        };
        /**
         * 分层剥取 - 获取列表数据
         * @param t
         * @param url
         * @param param
         * @param cp
         * @param ps
         * @param filter
         * @param cb
         */
        Vue.prototype.getLayersList = function (t, url, param, cp, ps, filter, cb) {
            t.storageData = [];
            t.axios.post(url, param,
                data => {
                },
                r => {
                    filter(r);
                    //filter data function, if you do not need to filter, then empty
                    t.Filter.listpage.dataTotal = t.storageData.length;                                //all data length
                    let start = (cp - 1) * ps;
                    let len;
                    ps <= t.Filter.listpage.dataTotal - start ? len = ps : len = t.Filter.listpage.dataTotal - start;       //select min length
                    t.currentPageData = [];
                    for (let i = start; i < start + len; i++) {
                        t.currentPageData.push(t.storageData[i]);
                    }
                    cb(r);
                }
            );
        };


        /**
         * addPicList  ( 加载图片列表 )
         * @param t
         * @param url
         * @param cp
         * @param ps
         * @param filter
         */
        Vue.prototype.addPicList = function (t, url, cp, ps, filter) {
            //storageData -存储数据  currentPageData - 当前页数据
            //empty arr
            t.currentPageData = [];
            t.storageData = [];
            t.axios.post(url, {},
                data => {
                },
                r => {
                    t.storageData = r.picList;
                    //filter data function, if you do not need to filter, then empty
                    filter(r.picList);
                    t.pinfoList = t.storageData;
                    t.dataTotal = t.storageData.length;
                    let start = (cp - 1) * ps;
                    let len;
                    //从起始位置开始计算余下数据长度，若小于每页显示条数，则len为余下数据长度，否则为设定的当前显示条数
                    ps <= t.storageData.length - start ? len = ps : len = t.storageData.length - start;       //select min length
                    for (let i = start; i < start + len; i++) {
                        //赋值中转存储数据中timeStamp，生成时间戳（只是备用）
                        t.storageData[i].data.timeStamp = t.gotTimeStamp(t, t.storageData[i].data.date);
                        //中转存储数据转入当前分页数据中
                        t.currentPageData.push(t.storageData[i]);
                        // console.log(t.storageData[i].data.addr)
                        // console.log(t.storageData[i].data.author+ '\n'+t.storageData[i].data.sex+'\n'+t.storageData[i].data.style+'\n'+t.storageData[i].data.date+'\n'+t.storageData[i].data.picId+'\n'+t.storageData[i].data.timeStamp+'\n'+"========================");
                    }
                    // console.log(t.currentPageData);
                }
            );
        };
        /**
         * picture search info show
         * search info of picture (normally, only one) in table
         * @param t                     this
         * @param url                   Axios url
         * @param val                   send value
         */
        Vue.prototype.picLookup_Show = function (t, url, val) {
            t.currentPicData = [];   //empty
            t.axios.post(url, {'picId': val},
                data => {
                },
                r => {
                    for (let i = 0; i < r.picinfo.length; i++) {
                        t.currentPicData.push(r.picinfo[i]);
                    }
                },
                () => {
                }
            );
        };

    }
}
;