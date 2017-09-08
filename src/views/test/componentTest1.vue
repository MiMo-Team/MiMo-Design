<!-- ============= user - message ============= -->
<template>
    <div class="win fr" ref="componentTest" id="components-Father1">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/dashboard'"></multi-handle>
        <p class="win-tit"><span>▌</span>&nbsp;components-Father - 父组件1 （ 组件动态添加测试-常规 ）</p>
        <el-form :model="fatherForm" ref="fatherForm" label-position="right" label-width="300px" style="width: 90%">
            <el-form-item label="公司编号调整:">
                <el-select v-model="fatherForm.select" placeholder="请选择">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="操作按钮:">
                <el-button type="primary" @click="sayIndex">调用子组件方法说公司编号</el-button>
            </el-form-item>
            <el-form-item label="在父组件 【二】 中显示子组件:">
                <el-switch
                        v-model="fatherForm.showInFather2"
                        @change='showInFather'
                        on-color="#13ce66"
                        off-color="#ff4949"
                >
                </el-switch>
            </el-form-item>
            <el-form-item label="删除子组件操作:">
                <el-button type="warning" @click="destroyChild">删除子组件的实例</el-button>
                <el-button type="danger" @click="childSW = false">删除子组件整体</el-button>
            </el-form-item>
            <el-form-item label="添加子组件操作:">
                <el-button type="success" @click="childSW = true">增加子组件</el-button>
            </el-form-item>
        </el-form>
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
            <components-child ref="componentsChild" :childName="childName" :childNumber="childNumber" v-if="childSW"></components-child>
        </keep-alive>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>

    </div>
</template>
<script>
    import ComponentsChild from '../../components/test/components-child.vue';
    export default{
        name: 'components-Father1',
        components: {
            ComponentsChild
        },
        data() {
            return {
                fatherForm: {
                    select: '',
                    showInFather2:false
                },
                childSW:true,
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
                    'z-index': 2002
                }
            };
        },
        created (){
            console.log(1111);
            console.log(this.$parent);


        },
        mounted(){
            console.log(2222);

        },
        watch: {
            'fatherForm.select'(val) {
                console.log('公司编号变化了!!!!');
                if(this.$store.state.test.showInFather2){
                    this.$store.dispatch('showInFatherInfo',{
                        childName: '新视窗',
                        childNumber: this.fatherForm.select,
                    });
                    this.$router.push({path: '/test/componentsTest2'});
                }
                this.childNumber = this.fatherForm.select;
            }
        },
        methods: {
            showInFather(){
                this.$store.dispatch('showInFather2',this.fatherForm.showInFather2);
                console.log(this.$store.state.test.showInFather2);
            },
            sayIndex(){
                this.$refs.componentsChild.sayChildIndex()
            },
            destroyChild(){
                this.$refs.componentsChild.$destroy();
                this.$alert('子组件实例销毁，不能操作显示子组件数据变化', '操作结果如下', {
                    confirmButtonText: '确定'
                });
            //<child v-if="$route.path!=='/.....'"></child>
            }
        }
    }
</script>
