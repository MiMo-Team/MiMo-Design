<!-- ============= search-list module ============= -->
<template>
    <!--search resault-->
    <div class="user-search" id="user-search">
        <!--top show -->
        <div class="searchTit">
            <!--<el-button type="text" size="large" v-on:click.native="backTable"><i class="el-icon-arrow-left"></i>返回</el-button>-->
            <h5>{{searchVal.tit}}<span>共显示<i>{{Filter.listpage.dataTotal}}</i>条</span></h5>
        </div>
        <!--用户列表-->
        <el-table ref="searchListTable" :data="currentPageData" v-loading.body="listLoading" style="width: 100%;">
            <!--展开-->
            <el-table-column type="expand">
                <template scope="props">
                    <el-form inline class="demo-table-expand clr">
                        <div class="table-expand-portrait fl">
                            <img v-bind:src="props.row.avatar" :alt="props.row.name + '的个人头像'" style="width: 100%;">
                        </div>
                        <div class="table-expand-content fl">
                            <el-form-item label="工号">
                                <span>{{ props.row.jobNum }}</span>
                            </el-form-item>
                            <el-form-item label="姓名">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="账户名">
                                <span>{{ props.row.account }}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span>{{ props.row.sex }}</span>
                            </el-form-item>
                            <el-form-item label="职位">
                                <span>{{ props.row.role }}</span>
                            </el-form-item>
                            <el-form-item label="状态">
                                <span>{{ props.row.status }}</span>
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <span>{{ props.row.email }}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <span>{{ props.row.mobile }}</span>
                            </el-form-item>
                            <el-form-item label="微信号">
                                <span>{{ props.row.WeChat }}</span>
                            </el-form-item>
                            <el-form-item label="生日">
                                <span>{{ props.row.birthday }}</span>
                            </el-form-item>
                            <el-form-item label="备注">
                                <span>{{ props.row.remarks }}</span>
                            </el-form-item>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <!--序号-->
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <!--工号-->
            <el-table-column align="center" label="工号" min-width="220">
                <template scope="scope"><span>{{scope.row.jobNum}}</span></template>
            </el-table-column>
            <!--姓名-->
            <el-table-column align="center" label="姓名" min-width="100">
                <template scope="scope"><span>{{scope.row.name}}</span></template>
            </el-table-column>
            <!--职能-->
            <el-table-column align="center" label="职位" min-width="150">
                <template scope="scope"><span>{{scope.row.role}}</span></template>
            </el-table-column>
            <!--性别-->
            <el-table-column align="center" label="性别" min-width="70">
                <template scope="scope"><span>{{scope.row.sex | Display_KeytoVal(sexOptions)}}</span></template>
            </el-table-column>
            <!--状态-->
            <el-table-column align="center" label="状态" min-width="100">
                <template scope="scope"><span>{{scope.row.status | Display_KeytoVal(statusOptions)}}</span></template>
            </el-table-column>
            <!--手机-->
            <el-table-column align="center" label="手机" min-width="180">
                <template scope="scope"><span>{{scope.row.mobile}}</span></template>
            </el-table-column>
            <!--邮箱-->
            <el-table-column align="center" label="邮箱" min-width="220">
                <template scope="scope"><span>{{scope.row.email}}</span></template>
            </el-table-column>
            <!--固定栏-->
            <el-table-column prop="handle" label="操作" min-width="150" fixed="right">
                <template scope="scope">
                    <el-button type="primary" size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button type="primary" size="small" icon="delete" @click.native.prevent="deleteUser(scope.$index, currentPageData)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block txtC">
            <el-pagination
                    :current-page="Filter.listpage.currentPage"
                    :page-sizes="[12, 24, 36, 48]"
                    :page-size="Filter.listpage.pageSize"
                    layout=" sizes, prev, pager, next,jumper"
                    :total="Filter.listpage.dataTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'user-search',
        props: {
            searchVal: Object
        },
        data() {
            return {
                deleteUserWarn: '确定要删除该用户吗？',
                //list loading
                listLoading: true,
                currentPageData: [],
                storageData: [],
                //status
                statusOptions: [
                    {key: 'admin', val: '管理员'},
                    {key: 'normalUser', val: '普通用户'},
                    {key: 'disapply', val: '待审核'},
                    {key: 'disable', val: '禁用'},
                ],
                //sex
                sexOptions: [
                    {key: 'male', val: '男士'},
                    {key: 'female', val: '女士'},
                    {key: 'secrecy', val: '保密'},
                ],
                Filter: {
                    listpage: {
                        currentPage: 1,
                        pageSize: 12,
                        dataTotal: null
                    }
                }
            };
        },
        created () {
            /* loading search user info */
            this.getList(this, this.$store.state.mock.url.userFullDataUrl, {'searchVal': this.searchVal.val}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                this.storageData = r.user;
            }, () => {
                this.listLoading = false;
            });
        },
        methods: {
            //back user list
            backTable: function () {
                //send to father compontent
                this.$emit('recieveSearchModular', {
                    'ls': true,
                    'ss': false,
                    'fs': true,
                    'rd': false,
                });
            },
            //delete this user
            deleteUser(index, rows) {
                this.$confirm(this.deleteUserWarn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                }).catch(() => {
                    return false;
                });
            },
            //edit this user
            handleEdit(index, row) {
                this.$store.dispatch('userInfoCarrier', this.currentPageData[0]);
                this.$router.push({path: '/adm/edit'});
            },
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    #user-search .searchTit {
        h5 span i {
            color: rgba(255, 73, 73, 0.98);
            padding: 0 4px;
        }
    }
</style>


