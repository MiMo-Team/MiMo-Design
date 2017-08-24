<!-- ============= admin index ============= -->
<template>
    <div class="win" id="admin">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="listShow?'/adm/index':'/adm/admin'" v-on:func="sw"></multi-handle>
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;账户管理</p>
        <!--table resault-->
        <user-list v-if="listShow" :listData="listdata" v-on:toadmin="toadmin"></user-list>
        <!--search resault-->
        <user-search v-if="searchShow" v-on:recieveSearchModular="recieveSearchModular" :searchVal="sVal"></user-search>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>
<script>
    import {userList, userSearch} from './index';
    export default{
        name: 'admin',
        components: {
            userList,
            userSearch,
        },
        data: function () {
            return {
                //向 user - search 传递信号
                sVal: {
                    tit: '',
                    val: ''
                },
                //向 user - list 传递信号
                listdata: {},
                listShow: true,
                searchShow: false,
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1',// 按钮的背景颜色
                    'z-index':2002
                }
            }
        },
        methods: {
            sw: function (n) {
                this.listShow = n.switch;
                this.searchShow = !n.switch;
            },
            toadmin:function (n) {
                this.listShow = n.listShow;
                this.searchShow = n.searchShow;
                this.sVal.val = n.searchVal;
                this.sVal.tit = n.searchTit;
            },
            recieveSearchModular: function (n) {
                //用户列表和搜索结果列表进行切换
                this.listShow = n.ls;
                this.searchShow = n.ss;
            }
        }
    }
</script>


