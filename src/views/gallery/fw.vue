<!-- ============= benchuserEditdmin ============= -->
<template>
    <div class="win fr" id="fw">
        <!--图片列表罗列-->
        <piclist v-show="picListShow"  v-on:switchPic1="recieveMessage"></piclist>
        <!--图片点击放大-->
        <picbiger v-show="picBigerShow" :currpicDate="PicData" v-on:switchPic2="recieveMessage2"></picbiger>
    </div>
</template>
<script>
    import {Piclist, Picbiger} from './index';
    export default{
        name: 'fw',
        components: {
            Piclist,
            Picbiger
        },
        data: function () {
            return {
                PicData:[],
                //界面显示开关
                picListShow: true,
                picBigerShow: false,
            }
        },
        created () {
        },
        methods: {
            recieveMessage:function (n) {
                this.picListShow = n.picListShow;
                this.picBigerShow = n.picBigerShow;
                this.PicData = n.currentPicData;
            },
            recieveMessage2:function (n) {
                this.picListShow = n.picListShow;
                this.picBigerShow = n.picBigerShow;
            }
        }
    }
</script>
<style>
    /* 懒加载 loading */
    #fw .lazyload[lazy=loading] {
        padding-bottom: 152%;
        background-image: url("../../assets/img/lazyload/loading/lazyloading4.png");
    }

    #fw .preview .lazyload[lazy=loading] {
        padding-bottom: 152%;
        background-image: url("../../assets/img/lazyload/loading/lazyloading3.png");
    }

    /*展开行内容各部分*/
    .mbody .win .el-table .el-table__body tbody tr td.el-table__expanded-cell form.demo-table-expand .el-form-item {
        width: 50%;
    }

    /*展开行内容各部分 - lable */
    .mbody .win .el-table .el-table__body tbody tr td.el-table__expanded-cell form.el-form .el-form-item label.el-form-item__label {
        width: 100px;
    }
</style>

