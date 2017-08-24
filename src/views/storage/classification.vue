<!-- ============= Add Library - Bill ============= -->
<template>
    <div class="win fr" id="storage-classification">
        <!--Multi-handle fixed -->
        <multi-handle :routerLink="'/index'"></multi-handle>
        <div class="wm">
            <!--tit-->
            <p class="win-tit"><span>▌</span>&nbsp;分类管理</p>
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="8" :lg="6">
                    <el-input v-model="filterText" placeholder="输入关键字进行过滤" style="padding: 10px 0">
                    </el-input>
                    <el-tree class="filter-tree" show-checkbox node-key="classification" highlight-current default-expand-al="false"
                             :data="classifyData" :props="defaultProps" :default-expanded-keys="['面料-毛']"
                             :filter-node-method="filterNode" ref="classifyTree" v-loading.body="treeLoading">
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
                            <el-button class="filter-item-btn" v-waves @click="basicLoading" :disabled="disableHandle">
                                <icon-svg icon-class="refresh"></icon-svg>
                                刷新分类
                            </el-button>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="8" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="resetChecked" :disabled="disableHandle">
                                <icon-svg icon-class="close"></icon-svg>
                                取消所选
                            </el-button>
                        </el-col>
                        <el-col :xs="8" :sm="8" :md="8" :lg="4">
                            <el-button class="filter-item-btn" v-waves @click="removeChecked" :disabled="disableHandle">
                                <icon-svg icon-class="empty"></icon-svg>
                                删除所选
                            </el-button>
                        </el-col>
                    </el-row>
                    <!--选项卡表单-->
                    <el-tabs v-model="activeName" type="card">
                        <!--操作说明-->
                        <el-tab-pane label="操作说明" name="操作说明" class="handlenotice">
                            <h2>新增分类</h2>
                            <p>点击新增分类按钮进行操作，请根据实际分类需求增加分类，注意：服装辅助件请添加至辅料，外包装材料请添加至其他</p>
                            <h2>编辑分类</h2>
                            <p>每次编辑请先<i>选择一种材料</i>，再点击编辑分类按钮进行操作，编辑内容实时上传，编辑内容请再详询公司相关负责人后再进行编辑修改，修改后请仔细核对内容</p>
                            <h2>操作须知</h2>
                            <p><span>字段索引值：</span>每种面辅料需根据实际情况添加索引值，字段索引值格式规范：<i>3-4位大写字母&nbsp;</i>+<i>&nbsp;1-2位数字编号</i>，如<i>GCX66</i></p>
                            <p><span>所在分类层级：</span>分类列表最多分为<i>3级</i>，请根据实际层级选择，若为大类请添加至1，细分大类请添加至2，具体材料请添加至3</p>
                            <p><span>二/三级分类：</span>当层级所在层级为2或3时，根据实际情况选择父级大类名称，若需新增父级大类，请选择自定义后再填写</p>
                            <p><span>分类描述：</span>分类描述请严格按照相关格式填写</p>
                        </el-tab-pane>
                        <!--表单分类-->
                        <el-tab-pane :label="activeFormName" :name="activeFormName" v-if="activeFormName">
                            <el-form :model="classifyForm" :rules="classifyRules" ref="classifyForm" label-position="right"
                                     label-width="180px" style="width: 90%">
                                <!--显示名称-->
                                <el-form-item label="显示名称:" prop="displayName" class="fullSize">
                                    <el-input v-model="classifyForm.displayName"></el-input>
                                </el-form-item>
                                <!--字段索引值-->
                                <el-form-item label="字段索引值:" prop="fieldIndex" class="fullSize">
                                    <el-input v-model="classifyForm.fieldIndex"></el-input>
                                </el-form-item>
                                <!--所在分类层级-->
                                <el-form-item label="所在分类层级:" prop="inIndex">
                                    <el-select class="basicSize" v-model="classifyForm.inIndex" placeholder="请选择">
                                        <el-option label="1" value="1"></el-option>
                                        <el-option label="2" value="2"></el-option>
                                        <el-option label="3" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                                <!--一级分类名称-->
                                <el-form-item label="一级分类:" prop="firstindex" v-if="classifyForm.inIndex === '2'|| classifyForm.inIndex === '3'">
                                    <el-select class="basicSize" v-model="classifyForm.firstindex" placeholder="请选择"
                                               @change="secondindexOptions = loadSecondOption(classifyForm.firstindex,classifyData)">
                                        <el-option v-for="item in  firstindexOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                                    </el-select>
                                    <el-input class="smallSize" v-model="classifyForm.firstindex_custom" v-if="classifyForm.firstindex === customVal"
                                              placeholder="请输入自定义名称"></el-input>
                                </el-form-item>
                                <!--二级大类名称-->
                                <el-form-item label="二级分类:" prop="secondindex" v-if="classifyForm.inIndex === '3'">
                                    <el-select class="basicSize" v-model="classifyForm.secondindex" placeholder="请选择">
                                        <el-option v-for="item in  secondindexOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                                    </el-select>
                                    <el-input class="smallSize" v-model="classifyForm.secondindex_custom" v-if="classifyForm.secondindex === customVal"
                                              placeholder="请输入自定义名称"></el-input>
                                </el-form-item>
                                <!--操作人-->
                                <el-form-item label="操作人:" prop="operator" class="fullSize">
                                    <el-input v-model="classifyForm.operator" :disabled="!!this.$store.state.user.info.name"></el-input>
                                </el-form-item>
                                <!--分类描述-->
                                <el-form-item label="分类描述:" prop="remarks" class="fullSize">
                                    <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="请输入分类描述" v-model="classifyForm.remarks"></el-input>
                                </el-form-item>
                                <!--提交-->
                                <el-form-item>
                                    <div class="win-submit">
                                        <el-button type="primary" @click="submitForm('classifyForm')">提交</el-button>
                                        <el-button @click="resetForm('classifyForm')">重置</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <el-tooltip placement="top" content="返回顶部">
            <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="500" :backPosition="0"></back-to-top>
        </el-tooltip>
    </div>
