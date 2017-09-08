<template>
    <div id="sort-child">

        <el-table
                border fit
                :data="childTable"
                highlight-current-row
                style="width: 100%">
            <el-table-column
                    type="index"
                    min-width="120px">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="childName"
                    label="公司名称"
                    min-width="200px">
            </el-table-column>
            <el-table-column
                    align="center"
                    prop="childNumber"
                    label="公司编号(默认为 0 )"
                    min-width="200px">
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
                        childName: this.childName,
                        childNumber: this.childNumber,
                    }
                ]
            }
        },
        created () {
            console.log(this.childName);
            console.log(this.childTable)
        },
        methods: {

        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">

</style>