<!-- =============  edit-user  ============= -->
<template>
    <div class="win fr" id="editUser">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/adm'"></multi-handle>
        <div class="wm">
            <!--tabs-->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane v-for="(item , index) in Tabs" :key="item.name" :label="item.title" :name="item.name">
                    <keep-alive :index="index" :name="item.name" v-if="index === 0 && sw">
                        <basic-info :formItemable="formItemable"></basic-info>
                    </keep-alive>
                    <keep-alive :index="index" :name="item.name" v-if="index === 1 && sw">
                        <user-role></user-role>
                    </keep-alive>
                    <keep-alive :index="index" :name="item.name" v-if="index === 2 && sw">
                        <user-state></user-state>
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {basicInfo, userRole, userState} from './index';
    export default {
        name: 'editUser',
        components: {
            basicInfo,
            userRole,
            userState
        },
        data() {
            return {
                activeName: 'basicInfo',
                Tabs: [
                    {title: '基本信息', name: 'basicInfo'},
                    {title: '角色权限', name: 'userRole'},
                    {title: '用户状态', name: 'userState'}
                ],
                //表单元素操作状态（全开）
                formItemable: {
                    basicInfoTit: '用户基本信息',
                    //提交跳转路径
                    routerPush:'/adm/edit'
                },
                //模板显示开关
                sw: false,
                userInfo: {},
            };
        },
        created () {
            //暂时这样，后面要去router中设置
            /*First to determine whether there is a vector of token parameters in the  vuex .if not have ,  back to the user list page;
             else there is have , to obtain token vector parameters to obtain the desired user request background editing data.*/
            if (!this.$store.state.carrier.userInfoCarrier) {
                this.$router.push({path: '/adm/admin'});
            }
            else {
                this.sw = true;
            }
        }
    };
</script>


