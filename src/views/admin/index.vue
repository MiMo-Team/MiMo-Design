<template>
    <div class="win fr" ref="win">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/dashboard'"></multi-handle>
        <div class="dashboard-admin-container adm">
            <!--第一行 ： 顶部快速入口按钮-->
            <el-row class="btn-group dashboard-admin-container-row" :gutter="10">
                <el-col :xs="8" :sm="6" :md="4" :lg="4" class='txtC'>
                    <router-link class="pan-btn blue-btn" to="/adm/admin">用户列表</router-link>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="4" class='txtC'>
                    <router-link class="pan-btn light-blue-btn" to="/adm/add">新增用户</router-link>
                </el-col>
                <el-col :xs="8" :sm="6" :md="4" :lg="4" class='txtC'>
                    <router-link class="pan-btn tiffany-btn" to="/adm/adminac">通告管理</router-link>
                </el-col>
            </el-row>
            <!--第二行-->
            <el-row class="dashboard-admin-container-row">
                <el-col :xs="24" :sm="24" :md="14" :lg="14" style="margin: 80px 0 40px">
                    <pie-chart :pie_chart_data="pie_chart_data" v-if="pie_sw"></pie-chart>
                </el-col>
                <el-col :xs="24" :sm="24" :md="10" :lg="10">
                    <div class="roleList">
                        <div :index="index" v-for="(roleitem,index) in roleData" :key="index">
                            <h3 class="small-tit">{{roleitem.rolename}}</h3>
                            <span v-for="(staffname,index) in roleitem[roleitem.rolename]" :index="index" :key="index">{{staffname}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>

</template>
<script>
    import {mapGetters} from 'vuex';
    import pieChart from '../../components/echarts/pieChart.vue';
    export default {
        name: 'adm',
        components: {pieChart},
        data() {
            return {
                pie_sw: false,
                pie_chart_data: {},
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1',// 按钮的背景颜色
                    'z-index': 2002
                },
                roleData: [],
            }
        },
        created () {
            this.axios.post(this.$store.state.mock.url.userListDataUrl,
                {'token': this.$store.state.user.info.token, 'requirefor': 'roleData'},
                data => {
                },
                r => {
                    let roleType = [];
                    let roleList = {};
                    r.user.forEach(key => {
                            if (roleType.indexOf(key.data.role) === -1) {
                                roleType.push(key.data.role);
                            }
                            if (roleList[key.data.role]) {
                                roleList[key.data.role].push(key.data.name);
                            }
                            else {
                                roleList[key.data.role] = [];
                                roleList[key.data.role].push(key.data.name);
                            }
                        }
                    );
                    let zj = {};
                    roleType.forEach(key => {
                            if (key === '设计师' || key === '设计师助理' || key === '行政财务' || key === '运营经理') {
                                this.roleData.unshift({rolename: key, [key]: roleList[key]});
                            }
                            else if (key === '总监') {
                                zj = {rolename: key, [key]: roleList[key]};
                            }
                            else {
                                this.roleData.push({rolename: key, [key]: roleList[key]})
                            }
                        }
                    );
                    this.roleData.unshift(zj);
//                    console.log('职能列表:' + JSON.stringify(this.roleData, null, 4));
                }
            );
            //加载 圆饼图数据
            this.pieChart(this, this.$store.state.mock.url.pieChart_staffUrl, {'token': this.$store.state.user.info.token, 'command': 'staff'},
                () => {
                    this.pie_chart_data.size = {height: '500px'};
                    this.pie_sw = true;
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
    .roleList {
        padding: 0 60px;
        h3 {
            text-align: left;
            color: rgba(32, 160, 255, 1);
        }
        span{
            display: inline-block;
            padding: 2px 5px;
        }
    }
</style>