<template>
    <!--nav left-->
    <div class="fl" id="Sidebar">
        <!--logo-->
        <router-link to="/index" class="logo fl">
            <img src="../../assets/img/logo/MIMO-slogo2.png">
        </router-link>
        <el-menu :default-active="navselected" :active="navselected" class="el-menu-vertical-demo" :router="true" @open="handleOpen">
            <el-submenu :index="firstlist.modulegroup_order" v-for="(firstlist,index) in navList" :key="firstlist.modulegroup_order">
                <template slot="title">
                    <icon-svg :icon-class="firstlist.icon" style="font-size: 20px"></icon-svg>
                    &nbsp;{{firstlist.modulegroup }}
                </template>
                <el-menu-item v-for="(secondlist,index) in firstlist.module"
                              :index="firstlist.modulegroup_order+'-'+secondlist.moduleorder"
                              :key="firstlist.modulegroup_order+'-'+secondlist.moduleorder"
                              :route="{path: secondlist.path}"
                >&nbsp;&nbsp;{{secondlist.display_name }}
                </el-menu-item>
            </el-submenu>
            <!--测试菜单-->
            <el-submenu index="6">
                <template slot="title">
                    <icon-svg icon-class="warning" style="font-size: 20px"></icon-svg>&nbsp;&nbsp;测试入口
                </template>
                <el-menu-item index="6-1" :route="{path: '/bench'}">回到主页</el-menu-item>
                <el-menu-item index="6-2" :route="{path: './front/login'}">回到登录界面</el-menu-item>
                <el-menu-item index="6-3" :route="{path: './bench/user'}">测试入口</el-menu-item>
                <el-menu-item index="6-4" :route="{path: './bench/admin'}">测试入口2</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: 'Sidebar',
        data() {
            return {
                activeIndex: '1',
                navindex: "1",
                navselected: "1",
                navList: "",       //NAV List
//              navTest:[{"modulegroup":"产品企划","module":[{"id":5,"display_name":"产品企划","moduleorder":1}]},{"modulegroup":"款式研发","module":[{"id":6,"display_name":"款式初稿","moduleorder":1},{"id":7,"display_name":"初稿审核","moduleorder":2},{"id":8,"display_name":"配面辅料","moduleorder":3},{"id":9,"display_name":"面辅料评审","moduleorder":4},{"id":10,"display_name":"款式制版","moduleorder":5},{"id":11,"display_name":"裁剪面料","moduleorder":6},{"id":12,"display_name":"缝制样衣","moduleorder":7},{"id":13,"display_name":"版型评审","moduleorder":8}]},{"modulegroup":"流程管理","module":[{"id":4,"display_name":"流程管理","moduleorder":1}]},{"modulegroup":"系统设置","module":[{"id":1,"display_name":"账户管理","moduleorder":1},{"id":2,"display_name":"岗位部门","moduleorder":2},{"id":3,"display_name":"仓库管理","moduleorder":3}]}]
            };
        },
        created () {
            this.axios.post(
                this.$store.state.user.info.status === 'admin' ?
                    this.$store.state.mock.url.adminSidebarNavUrl :
                    this.$store.state.mock.url.userSidebarNavUrl,
                {token: ''},
                data => {
                },
                r => {
                    this.navList = r.data.permissions;
                }
            );
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

