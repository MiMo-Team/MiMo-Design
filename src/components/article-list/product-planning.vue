<template>
    <div class="wm" id="product-planning">
        <!--tit-->
        <p class="win-tit"><span>▌</span>&nbsp;{{tit}}</p>
        <!--删选/操作 模块-->
        <sticky className="sticky-navbar" :stickyTop="50" :stickyHeight="56">
            <el-row :span="24" class="filter-container">
                <el-row :gutter="10">
                    <!--添加-->
                    <el-col :xs="24" :sm="8" :md="6" :lg="2">
                        <el-button class="filter-item-btn" v-waves @click.native.prevent="handleCreate" type="primary" icon="edit">添加</el-button>
                    </el-col>
                    <!--导出-->
                    <el-col :xs="24" :sm="8" :md="6" :lg="2">
                        <el-button class="filter-item-btn" type="primary" v-waves icon="document" @click="handleDownload">导出</el-button>
                    </el-col>
                    <!--刷新-->
                    <el-col :xs="24" :sm="8" :md="6" :lg="2">
                        <el-button class="filter-item-btn" type="primary" v-waves icon="" v-on:click.native="refreshList">
                            <icon-svg icon-class="refresh"></icon-svg>
                            刷新
                        </el-button>
                    </el-col>
                    <!--搜索标题-->
                    <el-col :xs="24" :sm="24" :md="7" :lg="4">
                        <el-input @keyup.enter.native="titFilter" class="filter-item" placeholder="标题" v-model="Filter.title"></el-input>
                    </el-col>
                    <!--选择日期范围-->
                    <el-col :xs="24" :sm="24" :md="5" :lg="5">
                        <div class="date-picker filter-item" style="width: 100%">
                            <el-date-picker
                                    v-model="Filter.timestamp"
                                    type="daterange"
                                    align="right"
                                    placeholder="选择日期范围"
                                    :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </div>
                    </el-col>
                    <!--类型筛选-->
                    <el-col :xs="24" :sm="8" :md="4" :lg="3">
                        <el-select clearable class="filter-item" v-model="Filter.type" placeholder="类型" @change='typeFilter'>
                            <el-option v-for="item in  typeOptions" :key="item.key" :label="item.val+'('+item.key+')'" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                    <!--选择重要性-->
                    <el-col :xs="24" :sm="8" :md="4" :lg="3">
                        <el-select clearable class="filter-item" v-model="Filter.importance" placeholder="重要性" @change='importanceFilter'>
                            <el-option v-for="item in importanceOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                    <!--显示审核人-->
                    <el-col :xs="24" :sm="8" :md="4" :lg="3">
                        <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="Filter.showAuditor">显示审核人</el-checkbox>
                    </el-col>
                </el-row>
            </el-row>
        </sticky>
        <!--列表-->
        <el-table border fit :key='tableKey' :data="currentPageData" v-loading.body="listLoading"
                  highlight-current-row style="width: 100%">
            <!--序号-->
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <!--发布时间-->
            <el-table-column align="center" label="发布时间" min-width="180">
                <template scope="scope"><span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span></template>
            </el-table-column>
            <!--标题-->
            <el-table-column label="标题" min-width="300">
                <template scope="scope">
                    <span class="msg-tit" @click="handleEdit(scope.$index, scope.row)">{{scope.row.title}}&nbsp;</span>
                    <el-tag>{{scope.row.type | Display_KeytoVal(typeOptions)}}</el-tag>
                </template>
            </el-table-column>
            <!--发布者-->
            <el-table-column align="center" label="发布者" min-width="120">
                <template scope="scope"><span>{{scope.row.author}}</span></template>
            </el-table-column>
            <!--审核人-->
            <el-table-column v-if='Filter.showAuditor' align="center" label="审核人" min-width="120px">
                <template scope="scope"><span style='color:red;'>{{scope.row.auditor}}</span></template>
            </el-table-column>
            <!--状态-->
            <el-table-column class-name="status-col" label="状态" min-width="100">
                <template scope="scope">
                    <el-tag :type="scope.row.status + '_style' | Display_KeytoVal(statusShow)">{{scope.row.status | Display_KeytoVal(statusShow)}}</el-tag>
                </template>
            </el-table-column>
            <!--重要性-->
            <el-table-column label="重要性" min-width="120">
                <template scope="scope">
                    <icon-svg v-for="n in +scope.row.importance" icon-class="select_fill" class="meta-item__icon" :key="n"></icon-svg>
                </template>
            </el-table-column>
            <!--阅读数-->
            <el-table-column align="center" label="阅读数" min-width="100">
                <template scope="scope"><span class="link-type">{{scope.row.pageviews}}</span></template>
            </el-table-column>
            <!-- 固定栏 操作-->
            <el-table-column align="center" label="操作" prop="handle" fixed="right" min-width="200" v-if="this.$store.state.user.info.status === 'admin'">
                <template scope="scope">
                    <!--编辑-->
                    <el-button type="primary" size="small" icon="edit" @click.native.prevent="handleEdit(scope.$index, scope.row)"></el-button>
                    <!--删除-->
                    <el-button type="danger" size="small" icon="delete" @click.native.prevent="deleteRow(scope.$index, currentPageData)"></el-button>
                    <!--状态操作-->
                    <el-dropdown style="margin-left: 9px">
                        <el-button type="success" size="small">
                            状态<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="handleModifyStatus(scope.row, 'pass')">审核通过</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="handleModifyStatus(scope.row, 'checking')">审核中</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="handleModifyStatus(scope.row, 'unpass')">再议</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block txtC" v-show="!listLoading">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="Filter.listpage.currentPage"
                    :page-sizes="[15,25,35,45]"
                    :page-size="Filter.listpage.pageSize"
                    layout=" total, sizes, prev, pager, next, jumper"
                    :total="Filter.listpage.dataTotal">
            </el-pagination>
        </div>
        <!--弹出编辑框-->
        <dialog-product-planning :temp="temp" :typeOptions="typeOptions" v-on:tempChange="tempChange" v-if="temp.dialogFormVisible"></dialog-product-planning>
    </div>
