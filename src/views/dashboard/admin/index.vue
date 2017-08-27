<template>
    <div class="dashboard-admin-container">
        <!--右上角图片-->
        <a href="https://github.com/MiMo-Team/MiMo-Design" target="_blank" class="github-corner" aria-label="View source on Github">
            <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#4AB7BD; color:#fff; position: absolute; top:0; border: 0; right: 0;"
                 aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                      fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                      fill="currentColor" class="octo-body"></path>
            </svg>
        </a>
        <!--第一行 ： 顶部快速入口按钮-->
        <el-row class="btn-group dashboard-admin-container-row clr_mb" :gutter="10">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn blue-btn" to="/index">用户列表</router-link>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn light-blue-btn" to="/index">新增用户</router-link>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn tiffany-btn" to="/index">产品企划</router-link>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn green-btn" to="/index">面辅料分类</router-link>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn pink-btn " to="/index">新增入库单</router-link>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn yellow-btn" to="/index">图库</router-link>
            </el-col>
        </el-row>
        <!--第二行 ： banner-cover -->
        <el-row class="dashboard-admin-container-row clr_mb" :gutter="10">
            <el-col :xs="0" :sm="0" :md="0" :lg="2" style="height: 10px"></el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="20">
                <el-carousel :interval="8000" type="card" :height="coverHight">
                    <el-carousel-item v-for="item in 6" :key="item">
                        <router-link :to="{path:'/index'}">
                            <img :src='imgsrc + item + ".jpg"' :alt="'dashboard-cover'+item">
                        </router-link>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :xs="0" :sm="0" :md="0" :lg="2" style="height: 10px"></el-col>
        </el-row>
        <!--第三行-->
        <el-row :gutter="30" class="dashboard-admin-container-row">
            <!--左侧信息缩略展示-->
            <el-col :xs="24" :sm="12" :md="10" :lg="6">
                <el-card class="box-card">
                    <div slot="header" class="box-card-header">
                        <pan-thumb class="fl" :image="avatar" :panThumbSize="panThumbSize">
                            <span class="pan-info-roles roles-tit">你的角色:</span>
                            <span class="pan-info-roles" v-for="(item,index) in roles" :key="index">{{item}}</span>
                            <span class="pan-info-roles roles-tit">你的权限:</span>
                            <span class="pan-info-roles">{{status}}</span>
                        </pan-thumb>
                    </div>
                    <span class="display_name">{{name}}</span>
                    <div class="info-item">
                        <span class="info-item-text ">您于</span>
                        <span class="info-item-text info-item-num">{{statisticsData.entrydate_count}}</span>
                        <span class="info-item-text ">入职</span>
                    </div>
                    <div class="info-item">
                        <span class="info-item-text">距今：</span>
                        <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.entryhour_count' :duration='3600'></countTo>
                        <span class="info-item-text">小时</span>
                        <icon-svg icon-class="time"></icon-svg>
                    </div>
                    <div class="info-item">
                        <router-link to="/user/msg" class="" style="margin:0 2px">
                            <countTo class="info-item-num" :startVal='0' :endVal='statisticsData.news_count' :duration='3000'></countTo>
                        </router-link>
                        <span class="info-item-text">消息</span>
                        <icon-svg icon-class="interactive"></icon-svg>
                    </div>
                </el-card>
            </el-col>
            <!--工作安排-->
            <el-col :xs="24" :sm="12" :md="14" :lg="8" style="overflow:hidden">
                <todo-list :todoList="todoList"></todo-list>
            </el-col>
            <!--每日进出库总量-->
            <el-col :xs="24" :sm="24" :md="24" :lg="10">
                <bar-chart :bar_chart_data="bar_chart_data" v-if="pie_sw && bar_sw && line_sw"></bar-chart>
            </el-col>
        </el-row>
        <!--第四行-->
        <el-row :gutter="30" class="dashboard-admin-container-row">
            <!--人员架构图示-->
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <pie-chart :pie_chart_data="pie_chart_data" v-if="pie_sw && bar_sw && line_sw"></pie-chart>
            </el-col>
            <!--每日营收统计-->
            <el-col :xs="24" :sm="24" :md="14" :lg="14">
                <line-chart :line_chart_data="line_chart_data" v-if="pie_sw && bar_sw && line_sw"></line-chart>
            </el-col>
        </el-row>
        <!--go top-->
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {pieChart, lineChart, barChart, panThumb, todoList} from './index';
    import countTo from 'vue-count-to';
    export default {
        name: 'dashboard-admin',
        components: {panThumb, countTo, pieChart, lineChart, barChart, todoList},
        data() {
            return {
                coverHight: '300px',
                imgsrc: 'http://otaflb4oo.bkt.clouddn.com/mimo/theme/skincover/cover',
                statisticsData: {
                    news_count: 10,
                    entrydate_count: 1024,
                    entryhour_count: 1024,
                    comment_count: 102400,
                    latest_article: [],
                    month_article_count: 28,
                },
                //传递尺寸
                panThumbSize: {
                    width: '100%',
                    height: '100%',
                    zIndex: 100
                },
                todoList: [
                    {text: '晨会', done: false},
                    {text: '各部门排查', done: false},
                    {text: '月末报表整理', done: false},
                    {text: '设计稿件审查定稿', done: false},
                    {text: '供应商短洽谈', done: false},
                    {text: '供应商接待午餐', done: false},
                    {text: '午休', done: false},
                    {text: '制版师制及设计师版问题评审', done: false},
                    {text: '月末报表整理', done: false},
                    {text: '周末柯桥供应商合作洽谈准备', done: false},
                    {text: '总结会议', done: false},
                    {text: '其他', done: false},
                ],
                pie_sw: false,
                bar_sw: false,
                line_sw: false,
                pie_chart_data: {},
                bar_chart_data: {},
                line_chart_data: {},
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1',// 按钮的背景颜色
                    'z-index': 2002
                }
            }
        },
        created () {
            window.localStorage.removeItem('todos');
            //获取入职时间及小时
            let d = this.$store.state.user.info.entry_date;
            this.statisticsData.entrydate_count = d.slice(0, 9);
            this.statisticsData.entryhour_count = Math.round((parseFloat(new Date().getTime()) - this.gotTimeStamp(this, d)) / (1000 * 60 * 60));
            //加载 柱状图数据
            this.barChart(this, this.$store.state.mock.url.barChart_billMovingUrl, {'token': this.$store.state.user.info.token, 'command': 'bill-moving'}, '60%',
                () => {
                    this.bar_chart_data.size = {height: '420px'};
                    this.bar_sw = true;
                }
            );
            //加载 圆饼图数据
            this.pieChart(this, this.$store.state.mock.url.pieChart_staffUrl, {'token': this.$store.state.user.info.token, 'command': 'staff'},
                () => {
                    this.pie_chart_data.size = {height: '500px'};
                    this.pie_sw = true;
                }
            );
            //加载 折线图数据
            this.lineChart(this, this.$store.state.mock.url.lineChart_revenueUrl, {'token': this.$store.state.user.info.token, 'command': 'revenue'},
                () => {
                    this.line_chart_data.size = {height: '500px'};
                    this.line_sw = true;
                }
            );

        },
        computed: {
            ...mapGetters([
                'name',
                'avatar',
                'roles',
                'status',
                'sign'
            ])
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    /*dashboard 模块 页面四周间隔空隙*/
    $dashboard-gap: 30px;
    /*dashboard 模块 页面四周间隔空隙*/
    $dashboard-rol-gap: 20px;
    /*card模块head高度*/
    $dashboard-cd-h: 162px;
    /*row 每行间隔*/
    $dashboard-row-gap: 30px;
    /*row 中按钮间隔*/
    $dashboard-btn-gap: 10px;
    /*card模块bottom中字体间隔*/
    $dashboard-fs-gap: 10px;
    .dashboard-admin-container {
        margin: $dashboard-gap;
        .dashboard-admin-container-row {
            margin-bottom: $dashboard-rol-gap;
            .el-col {
                padding-top: $dashboard-rol-gap / 2;
                padding-bottom: $dashboard-rol-gap;
            }
            .el-carousel__item {
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .btn-group {
            margin-bottom: $dashboard-row-gap*2/3;
            .el-col {
                padding-top: $dashboard-btn-gap;
                padding-bottom: $dashboard-btn-gap;
            }
        }
        .box-card-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 100%;
        }
        .display_name {
            font-size: 30px;
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .info-item {
            display: inline-block;
            margin-top: $dashboard-fs-gap;
            font-size: 14px;
            &:first-of-type {
                margin-right: $dashboard-fs-gap;
            }
        ;
            .info-item-num {
                font-weight: bold;
                a {
                    cursor: pointer;
                }
            }
        }
    }
</style>
