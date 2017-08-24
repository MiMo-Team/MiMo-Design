<!--进入入口界面（切换登录，注册，忘记密码），初始：登录-->
<template>
    <div id="app">
        <!--changing-over  front/bench back module-->
        <router-view></router-view>
    </div>
</template>

<script>
    import mockLoad from './mock/'
    export default {
        name: 'app',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>