</template>
<script>
    import dialogProductPlanning from '../../components/dialog/dialog-productPlanning.vue';
    import {pickerOptions} from '../../utils/index';
    export default {
        name: 'planning',
        props: {
            tit: String
        },
        components: {
            dialogProductPlanning
        },
        data() {
            return {
                deleteWarn: '确定要删除该信息吗？',
                //列表是否正在正在加载
                listLoading: true,
                //表格当前页显示数据
                currentPageData: [],
                //中转存储数据
                storageData: [],
                //删选(包含翻页)
                Filter: {
                    timestamp: undefined,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    showAuditor: false,
                    listpage: {
                        currentPage: 1,
                        pageSize: 15,
                        dataTotal: null
                    },
                },
                //type
                typeOptions: [
                    {key: 'market', val: '市场'},
                    {key: 'marketing', val: '营销'},
                    {key: 'design', val: '设计'},
                    {key: 'cooperation', val: '合作'},
                    {key: 'operate', val: '运营'},
                    {key: 'other', val: '其他'},
                ],
                //importance
                importanceOptions: [
                    {key: 1, val: '1星'},
                    {key: 2, val: '2星'},
                    {key: 3, val: '3星'},
                    {key: 4, val: '4星'},
                    {key: 5, val: '5星'},
                ],
                //status
                statusShow: {
                    pass: '审核通过',
                    checking: '审核中',
                    unpass: '再议',
                    pass_style: 'success',
                    checking_style: 'primary',
                    unpass_style: 'danger'
                },
                //data picker
                pickerOptions: pickerOptions,
                //传递模板信号
                temp: {},
                //显示审核人
                tableKey: 0
            }
        },
        created(){
            /*无删选状态加载所有数据*/
            this.getList(this, this.$store.state.mock.url.producPlanningUrl, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                this.storageData = r.producPlanning;
            }, () => {
                this.listLoading = false;
            });
        },
        watch: {
            'Filter.timestamp': {
                handler(curVal, oldVal)
                {
                    this.loadingList();
                }
            }
        },
        methods: {
            //新增/编辑 条目返回操作
            tempChange: function (n) {
                console.log('新增完成！！！');
                if (n.changeType === 'create') {
                    this.refreshList();
                    //延迟执行 - 插入 新建 信息条目（前端模拟效果插入，项目中把这段删除即可，在添加动作完成后页面自动刷新，重新加载数据）
                    const unshift = setTimeout(() => {
                        this.currentPageData.unshift(n.tempChange);
                        clearInterval(unshift);
                    }, 800);
                }
                else {
                    this.loadingList();
                    const index = this.currentPageData.indexOf(this.temp.data);
                    //延迟执行 - 插入 编辑 信息条目（前端模拟效果插入，项目中把这段删除即可，在添加动作完成后页面自动刷新，重新加载数据）
                    const ed = setTimeout(() => {
                        this.currentPageData.splice(index, 1, n.tempChange);
                        clearInterval(ed);
                    }, 800);
                }
            },
            //basic loading
            loadingList(){
                this.listLoading = true;
                /*无删选状态加载所有数据*/
                this.getList(this, this.$store.state.mock.url.producPlanningUrl, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                    this.storageData = r.producPlanning
                        .filter_Data_section('timestamp', this.Filter.timestamp)
                        .filter_fixedVal('type', this.Filter.type)
                        .filter_fixedVal('importance', this.Filter.importance);
                }, () => {
                    this.listLoading = false;
                });
            },
            //filter
            titFilter(){
                this.loadingList();
            },
            importanceFilter(){
                this.loadingList();
            },
            typeFilter(){
                this.loadingList();
            },
            //refresh
            refreshList(){
                console.log('正在刷新...........');
                const Filterinit = {
                    timestamp: undefined,
                    importance: undefined,
                    title: undefined,
                    type: undefined,
                    showAuditor: false,
                    listpage: {
                        currentPage: 1,
                        pageSize: 15,
                        dataTotal: null
                    },
                };
                //无选择删选的情况下，强制性执行loadingList 刷新，在已选定删选条件的情况下，初始化数据即可同步刷新
                JSON.stringify(this.Filter) === JSON.stringify(Filterinit) ? this.loadingList() : this.Filter = Filterinit;
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
            //handle Del
            deleteRow(index, rows){
                this.$confirm(this.deleteWarn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                }).catch(() => {
                    return false;
                });
            },
            //handle Modify-Status
            handleModifyStatus(row, command){
                this.axios.post(this.$store.state.mock.url.announcementEdit, {status: command},
                    data => {
                    },
                    r => {
                        if (r.check.feedback_pass) {
                            row.status = command;
                        }
                    })
            },
            //初始传递信息
            resetTemp(){
                this.temp = {
                    dialogFormVisible: true,
                    dialogStatus: 'create',
                    data: {
                        type: '',
                        status: 'checking',
                        title: '',
                        author: '',
                        auditor: '西兰花的春天',
                        importance: null,
                        content: '',
                        pageviews: 0,
                        timestamp: +new Date(),
                    }
                };
            },
            //新增通告
            handleCreate(){
                this.resetTemp();
            },
            //编辑当前通告
            handleEdit(index, row){
                this.resetTemp();
                this.temp.dialogFormVisible = true;
                this.temp.dialogStatus = 'edit';
                this.temp.data = row;
            },
            //excel 下载
            handleDownload(){
                require.ensure([], () => {
                    const {export_json_to_excel} = require('../../vendor/Export2Excel');
                    const tHeader = ['时间', '标题', '类型', '通告状态', '重要性', '内容', '发布人', '审核人', '阅读数'];
                    const filterVal = ['timestamp', 'title', 'type', 'status', 'importance', 'content', 'author', 'auditor', 'pageviews'];
                    const data = this.formatJson(filterVal, this.currentPageData);
                    export_json_to_excel(tHeader, data, 'MiMo服装设计后台管理系统 - 产品企划方案');
                })
            },
            //excel 转换显示形式
            formatJson(filterVal, jsonData){
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return this.parseTime(v[j], '{y}-{m}-{d} {h}:{i}')
                    }
                    else if (j === 'type') {
                        return this.Display_KeytoVal(v[j], this.typeOptions);
                    }
                    else if (j === 'status') {
                        return this.Display_KeytoVal(v[j], this.statusShow);
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>
