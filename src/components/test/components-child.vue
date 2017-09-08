<template>
    <div id="componentsChild">
        <p class="win-tit"><span>▌</span>&nbsp;Components-Child -  公用子组件</p>
        <el-table
                :data="childTable"
                style="width: 100%">
            <el-table-column
                    prop="childName"
                    label="公司名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="childNumber"
                    label="公司编号(默认为 0 )">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        props: {
            childName: {
                type: String,
                default: '新视窗'
            },
            childNumber: {
                type: String,
                default: '0'
            }
        },
        data () {
            return {
                childTable: [
                    {
                        childName: '新视窗',
                        childNumber: '0',
                    }
                ],
                val: []
            }
        },
        watch: {
            childName() {
                this.buildData(this.childName, this.childNumber);
            },
            childNumber() {
                this.buildData(this.childName, this.childNumber);
            }
        },
        created () {
            console.log(1111);
            console.log(this.$parent.$children);
            this.buildData(this.childName, this.childNumber);
        },
        methods: {
            buildData(name, number){
                console.log('子组件数据生成咯！！');
                this.childTable = [];
                this.childTable.push(
                    {
                        childName: name,
                        childNumber: number,
                    }
                );
            },
            sayChildIndex(){
                this.$alert('你好，新视窗的编号为：' + this.childTable[0].childNumber, '说话内容如下', {
                    confirmButtonText: '确定'
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>