<template>
    <div id="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="日期" min-width="5"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="5"></el-table-column>
            <el-table-column prop="address" label="地址" min-width="10"></el-table-column>
        </el-table>
        <div>
            这里我需要拿到 store 测试页面的 count 的值<br><br>
            <!--方法一可以这样取值，但是这么做，对于使用vuex来说毫无意义-->
            方法一：$store.state.count，  现在数字为: {{$store.state.count}}<br><br>
            方法一：运用vuex的方法 mapGetters，     现在数字222为: {{count}}
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        computed:mapGetters([
            'count'
        ]),
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>
<style>
    #table {
        height: 550px;
        overflow: auto;
        background: rgba(0, 0, 0, .6);
    }

    /*滚动条垂直方向的宽度*/
    ::-webkit-scrollbar {
        width: 10px;
    }

    /* 垂直滚动条的滑动块 */
    ::-webkit-scrollbar-thumb:vertical {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: rgba(129, 129, 129, 0.5);
    }
</style>