<!-- ============= user - message ============= -->
<template>
    <div class="win fr" ref="win">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/dashboard'"></multi-handle>
        <keep-alive>
            <user-message></user-message>
        </keep-alive>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>
<script>
    import UserMessage from '../../components/article-list/Message.vue';
    export default{
        components: {
            UserMessage
        },
        data() {
            return {
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
        }
    }
</script>
