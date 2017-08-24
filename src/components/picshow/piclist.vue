<!-- ============= Picture List Modular============= -->
<template>
    <!--图片列表罗列-->
    <div class="wm" id="fw">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;时装周</p>
        <!--button-->
        <div class="wBtn" style="margin-bottom: 20px">
            <!--搜索图片-->
            <el-dropdown @command="searchUser" style="margin-right: 10px">
                <el-button type="primary" v-waves>
                    搜索图片<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="account">图片编号搜索</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <!--刷新-->
            <el-button type="primary" icon="" v-on:click.native="refreshList" v-waves class="btn-icon">
                <icon-svg icon-class="refresh" style="font-size: 24px"></icon-svg>
            </el-button>
            <!--删选模块-->
            <div class="fr filter">
                <h5>删选</h5>
                <!--时间删选-->
                <el-dropdown @command="filterDate">
                    <span class="el-dropdown-link">{{filterdateTit}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="2016-2017">2016-2017</el-dropdown-item>
                        <el-dropdown-item command="2014-2015">2014-2015</el-dropdown-item>
                        <el-dropdown-item command="2012-2013">2012-2013</el-dropdown-item>
                        <el-dropdown-item command="2010-2011">2010-2011</el-dropdown-item>
                        <el-dropdown-item command="2010以前">2010以前</el-dropdown-item>
                        <el-dropdown-item command="all" divided>所有</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--风格删选-->
                <el-dropdown @command="filterStyle">
                    <span class="el-dropdown-link">{{filterstyleTit}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="波西米亚">波西米亚</el-dropdown-item>
                        <el-dropdown-item command="简约">简约</el-dropdown-item>
                        <el-dropdown-item command="洛丽塔">洛丽塔</el-dropdown-item>
                        <el-dropdown-item command="OL">OL</el-dropdown-item>
                        <el-dropdown-item command="学院">学院</el-dropdown-item>
                        <el-dropdown-item command="朋克">朋克</el-dropdown-item>
                        <el-dropdown-item command="其他">其他</el-dropdown-item>
                        <el-dropdown-item command="all" divided>所有</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--时装周删选-->
                <el-dropdown @command="filterFw">
                    <span class="el-dropdown-link">{{filtersexTit}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="巴黎时装周">巴黎时装周</el-dropdown-item>
                        <el-dropdown-item command="纽约时装周">纽约时装周</el-dropdown-item>
                        <el-dropdown-item command="米兰时装周">米兰时装周</el-dropdown-item>
                        <el-dropdown-item command="伦敦时装周">伦敦时装周</el-dropdown-item>
                        <el-dropdown-item command="阿姆斯特丹时装周">阿姆斯特丹时装周</el-dropdown-item>
                        <el-dropdown-item command="东京时装周">东京时装周</el-dropdown-item>
                        <el-dropdown-item command="莫斯科时装周">莫斯科时装周</el-dropdown-item>
                        <el-dropdown-item command="罗马时装周">罗马时装周</el-dropdown-item>
                        <el-dropdown-item command="慕尼黑时装周">慕尼黑时装周</el-dropdown-item>
                        <el-dropdown-item command="上海时装周">上海时装周</el-dropdown-item>
                        <el-dropdown-item command="all" divided>所有</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!--图片列表-->
        <el-row>
            <el-col :xs="24" :sm="12" :md="6" :lg="4" v-for="(pinfo, index) in currentPageData" :key="index" style="padding: 10px">
                <el-card :body-style="{ padding: '0px' }" style="padding-bottom: 10px">
                    <img v-lazy="pinfo.data.pic_thumb" :alt="pinfo.data.name" class="image lazyload" style="width: 100%">
                    <div style="padding: 0 14px;">
                        <div class="bottom clearfix">
                            <p class=" card_bTit fl">{{pinfo.data.name}}</p>
                            <el-button :plain="true" type="info" size="small" v-waves class="fr" v-on:click.native="picBiger(index)">点击详情</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <!--分页-->
        <div class="block" style="text-align: center">
            <el-pagination
                    @size-change="picList_SizeChange"
                    @current-change="picList_CurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[12, 24, 36, 48]"
                    :page-size="pageSize"
                    layout=" sizes, prev, pager, next,jumper"
                    :total="dataTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'fw',
        data: function () {
            return {
                //图片显示 数据容器
                pinfoList: [],
                //中转存储数据
                storageData: [],
                //表格当前页显示数据
                currentPageData: [],
                //当前图片数据
                currentPicData: [],
                //初始显示页码
                currentPage: 1,
                //每页显示数目
                pageSize: 24,
                //数据总数
                dataTotal: 24,
                //过滤下拉菜单选择信号标题
                filterdateTit: '时间',
                filterstyleTit: '风格Style',
                filtersexTit: '时装周',
                //过滤下拉菜单选择信号数据
                filterdate: 'all',
                filterstyle: 'all',
                filtersex: 'all',
                //data api
                fashionWeekListUrl:''
            }
        },
        created () {
            this.fashionWeekListUrl = this.$store.state.mock.url.fashionWeekListUrl;
            this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
            });
        },
        methods: {
            //表格当前页显示条数回调
            picList_SizeChange(val) {
                this.pageSize = val;
                this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
                    this.selFilter(this, r, 'date', this.filterdate);
                    this.selFilter(this, this.storageData, 'style', this.filterstyle);
                    this.selFilter(this, this.storageData, 'fashionWeek', this.filtersex);
                });
            },
            //表格翻页回调
            picList_CurrentChange(val) {
                this.currentPage = val;
                this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
                    this.selFilter(this, r, 'date', this.filterdate);
                    this.selFilter(this, this.storageData, 'style', this.filterstyle);
                    this.selFilter(this, this.storageData, 'fashionWeek', this.filtersex);
                });
            },
            //图片上传时间删选下拉菜单
            filterDate(command) {
                this.filterdate = command;
                this.filterdateTit = this.varyAll(command);
                this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
                    this.selFilter(this, r, 'date', command);
                    this.selFilter(this, this.storageData, 'style', this.filterstyle);
                    this.selFilter(this, this.storageData, 'fashionWeek', this.filtersex);
                });
            },
            //图片风格删选下拉菜单
            filterStyle(command) {
                this.filterstyle = command;
                this.filterstyleTit = this.varyAll(command);
                this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
                    this.selFilter(this, r, 'style', command);
                    this.selFilter(this, this.storageData, 'date', this.filterdate);
                    this.selFilter(this, this.storageData, 'fashionWeek', this.filtersex);
                });
            },
            //时装周所属删选下拉菜单
            filterFw(command) {
                this.filtersex = command;
                this.filtersexTit = this.varyAll(command);
                this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
                    this.selFilter(this, r, 'fashionWeek', command);
                    this.selFilter(this, this.storageData, 'date', this.filterdate);
                    this.selFilter(this, this.storageData, 'style', this.filterstyle);
                });
            },
            //搜索用户
            searchUser(command) {
                //账号搜索用户
                if (command === "account") {
                    const rule = /\S/;
                    //弹出输入框
                    this.promptInput(this, '请输入图片编号进行搜索', '搜索图片', rule, '输入内容不能为空', (val) => {
                        this.picLookup_Show(this, this.$store.state.mock.url.fashionWeekDataUrl, val);
                        //向父级发送信息，切换用户列表和搜索结果列表
                        this.$emit('switchPic1', {
                            'picListShow':false,
                            'picBigerShow':true,
                            'currentPicData':this.currentPicData
                        });
                    }, () => {
                    })
                }
            },
            //刷新用户列表
            refreshList: function () {
                this.filterdateTit = '时间';
                this.filterstyleTit = '风格Style';
                this.filtersexTit = '时装周';
                this.addPicList(this, this.fashionWeekListUrl, this.currentPage, this.pageSize, (r) => {
                });
            },
            //放大图片预览
            picBiger: function (index) {
                this.currentPicData = [];
                this.currentPicData.push(this.currentPageData[index]);
                //向vuex 中传递数据，中转后传递给 picbiger 模块
//                this.$store.commit(types.CURRENTDATA, this.currentPicData);
                //向父级发送信息，切换用户列表和搜索结果列表
                this.$emit('switchPic1', {
                   'picListShow':false,
                   'picBigerShow':true,
                    'currentPicData':this.currentPicData
                });
            }
        }
    }
</script>


