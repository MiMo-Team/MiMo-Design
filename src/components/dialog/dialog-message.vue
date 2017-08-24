<!-- ============= dialog-message ============= -->
<template>
    <!--弹出编辑框-->
    <el-dialog :title="temp.dialogStatus==='send'?'发送信息':'查看信息'"
               id="dialog-message" ref="dialog-message"
               :visible.sync="temp.dialogFormVisible" :modal-append-to-body="false"
               :top='null' :lock-scroll='true' :close-on-press-escape="true" @close="dialogClose('dialogForm')"
    >
        <el-form :model="dialogForm" :rules="rules" ref="dialogForm" label-position="left" label-width="100px" style='padding:0 40px'>
            <el-form-item label="时间：" prop="date" v-if="temp.dialogStatus !== 'send'">
                <span>{{dialogForm.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </el-form-item>
            <el-form-item label="标题：" prop="title">
                <el-input v-model="dialogForm.title" placeholder="请输入标题" v-if="temp.dialogStatus === 'send'"></el-input>
                <span v-else>{{dialogForm.title }}</span>
            </el-form-item>
            <el-form-item label="发送人：" prop="sender" v-if="temp.dialogStatus !== 'send'">
                <span>{{dialogForm.sender }}</span>
            </el-form-item>
            <el-form-item label="收件人：" prop="recipient" v-if="temp.dialogStatus === 'send'">
                <el-input v-model="dialogForm.recipient" placeholder="请输入收件人"></el-input>
            </el-form-item>
            <el-form-item label="重要性：" prop="importance">
                <el-rate style="margin-top:8px;" v-model="dialogForm.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                         :disabled="temp.dialogStatus !== 'send'"></el-rate>
            </el-form-item>
            <el-form-item label="内容：" prop="content">
                <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="请输入发布内容" v-model="dialogForm.content" v-if="temp.dialogStatus === 'send'"></el-input>
                <span v-else>{{dialogForm.content }}</span>
            </el-form-item>
            <el-form-item label="回复：" prop="answer" v-if="temp.dialogStatus !== 'send'">
                <el-input type="textarea" :autosize="{ minRows: 8}" placeholder="请输入回复内容" v-model="dialogForm.answer"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style='padding:0 50px'>
            <el-button @click="temp.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default{
        name: 'dialog-message',
        props: {
            temp: Object
        },
        data() {
            const validateImportance = (rule, value, callback) => {
                return value === 0 ? callback(new Error('请选择信息重要等级')) : callback();
            };
            return {
                submitSwitch: true,
                subSuccess: '提交成功',
                subError: '提交失败，请重新提交',
                validateError: '请仔细检查是否正确填写',
                //dialog status
                dialogStatus: this.temp.dialogStatus,
                //data
                dialogForm: this.temp.data,
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                    ],
                    recipient: [
                        {required: true, message: '请输入收件人', trigger: 'blur'},
                    ],
                    importance: [
                        {validator: validateImportance, trigger: 'click'},
                    ],
                    content: [
                        {required: true, message: '请输入发送内容', trigger: 'blur'},
                    ],
                    answer: [
                        {required: true, message: '请输入回复内容', trigger: 'blur'},
                    ]
                }
            };
        },
        created () {
        },
        methods: {
            dialogClose(formName){
                //when dialog opening,you need to clear all the data and verify the tooltip
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('cuccess')
                        let url;
                        this.dialogStatus === 'send' ? url = this.$store.state.mock.url.messageSend : url = this.$store.state.mock.url.messageAnswer;
                        /*---------- submission module ----------*/
                        this.axios.post(url, this.dialogForm,
                            () => {
                            },
                            r => {
                                /*---------- submit pass ----------*/
                                if (r.check.feedback_pass) {
                                    //向父级发送信息
                                    this.$emit('tempChange', {
                                        'changeType': this.temp.dialogStatus === 'send' ? 'send' : 'check',
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
                            },
                        );
                    } else {
                        this.unrepeatMsg(this, this.validateError, 'error', 2000, () => {
                            this.submitSwitch = true;
                        });
                        return false;
                    }
                });
            },
        }
    }
</script>


