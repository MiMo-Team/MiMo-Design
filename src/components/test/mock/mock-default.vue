<template>
    <div id="mockDefault">
        <h2>Mock 模拟随机数据导入测试</h2>
        <h4>Elenment-ui 模板表格数据生成</h4>
        <el-button type="success" @click="load({send:'mock 模拟数据，可以发送请求了！'})">增加</el-button>
        <br>
        <span style="color: #cccccc">{{content}}</span>
        <br>
    </div>
</template>
<script>
    //loading mock data template
    import {defData, mockTest} from '../../../mock/template/defData';
    export default {
        data() {
            return {
                content: ''
            }
        },
        created () {
            mockTest(defData);               //loading mock data template
        },
        methods: {
            load(params){
                this.axios.post("/test/mockDef",params,
                    data => {
                        console.log(data);
                    },
                    r => {
                        console.log(r);
                        this.content = JSON.stringify(r, null, 4);
//                        console.log('成功回调:' + JSON.stringify(r, null, 4));
                    },
                )
            }
        }
    }
</script>
<style>
    #mockDefault {
        height: 550px;
        overflow: auto;
        background: rgba(0, 0, 0, .6);
    }

    #mockDefault h2 {
        text-align: center;
        margin: 15px 0;
        padding: 0;
        color: #496acd;
    }

    #mockDefault h4 {
        color: #7964cd;
        margin: 10px 0;
        padding: 0;
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