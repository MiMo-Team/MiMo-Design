<template>
    <div id="mock">
        <h2>Mock 模拟随机数据导入测试</h2>
        <h4>Elenment-ui 模板表格数据生成</h4>
        <div id="table">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名" min-width="2"></el-table-column>
                <el-table-column prop="age" label="年龄" min-width="1"></el-table-column>
                <el-table-column prop="color" label="喜欢的颜色" min-width="2"></el-table-column>
            </el-table>
        </div>
        <h4>自定义模板表格数据生成</h4>
        <div class="list">
            <thead>
            <tr>
                <td>姓名：</td>
                <td>年龄：</td>
                <td>喜欢的颜色：</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in lists">
                <td> {{item.name}}</td>
                <td> {{item.age}}</td>
                <td> {{item.color}}</td>
            </tr>
            </tbody>
        </div>
    </div>
</template>
<script>
    //加载 模拟 参数 模板
    import '../../config/mock-test/defData.js';
    export default {
        data() {
            return {
                lists: [],
                tableData: []
            }
        },
        created () {
            this.testgcx2({sent: "发送数据，可以加载数据了"})
        },
        methods: {
            testgcx2(params){
                if (!params) params = {};
                this.axios.post(this.$store.state.gcxTest, params,
                    data => {console.log('发送前处理:' + data);},
                    r => {
                        for (var i = 0; i < r.people.length; i++) {
                            this.lists.push(r.people[i]);
                            this.tableData.push(r.people[i]);
                        }
                        console.log('成功回调:' + JSON.stringify(r, null, 4));
                    },
                )
            }
        }
    }
</script>
<style>
    #mock {
        height: 550px;
        overflow: auto;
        background: rgba(0, 0, 0, .6);
    }

    #mock  h2 {
        text-align: center;
        margin: 15px 0;
        padding: 0;
        color: #496acd;
    }
    #mock  h4 {
        color: #7964cd;
        margin: 10px 0;
        padding: 0;
    }
    .list {
        margin: 0;
        padding: 0;
    }
    .cell{
        text-align: center;
    }
    td {
        padding: 5px 10px;
        text-align: center;
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