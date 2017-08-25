<template>
    <div class="adm">
        <!--第三行-->
        <el-row :gutter="20">
            <!--人员架构图示-->
            <el-col :xs="24" :sm="24" :md="10" :lg="10">
                <pie-chart :pie_chart_data="pie_chart_data" v-if="pie_sw"></pie-chart>
            </el-col>
        </el-row>
        <!--第一行 ： 顶部快速入口按钮-->
        <el-row class="btn-group dashboard-admin-container-row" :gutter="10">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn blue-btn" to="/index">用户列表</router-link>
            </el-col>
            <el-col :xs="12" :sm="8" :md="6" :lg="4" class='txtC'>
                <router-link class="pan-btn light-blue-btn" to="/index">新增用户</router-link>
            </el-col>
        </el-row>
        <!--<code>-->
        <!--这里的所有的图表都基于ECharts,实例代码来源-->
        <!--<a href='http://gallery.echartsjs.com/explore.html#sort=rank~timeframe=all~author=all' target='_blank'>gallery</a><br/>其实ECharts封装的很好了，用vue封装是很简单的事情，建议大家自己来封装。<a-->
        <!--target='_blank' class='lin' href="https://segmentfault.com/a/1190000009762198#articleHeader16">相关教程</a>-->
        <!--</code>-->
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
            }
        },
        created () {
            console.log(33333333);
            this.axios.post(this.$store.state.mock.url.userListDataUrl, {}, data => {
                },
                r => {
                    console.log(22222222222);
                    console.log(r);
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