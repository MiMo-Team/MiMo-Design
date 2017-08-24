<!-- ============= Add Library - Bill ============= -->
<template>
    <div class="win fr" id="accessoriesList">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/index'"></multi-handle>
        <div class="wm">
            <!--tit-->
            <p class="win-tit"><span>▌</span>&nbsp;面辅料目录</p>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="8" :lg="6">
                    <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="padding: 10px 0">
                    </el-input>
                    <el-tree class="filter-tree" show-checkbox node-key="classification" highlight-current default-expand-al="false"
                             :data="classifyData" :props="defaultProps" :default-expanded-keys="['面料-毛']" ref="classifyTree"
                             :filter-node-method="filterNode" v-loading.body="treeLoading" @check-change="handleCheckChange">
                    </el-tree>
                </el-col>
                <el-col :xs="24" :sm="24" :md="16" :lg="18">
                    <!--操作按钮-->
                    <el-row :gutter="10" class="filter-container" style="padding-bottom: 10px">
                        <el-col :xs="12" :sm="12" :md="12" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="addClassify">
                                <icon-svg icon-class="addition"></icon-svg>
                                新增分类
                            </el-button>
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="editClassify">
                                <icon-svg icon-class="editor"></icon-svg>
                                编辑分类
                            </el-button>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="8" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="refresh">
                                <icon-svg icon-class="refresh"></icon-svg>
                                刷新分类
                            </el-button>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="8" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="resetChecked">
                                <icon-svg icon-class="close"></icon-svg>
                                取消所选
                            </el-button>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="8" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="removeChecked">
                                <icon-svg icon-class="empty"></icon-svg>
                                删除所选
                            </el-button>
                        </el-col>
                    </el-row>
                    <!--列表-->
                    <el-table ref="accessoriesList" :data="currentPageData" v-loading.body="listLoading">
                        <el-table-column type="expand">
                            <template scope="props">
                                <el-form inline class="demo-table-expand">
                                    <div style="width: 88%">
                                        <el-form-item label="备注:" style="width: 12%"></el-form-item>
                                        <el-form-item style="width: 88%">
                                            <span>{{ props.row.remarks }}</span>
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </template>
                        </el-table-column>
                        <!--单号-->
                        <el-table-column align="center" label="单号" min-width="180px">
                            <template scope="scope">
                                <span>{{scope.row.storageNum}}</span>
                            </template>
                        </el-table-column>
                        <!--面辅料名称-->
                        <el-table-column align="center" label="面辅料名称" min-width="120px">
                            <template scope="scope">
                                <span>{{scope.row.accessories}}</span>
                            </template>
                        </el-table-column>
                        <!--所属分类-->
                        <el-table-column align="center" label="所属分类" min-width="160px">
                            <template scope="scope">
                                <span>{{scope.row.classification}}</span>
                            </template>
                        </el-table-column>
                        <!--计量单位-->
                        <el-table-column align="center" label="计量单位" min-width="100px">
                            <template scope="scope">
                                <span>{{scope.row.measureunit}}</span>
                            </template>
                        </el-table-column>
                        <!--单价(元)-->
                        <el-table-column align="center" label="单价(元)" min-width="100px">
                            <template scope="scope">
                                <span>{{scope.row.unitPrice}}</span>
                            </template>
                        </el-table-column>
                        <!-- 当前库存-->
                        <el-table-column align="center" label="当前库存" min-width="120px">
                            <template scope="scope">
                                <span>{{scope.row.stock}}</span>
                            </template>
                        </el-table-column>
                        <!-- 库存总额(元)-->
                        <el-table-column align="center" label="库存总额(元)" min-width="100px">
                            <template scope="scope">
                                <span>{{scope.row.sumMoney}}</span>
                            </template>
                        </el-table-column>
                        <!--管理员 - 固定栏-->
                        <el-table-column prop="handle" label="操作" min-width="120" fixed="right" v-if="this.$store.state.user.info.status === 'admin'">
                            <template scope="scope">
                                <el-button type="primary" size="small" icon="edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
                                <el-button type="primary" size="small" icon="delete" @click.native.prevent="deleteDepot(scope.$index, currentPageData)"></el-button>
                            </template>
                        </el-table-column>
                        <!--用户 - 固定栏-->
                        <el-table-column prop="handle" label="操作" min-width="80" fixed="right" v-if="this.$store.state.user.info.status !== 'admin'">
                            <template scope="scope">
                                <el-button type="primary" size="small" icon="view" @click="handleView(scope.$index, scope.row)"></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="block txtC" v-show="!listLoading">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="Filter.listpage.currentPage"
                                :page-sizes="[12,24,36,48]"
                                :page-size="Filter.listpage.pageSize"
                                layout=" total, sizes, prev, pager, next, jumper"
                                :total="Filter.listpage.dataTotal">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <dialog-accessories-list :temp="temp" v-on:tempChange="tempChange" v-if="temp.dialogFormVisible"></dialog-accessories-list>
            <el-tooltip placement="top" content="返回顶部">
                <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
            </el-tooltip>
        </div>
    </div>
