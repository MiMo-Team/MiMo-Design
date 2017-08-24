<!--登录模板界面-->
<template>
    <div class="front-content" id="fgtmode">
        <div>
            <div class="middle-tit">请选择密码找回方式</div>
            <el-row :gutter="30" class="mode_main">
                <el-col :span="8">
                    <router-link to="/front/fgt/fe" class="el-checkbox__label fill clrW98"><i class="el-icon-message fs2e"></i></router-link>
                    <p class="small-tit">邮箱找回</p>
                </el-col>
                <el-col :span="8">
                    <router-link to="/front/fgt/ff" class="el-checkbox__label fill clrW98"><i class="el-icon-information fs2e"></i></router-link>
                    <p class="small-tit">手机找回</p>
                </el-col>
                <el-col :span="8">
                    <router-link to="/front/fgt/fn" class="el-checkbox__label fill clrW98"><i class="el-icon-edit fs2e"></i></router-link>
                    <p class="small-tit">常规找回</p>
                </el-col>
            </el-row>
            <div style="width: 100%;margin-top: 70px">
                <router-link to="/front/login" class="el-checkbox__label  clrW98 fr">想起密码了，返回登陆</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'fgtmode'
    }
</script>
