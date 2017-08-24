<!-- ============= bench => user edit ============= -->
<template>
    <div class="win fr">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/index'"></multi-handle>
        <keep-alive>
            <product-planning :tit="title"></product-planning>
        </keep-alive>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>
<script>
    import productPlanning from '../../components/article-list/product-planning.vue';
    export default{
        components: {
            productPlanning,
        },
        data() {
            return {
                title: '',
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1',// 按钮的背景颜色
                    'z-index':2002
                }
            };
        },
        created () {
            this.$store.state.user.info.status === 'admin' ? this.title = '产品企划方案管理' : this.title = '产品企划方案';
        }
    }
</script>
<style>

</style>

