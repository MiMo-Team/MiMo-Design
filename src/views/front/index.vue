<!--进入入口界面（切换登录，注册，忘记密码），初始：登录-->
<template>
    <div class="front" id="front">
        <div class="big-Logo">
            <img src="../../assets/img/logo/MIMO-logo.png">
        </div>
        <!--changing-over  reg/reg/forget module-->
        <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'front',
    }
</script>




