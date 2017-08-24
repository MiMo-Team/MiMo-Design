<template>
    <div class='tabs-view-container'>
        <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
            <el-tag :closable="true" :type="isActive(tag.path)?'primary':''" @close='closeViewTabs(tag,$event)'>
                {{tag.name}}
            </el-tag>
        </router-link>
    </div>
</template>
<script>
    export default {
        computed: {
            visitedViews() {
                return this.$store.state.tabView.visitedViews.slice(-6)
            }
        },
        methods: {
            closeViewTabs(view, $event) {
                this.$store.dispatch('delVisitedViews', view);
                $event.preventDefault()
            },
            generateRoute() {
                if (this.$route.matched[this.$route.matched.length - 1].name) {
                    return this.$route.matched[this.$route.matched.length - 1]
                }
                this.$route.matched[0].path = '/';
                return this.$route.matched[0]
            },
            addViewTabs() {
                this.$store.dispatch('addVisitedViews', this.generateRoute())
            },
            isActive(path) {
                return path === this.$route.path
            }
        },
        watch: {
            $route() {
                this.addViewTabs()
            }
        }
    }
</script>
<style rel="stylesheet/less" lang="less" scoped>
    .tabs-view-container {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        .tabs-view {
            margin-left: 10px;
        }
    }
    @media screen and (min-width:1350px) {.tabs-view-container a.tabs-view {display:inline-block;}}
    @media screen and (min-width:1250px) and (max-width:1349px) {.tabs-view-container a.tabs-view {display:none;}
        .tabs-view-container a.tabs-view:nth-child(n+2) {display:inline-block;}
    }
    @media screen and (min-width:1150px) and (max-width:1249px) {.tabs-view-container a.tabs-view {display:none;}
        .tabs-view-container a.tabs-view:nth-child(n+3) {display:inline-block;}
    }
    @media screen and (min-width:1050px) and (max-width:1149px) {.tabs-view-container a.tabs-view {display:none;}
        .tabs-view-container a.tabs-view:nth-child(n+4) {display:inline-block;}
    }
    @media screen and (min-width:900px) and (max-width:1049px) {.tabs-view-container a.tabs-view {display:none;}
        .tabs-view-container a.tabs-view:nth-child(n+5) {display:inline-block;}
    }
    @media screen and (min-width:800px) and (max-width:899px) {.tabs-view-container a.tabs-view {display:none;}
        .tabs-view-container a.tabs-view:nth-child(n+6) {display:inline-block;}
    }
    @media screen and (max-width:799px) {.tabs-view-container a.tabs-view {display:none;}  }
</style>
