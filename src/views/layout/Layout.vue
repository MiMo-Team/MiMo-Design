<template>
    <div class="app-wrapper clr" id="layout" :class="{hideSidebar:!sidebar.opened}">
        <!--nav left-->
        <div class="sidebar-wrapper fl">
            <sidebar class="sidebar-container"></sidebar>
        </div>
        <!--header-->
        <div class="main-container">
            <navbar></navbar>
            <!-- content -->
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
    //bench content style
    import '../../assets/css/view/cont.scss'

    import {Navbar, Sidebar, AppMain} from './index';
    export default {
        name: 'layout',
        components: {
            Navbar,
            Sidebar,
            AppMain
        },
        computed: {
            sidebar() {
                return this.$store.state.toggleSideBar.sidebar;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../../src/assets/css/mixin/mixin.scss";
    #layout.app-wrapper {
        @include clearfix;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-165px, 0);
                .sidebar-container {
                    transform: translate(152px, 0);
                }
                &:hover {
                    transform: translate(0, 0);
                    .sidebar-container {
                        transform: translate(0, 0);
                    }
                }
            }
            .main-container {
                margin-left: 35px;
            }
        }
        .sidebar-container {
            right: -35px;
        }
    }
</style>