</template>
<script>
    import {billBasic} from './index';
    export default{
        name: 'storage-classification',
        components: {
            billBasic,
        },
        data() {
            //----- 字段索引值验证 -----
            const fieldIndex = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('字段索引值不能为空'));
                } else {
                    if (!/^[A-Z]{3,4}[0-9]{1,2}$/.test(value)) {
                        return callback(new Error('请输入正确的字段索引值'));
                    }
                    else {
                        callback();
                    }
                }
            };
            return {
                //列表是否正在正在加载
                treeLoading: true,
                submitSwitch: true,
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交',
                validateError: '请仔细检查是否正确填写',
                customVal:'自定义',
                //操作开关
                disableHandle: false,
                //当前模块
                activeName: '操作说明',
                activeFormName: null,
                issave: true,
                //first - index - options
                firstindexOptions: [],
                //third - index - options
                secondindexOptions: [],
                filterText: '',
                //树状图数据
                classifyData: [],
                defaultProps: {
                    children: 'children',
                    label: 'accessories'
                },
                //分类表单
                classifyForm: {
                    displayName: '',
                    fieldIndex: '',
                    inIndex: '',
                    firstindex: '',
                    firstindex_custom: '',
                    secondindex: '',
                    secondindex_custom: '',
                    operator: '',
                    remarks: '',
                },
                //表单验证
                classifyRules: {
                    displayName: [
                        {required: true, message: '请输入显示名称', trigger: 'blur'},
                    ],
                    fieldIndex: [
                        {required: true, validator: fieldIndex, trigger: 'blur'},
                    ],
                    inIndex: [
                        {required: true, message: '请选择分类层级', trigger: 'change'}
                    ],
                    firstindex: [
                        {required: true, message: '请选择一级分类', trigger: 'change'}
                    ],
                    secondindex: [
                        {required: true, message: '请选择二级分类', trigger: 'change'}
                    ],
                    operator: [
                        {required: true, message: '请输入操作人', trigger: 'blur'},
                    ],
                    remarks: [
                        {required: true, message: '请输入发送描述', trigger: 'blur'},
                    ]
                },
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
        created () {
            this.basicLoading();
            this.classifyForm.operator = this.$store.state.user.info.name;
        },
        watch: {
            filterText(val) {
                this.$refs.classifyTree.filter(val);
            }
        },
        methods: {
            /**
             * 生成一级option
             * @param data          被删选数据
             */
            loadFirstOption(data){
                let newOption = [];
                const custom = this.customVal;
                for (let i = 0; i < data.length; i++) {
                    const label = data[i].accessories;
                    newOption.push({key: label, val: label})
                }
                newOption.push({key: custom, val: custom});
                return newOption;
            },

            /**
             * 生成二级option
             * @param val           二级选择值
             * @param data          被删选数据
             */
            loadSecondOption(val, data){
                let newOption = [];
                const custom = this.customVal;
                if (val === custom) {
                    this.classifyForm.secondindex = custom;
                    newOption.push({key: custom, val: custom});
                    return newOption;
                }
                else {
                    for (let i = 0; i < data.length; i++) {
                        if (val === data[i].accessories) {
                            this.classifyForm.secondindex = data[i].children[0].accessories;
                            for (let j = 0; j < data[i].children.length; j++) {
                                const label = data[i].children[j].accessories;
                                newOption.push({key: label, val: label})
                            }
                            newOption.push({key: custom, val: custom});
                        }
                    }
                    return newOption;
                }
            },
            //基础加载
            basicLoading(){
                this.treeLoading = true;
                this.axios.post(this.$store.state.mock.url.DepotClassifyUrl, {},
                    () => {
                    },
                    r => {
                        this.classifyData = r.DepotClassify.data;
                        this.treeLoading = false;
                        this.firstindexOptions = this.loadFirstOption(this.classifyData);
//                        console.log('成功回调:' + JSON.stringify(this.classifyData, null, 4));
                    });
            },
            //初始化状态
            init(){
                this.disableHandle = false;
                this.secondindexOptions = [];
                this.resetChecked();
                this.forminit();
                if (this.$refs['classifyForm']) {
                    this.resetForm('classifyForm');
                }
            },
            //表单初始化
            forminit(){
                this.classifyForm = {
                    displayName: '',
                    fieldIndex: '',
                    inIndex: '',
                    firstindex: '',
                    firstindex_custom: '',
                    secondindex: '',
                    secondindex_custom: '',
                    operator: '',
                    remarks: '',
                };
            },
            //新增分类
            addClassify(){
                if (this.issave) {
                    this.toAddHandle();
                }
                else {
                    this.$confirm('您正在新增分类操作中，还未提交，放弃继续操作吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '返回',
                        type: 'warning'
                    }).then(() => {
                        this.toAddHandle();
                        this.issave = false;
                    }).catch(() => {
                        return false;
                    });
                }
            },
            //切换新增分类-相关操作
            toAddHandle(){
                this.init();
                this.activeName = this.activeFormName = '新增分类';
                this.issave = false;
            },
            //编辑当前分类
            editClassify(){
                if (this.issave) {
                    this.toEditHandle();
                }
                else {
                    this.$confirm('您正在编辑分类操作中，还未提交，放弃继续操作吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '返回',
                        type: 'warning'
                    }).then(() => {
                        this.toEditHandle();
                        this.issave = false;
                    }).catch(() => {
                        return false;
                    });
                }
            },
            //切换编辑分类-相关操作
            toEditHandle(){
                if (this.$refs.classifyTree.getCheckedNodes().length === 1) {
                    this.activeName = this.activeFormName = '编辑分类';
                    const data = this.$refs.classifyTree.getCheckedNodes()[0];
                    this.classifyForm.displayName = data.accessories;
                    this.classifyForm.fieldIndex = data.key;
                    this.classifyForm.inIndex = data.classification.split("-").length.toString();
                    this.classifyForm.firstindex = data.classification.split("-")[0];
                    this.classifyForm.secondindex = data.classification.split("-")[1];
                    this.classifyForm.operator = data.operator;
                    this.classifyForm.remarks = data.remarks;
                    this.disableHandle = true;
                    this.secondindexOptions = this.loadSecondOption(this.classifyForm.firstindex,this.classifyData);
                }
                else {
                    this.unrepeatMsg(this, '请从左侧分类列表中选择一项进行编辑', 'warning', 2400, () => {
                        this.submitSwitch = true;
                    });
                }
            },
            //提交
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        /*---------- submission module ----------*/
                        this.axios.post(
                            this.activeName === '新增分类' ? this.$store.state.mock.url.DepotClassifyAdd : this.$store.state.mock.url.DepotClassifyEdit,
                            this.classifyForm, () => {
                            },
                            r => {
                                if (r.check.feedback_pass) {
                                    this.unrepeatMsg(this, this.subSuccess, 'success', 1600, () => {
                                        this.submitSwitch = true;
                                    });
                                    this.activeName = '操作说明';
                                    this.activeFormName = null;
                                    this.init();
                                    this.issave = true;
                                }
                                else {
                                    this.unrepeatMsg(this, this.subError, 'error', 1600, () => {
                                        this.submitSwitch = true;
                                    });
                                }
                            },
                            () => {
                                this.unrepeatMsg(this, this.subError, 'error', 1600, () => {
                                    this.submitSwitch = true;
                                });
                            }
                        );
                    } else {
                        this.unrepeatMsg(this, this.validateError, 'error', 2000, () => {
                            this.submitSwitch = true;
                        });
                        return false;
                    }
                });
            },
            //重置
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.forminit();
            },
            //搜索分类
            filterNode(value, data) {
                if (!value) return true;
                return data.accessories.indexOf(value) !== -1;
            },
            //清除所选分类
            resetChecked(){
                this.$refs.classifyTree.setCheckedKeys([]);
            },
            //删除所选分类
            removeChecked() {
                if (this.$refs.classifyTree.getCheckedNodes().length >= 1) {
                    this.$confirm('您确认需要删除吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '返回',
                        type: 'warning'
                    }).then(() => {
                        this.axios.post(this.$store.state.mock.url.DepotClassifyDelete, {
                                handletype: 'delete', data: this.$refs.classifyTree.getCheckedNodes()
                            }, () => {},
                            r => {
                                if (r.check.feedback_pass) {
                                    this.basicLoading();
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
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    #storage-classification {
        .handlenotice {
            h2 {
                color: #20A0FF;
                padding: 10px 0;
            }
            span {
                font-size: 16px;
            }
            i {
                color: #FF4949;
            }
        }
        .fullSize {
            width: 98%;
        }

        .basicSize {
            width: 50%;
        }

        .smallSize {
            width: 45%;
        }
    }
</style>

