<template>
    <div id="apiTest">
        <h2>api 项目接口测试</h2>
        <ul class="list">
                <li v-text="val"></li>
        </ul>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                val: []
            }
        },
        created () {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.get_data({email:'xffcpq@163.com',password:'123456'});
        },
        methods: {
            get_data (params) {
                if (!params) params = {};
                this.axios.post('login', params, r => {
                    this.val = r.data
                })
            }
        }
    }
</script>
<style>
    #apiTest{
        height: 550px;
        overflow:auto;
        background: rgba(0,0,0,.6);
    }
    #test h2{
        text-align: center;
        margin: 10px 0;
        padding: 0;
    }
    .list{
        margin: 0;
        padding: 0;
    }

    /*滚动条垂直方向的宽度*/
    ::-webkit-scrollbar
    {
        width: 10px;
    }
    /* 垂直滚动条的滑动块 */
    ::-webkit-scrollbar-thumb:vertical {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color:rgba(129,129,129,0.5);
    }
</style>