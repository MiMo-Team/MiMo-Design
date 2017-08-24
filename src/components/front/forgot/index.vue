<!--Registration inter -->
<template>
    <div id="fgt">
        <!--changing-over forget the password for each module module-->
        <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default {
        name: 'fgt'
    }
</script>
<style>
    .fill {
        display: block;
        width: 100%;
        padding: 0;
    }

    #fgt .mode_main a {
        width: calc(100% - 4px);
        height: 76px;
        line-height: 84px;
        border-radius: calc(100% - 4px);
        border: 2px rgba(0, 179, 139, 1) solid;
        color: #fff;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 10px;
    }

    #fgt .mode_main a:hover {
        cursor: pointer;
        background: rgba(0, 179, 139, 1);
    }

    #fgt .contView .handle a {
        padding-left: 0;
        margin-left: -5px;
        text-decoration: none;
    }

    #fgt .contView .handle a:hover {
        color: #20a0ff!important;
        text-decoration: underline !important;
    }
</style>