</template>
<script>
    import dialogAccessoriesList from '../../components/dialog/dialog-accessoriesList.vue';
    import {billBasic} from './index';
    export default{
        name: 'accessoriesList',
        components: {
            billBasic,
            dialogAccessoriesList
        },
        data() {
            return {
                //列表是否正在正在加载
                listLoading: true,
                //分类是否正在正在加载
                treeLoading: true,
                deleteWarn: '确定要删除该面辅料分类信息吗？',
                //树状图数据
                classifyData: [],
                //树状图关键字段
                defaultProps: {
                    children: 'children',
                    label: 'accessories'
                },
                filterText: '',
                //表格当前页显示数据
                currentPageData: [],
                //中转存储数据
                storageData: [],
                //删选(包含翻页)
                Filter: {
                    listpage: {
                        currentPage: 1,
                        pageSize: 12,
                        dataTotal: null
                    },
                },
                //传递模板信号
                temp: {},
                //back to top style
                myBackToTopStyle: {
                    right: '50px',
                    bottom: '50px',
                    width: '40px',
                    height: '40px',
                    'border-radius': '4px',
                    'line-height': '45px', // 请保持与高度一致以垂直居中
                    background: '#e7eaf1',// 按钮的背景颜色
                    'z-index': 2002
                },
            };
        },
        created () {
            this.classifyLoading();
            this.formLoading();
        },
        watch: {
            filterText(val) {
                this.$refs.classifyTree.filter(val);
            }
        },
        methods: {
            //send answer  back  func
            tempChange: function (n) {
                this.refresh();
            },
            //基础加载分类列表
            classifyLoading(){
                this.treeLoading = true;
                this.axios.post(this.$store.state.mock.url.DepotClassifyUrl, {},
                    () => {
                    },
                    r => {
                        this.classifyData = r.DepotClassify.data;
                        this.treeLoading = false;
//                        console.log('成功回调:' + JSON.stringify(this.classifyData, null, 4));
                    });
            },
            //加载面辅料列表
            formLoading(){
                this.getLayersList(this, this.$store.state.mock.url.DepotClassifyUrl, {},
                    this.Filter.listpage.currentPage, this.Filter.listpage.pageSize, (r) => {
                        const firstitems = r.DepotClassify.data;
                        for (let i = 0; i < firstitems.length; i++) {
                            if (firstitems[i].children && firstitems[i].children.length > 0) {
                                const seconditems = firstitems[i].children;
                                for (let j = 0; j < seconditems.length; j++) {
                                    if (seconditems[j].children && seconditems[j].children.length > 0) {
                                        const thirditems = seconditems[j].children;
                                        for (let k = 0; k < thirditems.length; k++) {
                                            this.storageData.push(thirditems[k]);
                                        }
                                    }
                                    else {
                                        this.storageData.push(seconditems[j]);
                                    }
                                }
                            }
                            else {
                                this.storageData.push(firstitems[i]);
                            }
                        }
                    }, () => {
                        this.listLoading = false;
                    });
            },
            //分类选择
            handleCheckChange(){
                this.$refs.classifyTree.getCheckedNodes().length > 0 ?
                    this.currentPageData = this.$refs.classifyTree.getCheckedNodes() :
                    this.formLoading();
            },
            //刷新
            refresh(){
                this.resetChecked();
                this.classifyLoading();
                this.formLoading();
                this.Filter = {
                    listpage: {
                        currentPage: 1,
                        pageSize: 12,
                        dataTotal: null
                    }
                };
            },
            //清除所选分类
            resetChecked(){
                this.$refs.classifyTree.setCheckedKeys([]);
            },
            //新增分类
            addClassify(){
                this.temp = {
                    dialogFormVisible: true,
                    dialogStatus: 'create',
                    classifyData: this.classifyData,
                    data: {}
                };
            },
            //查看列表当前数据
            handleView(index, row){
                this.temp = {
                    dialogFormVisible: true,
                    dialogStatus: 'view',
                    classifyData: this.classifyData,
                    data: row
                };
            },
            //编辑当前分类
            editClassify(){
                if (this.$refs.classifyTree.getCheckedNodes().length === 1) {
                    this.temp = {
                        dialogFormVisible: true,
                        dialogStatus: 'edit',
                        classifyData: this.classifyData,
                        data: this.$refs.classifyTree.getCheckedNodes()[0]
                    };
                }
                else {
                    this.unrepeatMsg(this, '请从左侧分类列表中选择一项进行编辑', 'warning', 2400, () => {
                        this.submitSwitch = true;
                    });
                }
            },
            //编辑列表当前数据
            handleEdit(index, row){
                this.temp = {
                    dialogFormVisible: true,
                    dialogStatus: 'edit',
                    classifyData: this.classifyData,
                    data: row
                };
            },
            //删除所选分类
            removeChecked() {
                if (this.$refs.classifyTree.getCheckedNodes().length >= 1) {
                    this.$confirm('您确认需要删除吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '返回',
                        type: 'warning'
                    }).then(() => {
                        this.axios.post(this.$store.state.mock.url.DepotAccessoriesDelete, {
                                handletype: 'delete', data: this.$refs.classifyTree.getCheckedNodes()
                            }, () => {
                            },
                            r => {
                                if (r.check.feedback_pass) {
                                    this.refresh();
                                    this.$message({message: '删除成功', type: 'success', duration: 2000});
                                }
                                else {
                                    this.$message({message: '删除失败，请联系管理员', type: 'error', duration: 2000});
                                }
                            },
                            () => {
                                this.$message({message: '删除失败，请联系管理员', type: 'error', duration: 2000});
                            }
                        );
                    }).catch(() => {
                        return false;
                    });
                } else {
                    this.unrepeatMsg(this, '请从左侧分类列表中选择一项进行删除', 'warning', 2400, () => {
                        this.submitSwitch = true;
                    });
                }

            },
            //删除列表当前数据
            deleteDepot(index, rows){
                this.$confirm(this.deleteWarn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '返回',
                    type: 'warning'
                }).then(() => {
                    this.axios.post(this.$store.state.mock.url.DepotAccessoriesDelete, {
                            handletype: 'delete', data: rows
                        }, () => {
                        },
                        r => {
                            if (r.check.feedback_pass) {
                                rows.splice(index, 1);
                                this.refresh();
                                this.$message({message: '删除成功', type: 'success', duration: 2000});
                            }
                            else {
                                this.$message({message: '删除失败，请联系管理员', type: 'error', duration: 2000});
                            }
                        },
                        () => {
                            this.$message({message: '删除失败，请联系管理员', type: 'error', duration: 2000});
                        }
                    );
                }).catch(() => {
                    return false;
                });
            },
            //搜索分类
            filterNode(value, data) {
                if (!value) return true;
                return data.accessories.indexOf(value) !== -1;
            },
            //pagination handle
            handleSizeChange(val){
                this.Filter.listpage.pageSize = val;
                this.formLoading();
            },
            handleCurrentChange(val){
                this.Filter.listpage.currentPage = val;
                this.formLoading();
            },
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    $label_width: 120px;
    $dialog_top: 40px;
    $dialog_bottom: 40px;
    #accessoriesList {
        .el-dialog {
            height: calc(100% - (#{$dialog_top} + #{$dialog_bottom}));
            margin-top: $dialog_top;
            margin-bottom: $dialog_bottom;
            overflow-y: auto;
        }
        .el-date-editor i.el-input__icon {
            right: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 100%;
        }
    }
</style>

