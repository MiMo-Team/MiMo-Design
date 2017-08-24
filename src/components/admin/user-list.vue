<!-- ============= user-list module ============= -->
<template>
    <!--table resault-->
    <div id="user-list">
        <!--删选/操作 模块-->
        <sticky className="sticky-navbar" :stickyTop="50" :stickyHeight="56">
            <el-row :span="24" class="filter-container">
                <el-row :gutter="10" class="filter-container">
                    <!--添加用户-->
                    <el-col :xs="12" :sm="6" :md="6" :lg="3">
                        <router-link to="/adm/add" class="">
                            <el-button type="primary" class="filter-item-btn" v-waves icon="plus">添加新用户</el-button>
                        </router-link>
                    </el-col>
                    <!--查找用户-->
                    <el-col :xs="12" :sm="6" :md="6" :lg="3">
                        <el-dropdown @command="searchUser" class="filter-item-btn">
                            <el-button type="primary" style="width: 100%">
                                查找用户<i class="el-icon-caret-bottom el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="account">账号查找用户</el-dropdown-item>
                                <el-dropdown-item command="email">邮箱查找用户</el-dropdown-item>
                                <el-dropdown-item command="mobile">手机查找用户</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <!--导出-->
                    <el-col :xs="12" :sm="6" :md="6" :lg="2">
                        <el-button class="filter-item-btn" type="primary" v-waves icon="document" @click="handleDownload">导出</el-button>
                    </el-col>
                    <!--刷新-->
                    <el-col :xs="12" :sm="6" :md="6" :lg="2">
                        <el-button class="filter-item-btn" type="primary" v-waves icon="" v-on:click.native="refreshList">
                            <icon-svg icon-class="refresh"></icon-svg>
                            刷新
                        </el-button>
                    </el-col>
                    <!--删选-->
                    <el-col :xs="24" :sm="4" :md="6" :lg="5">
                        <h5 class="filter-item txtC" style="width: 100%;">删选</h5>
                    </el-col>
                    <!--权限筛选-->
                    <el-col :xs="24" :sm="7" :md="6" :lg="3">
                        <el-select clearable class="filter-item" v-model="Filter.status" placeholder="权限" @change='statusFilter'>
                            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                    <!--选择职能-->
                    <el-col :xs="24" :sm="9" :md="6" :lg="4">
                        <el-select clearable class="filter-item" v-model="Filter.role" placeholder="职能" @change='roleFilter'>
                            <el-option v-for="item in roleOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                    <!--选择性别-->
                    <el-col :xs="24" :sm="4" :md="6" :lg="2">
                        <el-select clearable class="filter-item" v-model="Filter.sex" placeholder="性别" @change='sexFilter'>
                            <el-option v-for="item in sexOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-row>
        </sticky>
        <!--用户列表-->
        <el-table border fit :data="currentPageData" v-loading.body="listLoading"
                  highlight-current-row ref="userListTable" style="width: 100%">
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
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="Filter.listpage.currentPage"
                    :page-sizes="[10, 20, 40, 80]"
                    :page-size="Filter.listpage.pageSize"
                    layout=" sizes, prev, pager, next,jumper"
                    :total="Filter.listpage.dataTotal">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default{
        name: 'user-list',
        props: {
            listData: Object  //定义传值的类型<br>
        },
        data: function () {
            return {
                deleteUserWarn: '确定要删除该用户吗？',
                //列表是否正在正在加载
                listLoading: true,
                //表格当前页显示数据
                currentPageData: [],
                //中转存储数据
                storageData: [],
                //删选(包含翻页)
                Filter: {
                    status: undefined,
                    role: undefined,
                    sex: undefined,
                    listpage: {
                        currentPage: 1,
                        pageSize: 20,
                        dataTotal: null
                    }
                },
                //status
                statusOptions: [
                    {key: 'admin', val: '管理员'},
                    {key: 'normalUser', val: '普通用户'},
                    {key: 'disapply', val: '待审核'},
                    {key: 'disable', val: '禁用'},
                ],
                //role
                roleOptions: [
                    {key: '总监', val: '总监'},
                    {key: '设计及制版', val: '设计及制版'},
                    {key: '运营', val: '运营'},
                    {key: '行政财务', val: '行政财务'},
                    {key: '物料管理及仓管', val: '物料管理及仓管'},
                    {key: '客服', val: '客服'},
                    {key: '制造', val: '制造'},
                    {key: '其他', val: '其他'},
                ],
                //sex
                sexOptions: [
                    {key: 'male', val: '男士'},
                    {key: 'female', val: '女士'},
                    {key: 'secrecy', val: '保密'},
                ]
            }
        },
        created () {
            this.listLoading = true;
            /*无删选状态加载所有数据*/
            this.getList(this, this.$store.state.mock.url.userListDataUrl, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                this.storageData = r.user;
            }, () => {
                this.listLoading = false;
            });
        },
        methods: {
            //basic loading
            loadingList(){
                this.listLoading = true;
                /*无删选状态加载所有数据*/
                this.getList(this, this.$store.state.mock.url.userListDataUrl, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                    this.storageData = r.user
                        .filter_fixedVal('status', this.Filter.status)
                        .filter_fixedVal('sex', this.Filter.sex)
                        .filter_arrValue_role('role', this.Filter.role);
                }, () => {
                    this.listLoading = false;
                });
            },
            //refresh
            refreshList(){
                console.log('正在刷新...........');
                const Filterinit = {
                    status: undefined,
                    role: undefined,
                    sex: undefined,
                    listpage: {
                        currentPage: 1,
                        pageSize: 10,
                        dataTotal: null
                    },
                };
                //无选择删选的情况下，强制性执行loadingList 刷新，在已选定删选条件的情况下，初始化数据即可同步刷新
                JSON.stringify(this.Filter) === JSON.stringify(Filterinit) ? this.loadingList() : this.Filter = Filterinit;
            },
            statusFilter(){
                this.loadingList();
            },
            roleFilter(){
                this.loadingList();
            },
            sexFilter(){
                this.loadingList();
            },
            //pagination handle
            handleSizeChange(val){
                this.Filter.listpage.pageSize = val;
                this.loadingList();
            },
            handleCurrentChange(val){
                this.Filter.listpage.currentPage = val;
                this.loadingList();
            },
            //输入搜索回调
            hd(val, tit){
                //向父级发送信息
                this.$emit('toadmin', {
                    'listShow': false,
                    'searchShow': true,
                    'searchVal': val,
                    'searchTit': tit,
                });
            },
            //搜索用户
            searchUser(command) {
                //账号搜索用户
                if (command === "account") {
                    const rule = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{2,}$/;
                    //弹出输入框
                    this.promptInput(this, '请输入用户账号搜索', '搜索用户', rule, '用户账号格式不正确', (val) => {
                        this.hd(val, '账号查找用户：');
                    }, () => {
                    })
                }
                //邮箱搜索用户
                else if (command === "email") {
                    const rule = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
                    this.promptInput(this, '请输入用户邮箱搜索', '搜索用户', rule, '用户邮箱格式不正确', (val) => {
                        this.hd(val, '邮箱查找用户：');
                    }, () => {
                    })
                }
                //手机搜索用户
                else {
                    const rule = /^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|14[7]\d{8}|15[89]\d{8}|18[0-9]\d{8}$/;
                    this.promptInput(this, '请输入用户手机搜索', '搜索用户', rule, '用户手机格式不正确', (val) => {
                        this.hd(val, '手机查找用户：');
                    }, () => {
                    })
                }
            },
            //编辑用户
            handleEdit(index, row) {
                this.$store.dispatch('userInfoCarrier', row);
                this.$router.push({path: '/adm/edit'});
            },
            //删除用户
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
            //excel 下载
            handleDownload(){
                require.ensure([], () => {
                    const {export_json_to_excel} = require('../../vendor/Export2Excel');
                    const tHeader = ['工号','账户名', '姓名', '职位', '性别', '状态', '手机', '邮箱', '微信号', '生日','备注'];
                    const filterVal = ['jobNum', 'account', 'name', 'role', 'sex', 'status', 'mobile', 'email','WeChat','birthday', 'remarks'];
                    const data = this.formatJson(filterVal, this.currentPageData);
                    export_json_to_excel(tHeader, data, 'MiMo服装设计后台管理系统 - 员工信息数据');
                })
            },
            //excel 转换显示形式
            formatJson(filterVal, jsonData){
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'sex') {
                        return this.Display_KeytoVal(v[j], this.sexOptions);
                    }
                    else if (j === 'status') {
                        return this.Display_KeytoVal(v[j], this.statusOptions);
                    } else {
                        return v[j]
                    }
                }))
            },
        }
    }
</script>


