<template>
    <div id="vuex-Test">
        <h2>store  vuex 测试</h2><br>
        <el-button type="success" @click="increment">增加</el-button>
        <el-button type="warning" @click="decrement">减少</el-button>
        <el-button type="danger" @click="clickOdd">偶数翻3倍</el-button>
        <el-button type="info" @click="clickAsync">点击加1（异步）</el-button>
        <br><br>
        <!--可以这样取值，但是这么做，对于使用vuex来说毫无意义-->
        <!--现在数字为: {{$store.state.count}}-->
        <el-tag type="success">现在数字为: {{count}}</el-tag><br>
        <el-tag type="success">它现在是 {{getOdd}}</el-tag>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default{
        computed: mapGetters([
            'count',
            'getOdd'
        ]),
        //打包处理actions的方法
        methods: mapActions([
            'increment',
            "decrement",
            "clickOdd",
            "clickAsync"
        ])
    }
</script>
<style>
    #vuex-Test {
        height: 550px;
        overflow: auto;
        background: rgba(0, 0, 0, .6);
    }

    #vuex-Test h2 {
        text-align: center;
        margin: 10px 0;
        padding: 0;
    }

    .list {
        margin: 0;
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