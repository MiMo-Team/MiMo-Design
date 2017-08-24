<!-- ============= user-role module ============= -->
<template>
    <!--弹出编辑框-->
    <el-dialog :title="temp.dialogStatus==='create'?'新增产品企划':canEdit?'编辑产品企划':'查看产品企划'"
               id="dialog-productPlanning" ref="dialog-productPlanning"
               :visible.sync="temp.dialogFormVisible" :modal-append-to-body="false"
               :top='null' :lock-scroll='true' :close-on-press-escape="true" @close="dialogClose('dialogForm')"
    >
        <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-position="left" label-width="100px" style='padding:0 20px'>
            <el-form-item label="类型：" prop="type">
                <el-select class="filter-item" v-model="dialogForm.type" placeholder="请选择" v-if="canEdit">
                    <el-option v-for="(item , index) in typeOptions" :key="item.key" :label="item.val" :value="item.key"></el-option>
                </el-select>
                <span v-else>{{dialogForm.type | typeVal }}</span>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-select class="filter-item" v-model="dialogForm.status" placeholder="请选择" v-if="canEdit" :disabled="temp.dialogStatus==='create'">
                    <el-option label="审核通过" value="pass"></el-option>
                    <el-option label="审核中" value="checking"></el-option>
                    <el-option label="再议" value="unpass"></el-option>
                </el-select>
                <span v-else>{{dialogForm.status | statusVal}}</span>
            </el-form-item>
            <el-form-item label="时间：" prop="timestamp">
                <el-date-picker v-model="dialogForm.timestamp" type="datetime" placeholder="选择日期时间" v-if="canEdit"></el-date-picker>
                <span v-else>{{dialogForm.timestamp }}</span>
            </el-form-item>
            <el-form-item label="标题：" prop="title">
                <el-input v-model="dialogForm.title" v-if="canEdit"></el-input>
                <span class="msg-tit" v-else>{{dialogForm.title }}</span>
            </el-form-item>
            <el-form-item label="发布者：" prop="author">
                <el-input v-model="dialogForm.author" v-if="canEdit"></el-input>
                <span v-else>{{dialogForm.author }}</span>
            </el-form-item>
            <el-form-item label="审核人：" prop="auditor">
                <el-input v-model="dialogForm.auditor" v-if="canEdit"></el-input>
                <span v-else>{{dialogForm.auditor }}</span>
            </el-form-item>
            <el-form-item label="重要性：" prop="importance">
                <el-rate style="margin-top:8px;" v-model="dialogForm.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :disabled="!canEdit"></el-rate>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="请输入发布内容" v-model="dialogForm.content" v-if="canEdit"></el-input>
                <span v-else>{{dialogForm.content }}</span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="temp.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default{
        name: 'dialog-productPlanning',
        props: {
            temp: Object
        },
        data() {
            return {
                //是否可编辑
                canEdit: false,
                submitSwitch: true,
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交',
                validateError: '请仔细检查是否正确填写',
                typeOptions: [
                    {key: 'market', val: '市场'},
                    {key: 'marketing', val: '营销'},
                    {key: 'design', val: '设计'},
                    {key: 'cooperation', val: '合作'},
                    {key: 'operate', val: '运营'},
                    {key: 'other', val: '其他'},
                ],
                //dialog status
                dialogStatus: this.temp.dialogStatus,
                //表单数据
                dialogForm: this.temp.data,
                rules: {
                    type: [
                        {required: true, message: '请选择发布类型', trigger: 'change'},
                    ],
                    status: [
                        {required: true, message: '请选择发布状态', trigger: 'change'}
                    ],
                    timestamp: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                    ],
                    author: [
                        {required: true, message: '请输入发布者', trigger: 'blur'},
                    ],
                    auditor: [
                        {required: true, message: '请输入审核人', trigger: 'blur'},
                    ],
                    importance: [
                        {type: 'number', required: true, message: '请选择重要性', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '请输入发送内容', trigger: 'blur'},
                    ]
                }
            };
        },
        created () {
            this.dialogForm.timestamp = this.parseTime(this.dialogForm.timestamp, '{y}-{m}-{d} {h}:{i}:{s}');
            //普通用户进入编辑弹窗界面时，只能查看，不能对表单修改
            this.$store.state.user.info.status !== 'admin' && this.dialogStatus === 'edit' ? this.canEdit = false : this.canEdit = true;
            console.log(this.canEdit);
        },
        filters: {
            statusVal(status) {
                const statusMap = {
                    pass: '审核通过',
                    checking: '审核中',
                    unpass: '再议'
                };
                return statusMap[status]
            },
            typeVal(type) {
                const typeMap = {
                    market: '市场',
                    marketing: '营销',
                    design: '设计',
                    cooperation: '合作',
                    operate: '运营',
                    other: '其他',
                };
                return typeMap[type]
            },
        },
        methods: {
            dialogClose(formName){
                //dialog 关闭后清除所有数据和验证提示信息
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                //管理员才有权限编辑提交表单，普通用户只能查看
                if (this.$store.state.user.info.status === 'admin') {
                    this.dialogForm.timestamp ? this.dialogForm.timestamp = new Date(this.dialogForm.timestamp) : this.dialogForm.timestamp = '';
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let url;
                            this.dialogStatus === 'create' ? url = this.$store.state.mock.url.announcementCreate : url = this.$store.state.mock.url.announcementEdit;
                            /*---------- submission module ----------*/
                            this.axios.post(url, this.dialogForm,
                                () => {
                                },
                                r => {
                                    /*---------- submit pass ----------*/
                                    if (r.check.feedback_pass) {
                                        //向父级发送信息
                                        this.$emit('tempChange', {
                                            'changeType': this.temp.dialogStatus === 'create' ? 'create' : 'edit',
                                            'tempChange': this.dialogForm,
                                        });
                                        this.unrepeatMsg(this, this.subSuccess, 'success', 800, () => {
                                            this.submitSwitch = true;
                                        });
                                        this.temp.dialogFormVisible = false;
                                    }
                                    /*---------- submit not pass ----------*/
                                    else {
                                        this.unrepeatMsg(this, this.subError, 'error', 1200, () => {
                                            this.submitSwitch = true;
                                        });
                                    }
                                },
                                    /*---------- Submission failure ----------*/
                                () => {
                                    this.unrepeatMsg(this, this.subError, 'error', 1200, () => {
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
                }
                else {
                    this.submitSwitch = true;
                    this.temp.dialogFormVisible = false;
                }
            }
        }
    }
</script>


