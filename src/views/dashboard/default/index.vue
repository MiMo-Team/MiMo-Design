<template>
    <div class="dashboard-dafault-container border-box">
        <a href="https://github.com/PanJiaChen/vue-element-admin" target="_blank" class="github-corner" aria-label="View source on Github">
            <svg width="80" height="80" viewBox="0 0 250 250" style="fill:#4AB7BD; color:#fff; position: absolute; top:0; border: 0; right: 0;"
                 aria-hidden="true">
                <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                      fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                      fill="currentColor" class="octo-body"></path>
            </svg>
        </a>
        <!--左侧信息缩略展示-->
        <el-row :gutter="20" class="dashboard-admin-container-row">
            <!--左侧信息缩略展示-->
            <el-col :xs="24" :sm="24" :md="14" :lg="16">
                <el-row :gutter="30" class="dashboard-admin-container-row">
                    <!--头像-->
                    <el-col :xs="24" :sm="24" :md="24" :lg="8">
                        <el-row>
                            <el-col :xs="9" :sm="7" :md="4" :lg="3" style="height: 1px"></el-col>
                            <el-col :xs="6" :sm="10" :md="16" :lg="18">
                                <div class="pan-thumb-modular" style="">
                                    <pan-thumb class="fl" :image="avatar" :panThumbSize="panThumbSize">
                                        <span class="pan-info-roles roles-tit">你的角色:</span>
                                        <span class="pan-info-roles" v-for="(item,index) in roles" :key="index">{{item}}</span>
                                        <span class="pan-info-roles roles-tit">你的权限:</span>
                                        <span class="pan-info-roles">{{status}}</span>
                                    </pan-thumb>
                                </div>
                            </el-col>
                            <el-col :xs="9" :sm="7" :md="4" :lg="3" style="height: 1px"></el-col>
                        </el-row>
                    </el-col>
                    <!--签名-->
                    <el-col :xs="24" :sm="24" :md="24" :lg="16">
                        <div class="info-container">
                            <span class="display_name">{{name}}</span>
                            <span class="display_sign">{{sign}}</span>
                        </div>
                    </el-col>
                    <!--图片-->
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                        <img class='emptyGif' :src="emptyGif">
                    </el-col>
                </el-row>
            </el-col>
            <!--工作安排-->
            <el-col :xs="24" :sm="24" :md="10" :lg="8" style="overflow:hidden">
                <todo-list :todoList="todoList"></todo-list>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import PanThumb from '../../../components/PanThumb/index.vue';
    import todoList from '../../../components/TodoList/index.vue';
    export default {
        name: 'dashboard-default',
        components: {PanThumb, todoList},
        data() {
            return {
                //传递尺寸
                panThumbSize: {
                    width: '100%',
                    height: '100%',
                    zIndex: 100
                },
                todoList: [
                    {text: '晨会', done: false},
                    {text: '一般工作', done: false},
                    {text: '供应商洽谈', done: false},
                    {text: '中餐', done: false},
                    {text: '销量及设计制版汇总会议', done: false},
                    {text: '设计稿件删选', done: false},
                    {text: '大小件收尾', done: false},
                    {text: '其他工作', done: false},
                    {text: '周末供应商工作准备', done: false},
                    {text: '总结会议', done: false}
                ],
                emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
            }
        },
        created () {
            window.localStorage.removeItem('todos');
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
    $dashboard-dafault-back: rgba(227, 227, 277, 1);    //background
    $dashboard-dafault-Tit: 48px;                       //big tit
    $dashboard-dafault-sign: 20px;                      //sign
    $dashboard-dafault-pt: 60px;                        //dashboard-dafault-gap
    $dashboard-dafault-pb: 0px;
    $dashboard-dafault-pl: 30px;
    $dashboard-dafault-pr: 30px;
    $navH:50px;
    .dashboard-dafault-container {
        background-color:$dashboard-dafault-back;
        min-height: calc(100vh - (#{$dashboard-dafault-pt} + #{$dashboard-dafault-pb} + #{$navH}));
        padding:$dashboard-dafault-pt $dashboard-dafault-pr $dashboard-dafault-pb $dashboard-dafault-pl;.pan-thumb-modular {position:relative;width:100%;height:0;padding-bottom:100%;}
        .info-container {position:relative;width:100%;height:100%;margin:auto;.display_name {display:block;font-size:$dashboard-dafault-Tit;line-height:$dashboard-dafault-Tit;margin-top:20px;color:rgba(31,31,31,.98);}
            .display_sign {display:block;font-size:$dashboard-dafault-sign;margin-top:$dashboard-dafault-sign;}
        }
        .emptyGif {display:block;width:80%;margin:0 auto;}
    }
</style>
