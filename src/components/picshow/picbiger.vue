<!-- ============= Bigger/all info picture Modular============= -->
<template>
    <!--图片点击放大-->
    <div class="wm preview" id="picbiger">
        <div class="searchTit">
            <el-button type="text" size="large" v-on:click.native="backpicList"><i class="el-icon-arrow-left"></i>返回</el-button>
        </div>
        <el-row style="padding:10px 0">
            <el-col :span="24" v-for="(cpd, index) in currentPicData" :key="index">
                <h4 class="small-tit" style="padding-bottom:10px">{{cpd.data.name}}</h4>
                <img v-lazy="cpd.data.pic_thumb_oz" :alt="cpd.data.name" class="image lazyload" style="width: 100%">
            </el-col>
        </el-row>
        <h4 class="small-tit" style="padding-bottom:10px">图片信息</h4>
        <!--picture info table-->
        <el-table ref="userListTable" :data="currentPicData" style="width: 100%;" max-height="1200">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="图片ID">
                            <span>{{ props.row.data.picId }}</span>
                        </el-form-item>
                        <el-form-item label="图片名称">
                            <span>{{ props.row.data.name }}</span>
                        </el-form-item>
                        <el-form-item label="上传者">
                            <span>{{ props.row.data.author }}</span>
                        </el-form-item>
                        <el-form-item label="时间">
                            <span>{{ props.row.data.date }}</span>
                        </el-form-item>
                        <el-form-item label="风格">
                            <span>{{ props.row.data.style }}</span>
                        </el-form-item>
                        <el-form-item label="人物性别">
                            <span>{{ props.row.data.sex }}</span>
                        </el-form-item>
                        <el-form-item label="所属时装周">
                            <span>{{ props.row.data.fashionWeek }}</span>
                        </el-form-item>
                        <el-form-item label="图片描述">
                            <span>{{ props.row.data.remarks }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="data.picId" label="图片ID" min-width="220"></el-table-column>
            <el-table-column prop="data.author" label="上传者" min-width="100"></el-table-column>
            <el-table-column prop="data.date" label="上传时间" min-width="150"></el-table-column>
            <el-table-column prop="data.style" label="风格" min-width="100"></el-table-column>
            <el-table-column prop="data.sex" label="人物性别" min-width="100"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        name: 'picbiger',
        props: {
            currpicDate: Array  //定义传值的类型<br>
        },
        data: function () {
            return {
                //表格图片显示数据
                currentPicData: [],
                picBigerShow:false
            }
        },
        created () {
        },
        methods: {
            //返回初始用户列表显示
            backpicList: function () {
                //向父级发送信息，切换用户列表和搜索结果列表
                this.$emit('switchPic2', {
                    'picListShow': true,
                    'picBigerShow': false
                });
            }
        },
        watch: {
            //监听currpicDate的值，接收到数据，则赋予currentPicData中
            currpicDate: {
                handler(curVal, oldVal){
                    this.currentPicData = this.currpicDate;
                },
                deep: true
            }
        }
    }
</script>
<style scoped>
    /*返回按钮*/
    #fw .searchTit button {
        padding-top: 0;
        padding-bottom: 0;
        margin-top: -4px;
    }
    /*返回按钮*/
    #fw .small-tit{
        color:rgba(31, 45, 61,.98);
        font-weight: bold;
    }
</style>

