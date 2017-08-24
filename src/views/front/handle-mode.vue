<!--请选择注册方式-->
<template>
    <div class="front-content" id="handle-mode">
        <div class="middle-tit">请选择注册方式</div>
        <el-row :gutter="30" class="mode-main">
            <el-col :span="8">
                <router-link :to="{path:'/front/reg',query: {type: 'email'}}" class="fill"><icon-svg icon-class="mail"></icon-svg></router-link>
                <p class="small-tit">邮箱注册</p>
            </el-col>
            <el-col :span="8">
                <router-link :to="{path:'/front/reg',query: {type: 'mobile'}}" class="fill"><icon-svg icon-class="mobilephone"></icon-svg></router-link>
                <p class="small-tit">手机注册</p>
            </el-col>
            <el-col :span="8">
                <router-link :to="{path:'/front/reg',query: {type: 'account'}}" class="fill">
                    <icon-svg icon-class="mine"></icon-svg>
                </router-link>
                <p class="small-tit">账号注册</p>
            </el-col>
        </el-row>
        <div class="handle" style="width: 100%;margin-top: 70px">
            <router-link to="/front/login" class="fr">已有账号，立即登陆</router-link>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'handle-mode'
    }
</script>
