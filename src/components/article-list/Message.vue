<template>
    <div class="wm user-message">
        <!--tit-->
        <div class="win-tit">
            <span>▌&nbsp;消息</span>
            <span class='unread'>您有<i @click="checkUnread">{{unreadTotal}}</i>条未读信息</span>
        </div>
        <!--删选/操作 模块-->
        <sticky className="sticky-navbar" :stickyTop="50" :stickyHeight="56">
            <el-row :span="24" class="filter-container">
                <el-row :gutter="10">
                    <!--发送消息-->
                    <el-col :xs="12" :sm="6" :md="4" :lg="3">
                        <el-button class="filter-item-btn" v-waves @click.native.prevent="handleSend" type="primary" icon="edit">发送消息</el-button>
                    </el-col>
                    <!--刷新-->
                    <el-col :xs="12" :sm="5" :md="4" :lg="2">
                        <el-button class="filter-item-btn" type="primary" v-waves icon="" :disabled="refreshable" v-on:click.native="refreshList">
                            <icon-svg icon-class="refresh"></icon-svg>
                            刷新
                        </el-button>
                    </el-col>
                    <!--搜索标题-->
                    <el-col :xs="24" :sm="13" :md="16" :lg="5">
                        <el-input @keyup.enter.native="titFilter" class="filter-item" placeholder="标题搜索" v-model="Filter.title"></el-input>
                    </el-col>
                    <!--选择日期范围-->
                    <el-col :xs="24" :sm="10" :md="12" :lg="5">
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
                    <!--已读未读筛选-->
                    <el-col :xs="8" :sm="5" :md="4" :lg="3">
                        <el-select clearable class="filter-item" v-model="Filter.status" placeholder="状态" @change='statusFilter'>
                            <el-option v-for="item in  statusOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                    <!--选择重要性-->
                    <el-col :xs="8" :sm="5" :md="4" :lg="3">
                        <el-select clearable class="filter-item" v-model="Filter.importance" placeholder="重要性" @change='importanceFilter'>
                            <el-option v-for="item in importanceOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                        </el-select>
                    </el-col>
                    <!--显示重要性-->
                    <el-col :xs="8" :sm="4" :md="4" :lg="3">
                        <el-checkbox class="filter-item" @change='tableKey=tableKey+1' v-model="Filter.showImportance">显示重要性</el-checkbox>
                    </el-col>
                </el-row>
            </el-row>
        </sticky>
        <!--列表-->
        <el-table border fit :key='tableKey' :data="currentPageData" v-loading.body="listLoading"
                  highlight-current-row style="width: 100%">
            <!--序号-->
            <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
            <!--状态-->
            <el-table-column align="center" class-name="status-col" label="状态" min-width="76">
                <template scope="scope">
                    <el-tag :type="scope.row.status | statusType">{{scope.row.status | statusVal }}</el-tag>
                </template>
            </el-table-column>
            <!--重要性-->
            <el-table-column v-if='Filter.showImportance' align="center" label="重要性" min-width="120px">
                <template scope="scope">
                    <icon-svg v-for="n in +scope.row.importance" icon-class="select_fill" class="meta-item__icon" :key="n" style="color: slateblue"></icon-svg>
                </template>
            </el-table-column>
            <!--时间-->
            <el-table-column align="center" label="时间" min-width="160px">
                <template scope="scope">
                    <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <!--发送人-->
            <el-table-column align="center" label="发送人" min-width="90px">
                <template scope="scope">
                    <span>{{scope.row.sender}}</span>
                </template>
            </el-table-column>
            <!--标题-->
            <el-table-column align="center" label="标题" min-width="180px">
                <template scope="scope">
                    <span class="msg-tit" @click="handlecheck(scope.$index, scope.row)">{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <!--内容-->
            <el-table-column align="center" label="内容" min-width="260px">
                <template scope="scope">
                    <span class="msg-content">{{scope.row.content}}</span>
                </template>
            </el-table-column>
            <!--回复-->
            <el-table-column align="center" label="回复" min-width="300px">
                <template scope="scope">
                    <el-input v-show="scope.row.isquickEdit" size="small" v-model="scope.row.answer" placeholder="请输入回复内容"></el-input>
                    <span v-show="!scope.row.isquickEdit">{{ scope.row.answer }}</span>
                </template>
            </el-table-column>
            <!-- 固定栏 操作-->
            <el-table-column align="center" label="操作" prop="handle" fixed="right" min-width="200" v-if="this.$store.state.user.info.status === 'admin'">
                <template scope="scope">
                    <!--编辑-->
                    <el-button v-show='!scope.row.isquickEdit' type="primary" size="small" icon="edit"
                               @click.native.prevent="quickEdit(scope.$index, scope.row)">快速回复
                    </el-button>
                    <el-button v-show='scope.row.isquickEdit' type="success" size="small" icon="check"
                               @click.native.prevent="quickEditSubmit(scope.$index, scope.row)">完成
                    </el-button>
                    <!--状态操作-->
                    <el-dropdown style="margin-left: 9px">
                        <el-button type="primary" size="small">
                            操作<i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="handlecheck(scope.$index, scope.row)">查看</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="deleteRow(scope.$index, currentPageData)">删除</el-dropdown-item>
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
                    :page-sizes="[10,20,40,60]"
                    :page-size="Filter.listpage.pageSize"
                    layout=" total, sizes, prev, pager, next, jumper"
                    :total="Filter.listpage.dataTotal">
            </el-pagination>
        </div>
        <!--弹出编辑框-->
        <dialog-message :temp="temp" v-on:tempChange="tempChange" v-if="temp.dialogFormVisible"></dialog-message>
    </div>
</template>
<script>
    import {pickerOptions} from '../../utils/index';
    import dialogMessage from '../../components/dialog/dialog-message.vue';
    export default {
        name: 'user-message',
        components: {
            dialogMessage
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
                //status
                statusOptions: [
                    {key: 'unread', val: '未读'},
                    {key: 'readed', val: '已读'},
                ],
                //importance
                importanceOptions: [
                    {key: 1, val: '1星'},
                    {key: 2, val: '2星'},
                    {key: 3, val: '3星'},
                    {key: 4, val: '4星'},
                    {key: 5, val: '5星'},
                ],
                //删选(包含翻页)
                Filter: {
                    timestamp: undefined,
                    importance: undefined,
                    title: undefined,
                    status: undefined,
                    showImportance: false,
                    listpage: {
                        currentPage: 1,
                        pageSize: 15,
                        dataTotal: null
                    },
                },
                //data picker
                pickerOptions: pickerOptions,
                //传递模板信号
                temp: {},
                //show important
                tableKey: 0,
                //unread number
                unreadTotal: 0,
                //refresh switch
                refreshable: false
            }
        },
        watch: {
            'Filter.timestamp': {
                handler(curVal, oldVal)
                {
                    this.loadingList();
                }
            }
        },
        created(){
            /*无删选状态加载所有数据*/
            this.getList(this, this.$store.state.mock.url.messageUrl, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                for (let i = 0; i < r.message.length; i++) {
                    if (r.message[i].data.status === 'unread') {
                        this.unreadTotal++;
                    }
                }
                this.storageData = r.message;
            }, () => {
                this.listLoading = false;
            });
        },
        filters: {
            statusType(status) {
                const statusMap = {
                    readed: 'success',
                    unread: 'danger'
                };
                return statusMap[status]
            },
            statusVal(status) {
                const statusMap = {
                    readed: '已读',
                    unread: '未读'
                };
                return statusMap[status]
            }
        },
        methods: {
            //send answer  back  func
            tempChange: function (n) {
                if (n.changeType === 'send') {
                    this.loadingList();
                }
                else {
                    this.loadingList();
                    //延迟执行 - 插入 编辑 信息条目（前端模拟效果插入，项目中把这段删除即可，在添加动作完成后页面自动刷新，重新加载数据）
                    const index = this.currentPageData.indexOf(this.temp.data);
                    const ed = setTimeout(() => {
                        n.tempChange.status = 'readed';                 //修改为已读
                        this.unreadTotal--;
                        this.currentPageData.splice(index, 1, n.tempChange);
                        clearInterval(ed);
                    }, 800);
                }
            },
            //basic loading
            loadingList(){
                this.listLoading = true;
                this.getList(this, this.$store.state.mock.url.messageUrl, {}, this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                    this.storageData = r.message
                        .filter_Data_section('timestamp', this.Filter.timestamp)
                        .filter_fixedVal('status', this.Filter.status)
                        .filter_fixedVal('importance', this.Filter.importance);
                }, () => {
                    this.listLoading = false;
                });
            },
            //filter
            titFilter(){
                this.loadingList();
            },
            statusFilter(){
                this.loadingList();
            },
            importanceFilter(){
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
            //refresh
            refreshList(){
                const Filterinit = {
                    timestamp: undefined,
                    importance: undefined,
                    title: undefined,
                    status: undefined,
                    showImportance: false,
                    listpage: {
                        currentPage: 1,
                        pageSize: 15,
                        dataTotal: null
                    }
                };
                //无选择删选的情况下，强制性执行loadingList 刷新，在已选定删选条件的情况下，初始化数据即可同步刷新
                JSON.stringify(this.Filter) === JSON.stringify(Filterinit) ? this.loadingList() : this.Filter = Filterinit;
            },
            //rest temp data
            resetTemp(){
                this.temp = {
                    dialogFormVisible: true,
                    dialogStatus: 'send',
                    data: {
                        title: '',
                        recipient: '',
                        importance: null,
                        content: '',
                    }
                };
            },
            //send msg
            handleSend(){
                this.resetTemp();
            },
            //look up msg
            handlecheck(index, row){
                this.temp = {
                    dialogFormVisible: true,
                    dialogStatus: 'check',
                    data: row
                };
            },
            //quick answer msg
            quickEdit(index, row){
                row.isquickEdit = true;
                this.refreshable = true;
            },
            //quick answer msg - submit
            quickEditSubmit(index, row){
                this.axios.post(this.$store.state.mock.url.messageSend, {msg: row},
                    data => {
                    },
                    r => {
                        if (r.check.feedback_pass) {
                            row.isquickEdit = false;
                            this.refreshable = false;
                            row.status = 'readed';
                            this.unreadTotal--;
                        }
                    })
            },
            checkUnread(){
                this.Filter.status = 'unread';
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
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .user-message {
        .el-table {
            th {
                font-size: 14px;
            }
        }
    }
</style>
