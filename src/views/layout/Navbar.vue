<template>
    <!--header-->
    <div class="header fr">
        <!--top nav-->
        <el-menu class="headNav" mode="horizontal">
            <hamburger class="hamburger-container fl" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
            <levelbar></levelbar>
            <tabs-view></tabs-view>
            <screenfull class='screenfull fr'></screenfull>
            <el-dropdown class="avatar-container fr" trigger="click">
                <div class="avatar-wrapper">
                    <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu class="user-dropdown" slot="dropdown">
                    <router-link to="/user/usere">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                    </router-link>
                    <router-link to="/user/msg">
                        <el-dropdown-item>消息</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <p class="hello fr">Hello<span>{{name}}</span></p>
        </el-menu>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import Hamburger from '../../components/Hamburger/index.vue';
    import Levelbar from '../../components/Levelbar/index.vue';
    import TabsView from '../../components/TabsView/index.vue';
    import Screenfull from '../../components/Screenfull/index.vue';
    export default {
        name: 'header',
        components: {
            Hamburger,
            Levelbar,
            TabsView,
            Screenfull
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'name',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar');
            },
            logout() {
                //login out,empty store and localStorage by dispatch function of 'LogOut'
                this.$store.dispatch('LogOut');
                this.$router.push({path: '/front/login'});
            },
        }
    }
</script>
<style>
    @media screen and (min-width: 980px) {
        #layout .header .headNav p.hello {
            display: inline-block;
        }
    }

    @media screen and (max-width: 979px) {
        #layout .header .headNav p.hello {
            display: none;
        }
    }
</style>



