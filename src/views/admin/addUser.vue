<!-- ============= bench => user edit ============= -->
<template>
    <div class="win fr" id="addUser">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/adm'"></multi-handle>
        <div class="wm">
            <keep-alive>
                <basic-info :formItemable="formItemable"></basic-info>
            </keep-alive>
        </div>
    </div>
</template>
<script>
    import basicInfo from '../../components/admin/basic-info.vue';
    export default{
        name: 'addUser',
        components: {
            basicInfo,
        },
        data() {
            return {
                //表单元素操作状态（全开）
                formItemable: {
                    emailstate: false,
                    mobilestate: false,
                    accountState: false,
                    basicInfoTit:'新增用户',
                    //提交跳转路径
                    routerPush:'/index'
                }
            };
        },
        created () {

        },
        methods: {},
    }
</script>
<style>

</style>

