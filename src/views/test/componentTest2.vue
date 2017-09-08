<!-- ============= user - message ============= -->
<template>
    <div class="win fr" id="components-Father2">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/test/componentsTest1'"></multi-handle>
        <p class="win-tit"><span>▌</span>&nbsp;components-Father - 父组件2 （ 在父组件中呈现子组件 ）</p>
        <div>
            <p>我是占位</p>
            <p>我是占位</p>
            <p>我是占位</p>
            <p>我是占位</p>
            <p>我是占位</p>
            <p>我是占位</p>
            <p>我是占位</p>
            <p>我是占位</p>
        </div>
        <keep-alive>
            <components-child ref="componentsChild" :childName="$store.state.test.showInFatherInfo.childName"
                              :childNumber="$store.state.test.showInFatherInfo.childNumber"
                              v-if="$store.state.test.showInFather2"
            ></components-child>
        </keep-alive>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>
<script>
    import ComponentsChild from '../../components/test/components-child.vue';
    export default{
        name:'components-Father2',
        components: {
            ComponentsChild
        },
        data() {
            return {
                childName: '新视窗',
                childNumber: '0',
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
        created (){

        },
        mounted(){

        }
    }
</script>
